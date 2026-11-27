import { LitElement, html, svg, css, nothing, PropertyValues, TemplateResult, SVGTemplateResult } from 'lit';
import {
  CardConfig,
  InverterConfig,
  InverterKey,
  INVERTER_KEYS,
  Model,
  Cell,
  SectionName,
  buildModel,
  inputKey,
  norm,
} from './model';
import { SunDay, SunPos, incidence, sunDay, sunPosition } from './sun';
import { outlinePath } from './outline';

const VERSION = '0.2.5';

// ---------------------------------------------------------------- HA types (minimal)
interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}
interface Hass {
  states: Record<string, HassEntity>;
  config: { latitude: number; longitude: number; time_zone?: string };
  locale?: { language?: string };
  language?: string;
  callWS?: <T>(msg: Record<string, unknown>) => Promise<T>;
}

type Status = 'missing' | 'offline' | 'fault' | 'low' | 'ok' | 'night';
const SEVERITY: Record<Status, number> = { missing: 5, offline: 4, fault: 3, low: 2, ok: 1, night: 0 };
const STATUS_LABEL: Record<Status, string> = {
  missing: 'no entities',
  offline: 'offline',
  fault: 'no output',
  low: 'low output',
  ok: 'ok',
  night: 'night',
};
const STATUS_COLOR: Record<Status, string> = {
  missing: '#9e9e9e',
  offline: '#e53935',
  fault: '#e53935',
  low: '#fb8c00',
  ok: '#43a047',
  night: '#5c6bc0',
};

interface InputState {
  panels: number;
  power: number | null; // W, null = no data
  wpp: number | null; // W per panel
  rel: number | null; // relative to orientation median
  ref: number | null; // orientation median W per panel
  status: Status;
}

interface InvState {
  inv: InverterConfig;
  missing: boolean;
  online: boolean | null;
  inputs: [InputState, InputState];
  power: number | null;
  temperature: number | null;
  frequency: number | null;
  voltage: number | null;
  signal: number | null;
  status: Status;
  lastUpdate?: string;
}

interface Snapshot {
  sun: SunPos;
  day: boolean;
  inv: Map<number, InvState>;
  total: number;
  faces: { power: number; panels: number; wpp: number | null; incidence: number }[];
}

// colour scales ------------------------------------------------------------------
const POWER_STOPS: [number, string][] = [
  [0, '#0b0f14'],
  [0.12, '#122a4d'],
  [0.35, '#1d5fa3'],
  [0.6, '#2fa8d5'],
  [0.82, '#f2c14e'],
  [1, '#fff1b8'],
];
/** sun above the horizon = same definition as sunrise/sunset (refraction + sun radius) */
const SUN_H0 = -0.833;
const PANEL_BG = '#0e1a2b';
const BAR_NEUTRAL = '#2fa8d5';
const REL_STOPS: [number, string][] = [
  [0, '#7f1d1d'],
  [0.5, '#d32f2f'],
  [0.75, '#f57c00'],
  [0.9, '#fbc02d'],
  [1, '#2e7d32'],
];

function hex(c: string) {
  const n = parseInt(c.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function scale(stops: [number, string][], v: number): string {
  v = Math.max(0, Math.min(1, v));
  for (let i = 1; i < stops.length; i++) {
    if (v <= stops[i][0]) {
      const [v0, c0] = stops[i - 1];
      const [v1, c1] = stops[i];
      const f = (v - v0) / (v1 - v0 || 1);
      const a = hex(c0), b = hex(c1);
      const m = a.map((x, j) => Math.round(x + (b[j] - x) * f));
      return `rgb(${m[0]},${m[1]},${m[2]})`;
    }
  }
  return stops[stops.length - 1][1];
}

const num = (s?: string): number | null => {
  if (s === undefined || s === null) return null;
  if (s === 'unavailable' || s === 'unknown' || s === '' || s === 'None') return null;
  const v = parseFloat(s);
  return isFinite(v) ? v : null;
};
const bool = (s?: string): boolean | null => {
  if (s === undefined) return null;
  const t = s.toLowerCase();
  if (['true', 'on', '1', 'online', 'yes'].includes(t)) return true;
  if (['false', 'off', '0', 'offline', 'no'].includes(t)) return false;
  return null;
};
const fmtW = (w: number | null | undefined, digits = 1) => {
  if (w === null || w === undefined || !isFinite(w)) return '–';
  return Math.abs(w) >= 1000 ? `${(w / 1000).toFixed(digits === 0 ? 1 : 2)} kW` : `${Math.round(w)} W`;
};
const fmt = (v: number | null | undefined, unit: string, d = 0) =>
  v === null || v === undefined || !isFinite(v) ? '–' : `${v.toFixed(d)} ${unit}`;
const pct = (v: number | null | undefined) => (v === null || v === undefined || !isFinite(v) ? '–' : `${Math.round(v * 100)} %`);
const median = (a: number[]) => {
  if (!a.length) return null;
  const s = [...a].sort((x, y) => x - y);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const fmtTime = (d?: Date) => (d ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '–');
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** step-hold resampling of a state history to fixed intervals */
function resample(rows: { t: number; p: number }[], step: number) {
  if (!rows.length) return [];
  const out: { t: number; p: number }[] = [];
  let i = 0;
  const end = Math.min(Date.now(), rows[rows.length - 1].t + 15 * 60000);
  for (let t = Math.ceil(rows[0].t / step) * step; t <= end; t += step) {
    while (i + 1 < rows.length && rows[i + 1].t <= t) i++;
    out.push({ t, p: rows[i].p });
  }
  return out;
}

/** exact smallest enclosing circle (Welzl, iterative) */
function minCircle(pts: [number, number][]) {
  const p = [...pts];
  for (let i = p.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  const inC = (c: { cx: number; cy: number; r: number }, q: [number, number]) => Math.hypot(q[0] - c.cx, q[1] - c.cy) <= c.r + 1e-9;
  const two = (a: [number, number], b: [number, number]) => ({ cx: (a[0] + b[0]) / 2, cy: (a[1] + b[1]) / 2, r: Math.hypot(a[0] - b[0], a[1] - b[1]) / 2 });
  const three = (a: [number, number], b: [number, number], c: [number, number]) => {
    const d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
    if (Math.abs(d) < 1e-12) {
      const cs = [two(a, b), two(a, c), two(b, c)].sort((x, y) => y.r - x.r);
      return cs[0];
    }
    const a2 = a[0] ** 2 + a[1] ** 2, b2 = b[0] ** 2 + b[1] ** 2, c2 = c[0] ** 2 + c[1] ** 2;
    const cx = (a2 * (b[1] - c[1]) + b2 * (c[1] - a[1]) + c2 * (a[1] - b[1])) / d;
    const cy = (a2 * (c[0] - b[0]) + b2 * (a[0] - c[0]) + c2 * (b[0] - a[0])) / d;
    return { cx, cy, r: Math.hypot(a[0] - cx, a[1] - cy) };
  };
  let c = { cx: p[0][0], cy: p[0][1], r: 0 };
  for (let i = 1; i < p.length; i++) {
    if (inC(c, p[i])) continue;
    c = { cx: p[i][0], cy: p[i][1], r: 0 };
    for (let j = 0; j < i; j++) {
      if (inC(c, p[j])) continue;
      c = two(p[i], p[j]);
      for (let k = 0; k < j; k++) if (!inC(c, p[k])) c = three(p[i], p[j], p[k]);
    }
  }
  return c;
}

/** tight circle around all cells plus the inverter labels at the eaves */
function roofCircle(model: Model, eaveLabels: boolean) {
  const pts: [number, number][] = [];
  const m = 0.05; // outline margin
  for (const c of model.cells) {
    pts.push([c.x - m, c.y - m], [c.x + c.w + m, c.y - m], [c.x - m, c.y + c.h + m], [c.x + c.w + m, c.y + c.h + m]);
  }
  if (eaveLabels) {
    const o = 0.6; // label distance + text size
    for (const f of model.faces) {
      const b = f.bbox;
      if (f.slope === 'down') pts.push([b.x, b.y + b.h + o], [b.x + b.w, b.y + b.h + o]);
      if (f.slope === 'up') pts.push([b.x, b.y - o], [b.x + b.w, b.y - o]);
      if (f.slope === 'left') pts.push([b.x - o, b.y], [b.x - o, b.y + b.h]);
      if (f.slope === 'right') pts.push([b.x + b.w + o, b.y], [b.x + b.w + o, b.y + b.h]);
    }
  }
  return pts.length ? minCircle(pts) : undefined;
}

const DEFAULT_SHOW: SectionName[] = ['header', 'roof', 'sun', 'strings', 'inverters', 'inventory'];

// =================================================================================
class RoofPvCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _mode: { state: true },
    _view: { state: true },
    _loadError: { state: true },
    _selected: { state: true },
    _hoverKey: { state: true },
    _tick: { state: true },
    _showAllInventory: { state: true },
    _picked: { state: true },
    _lastCell: { state: true },
    _toast: { state: true },
  };

  hass?: Hass;
  private _config?: CardConfig;
  private _model?: Model;
  private _mode: 'power' | 'relative' = 'power';
  private _view: 'compass' | 'plan' = 'compass';
  private _circle?: { cx: number; cy: number; r: number };
  private _loadError?: string;
  private _history: { t: number; p: number }[] = [];
  private _historyKey = '';
  private _historyAt = 0;
  private _loadSeq = 0;
  private _selected?: number;
  private _hoverKey?: string;
  private _tick = 0;
  private _showAllInventory = false;
  private _picked: string[] = [];
  private _lastCell?: Cell;
  private _toast?: string;
  private _toastTimer?: number;
  private _watched: string[] = [];
  private _timer?: number;
  private _sunDayCache?: { key: string; day: SunDay };
  private _outline = '';

  static getStubConfig(): Partial<CardConfig> {
    return {
      title: 'Roof PV',
      panel_wp: 400,
      north: 0,
      entity_pattern: 'sensor.inverter_{serial}_{key}',
      faces: [{ name: 'South', slope: 'down', tilt: 30, x: 0, y: 0, map: '1a 1a 1b 1b\n1a 1a 1b 1b' }],
      inverters: [{ slot: 1, serial: '000000000000' }],
    };
  }

  setConfig(config: CardConfig) {
    if (config?.config_url) {
      // site data (faces, inverters, …) comes from a JSON file; inline options override it
      const seq = ++this._loadSeq;
      this._loadError = undefined;
      const url = config.config_url + (config.config_url.includes('?') ? '&' : '?') + 't=' + Date.now();
      fetch(url, { cache: 'no-store' })
        .then((r) => {
          if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
          return r.json();
        })
        .then((remote) => {
          if (seq !== this._loadSeq) return;
          const merged = { ...remote, ...config } as CardConfig;
          try {
            this._applyConfig(merged);
          } catch (e) {
            this._loadError = String((e as Error).message ?? e);
          }
          this.requestUpdate();
        })
        .catch((e) => {
          if (seq !== this._loadSeq) return;
          this._loadError = `could not load ${config.config_url}: ${e.message ?? e}`;
        });
      return;
    }
    this._applyConfig(config);
  }

  private _applyConfig(config: CardConfig) {
    if (!config || !Array.isArray(config.faces) || !config.faces.length) throw new Error('roof-pv-card: "faces" is required');
    if (!Array.isArray(config.inverters) || !config.inverters.length) throw new Error('roof-pv-card: "inverters" is required');
    this._config = config;
    this._model = buildModel(config);
    this._outline =
      (config.outline ?? 'panels') === 'panels'
        ? outlinePath(this._model.cells, { margin: config.outline_margin ?? 0.1, merge: config.outline_merge ?? 0.35 })
        : '';
    this._mode = config.mode ?? 'power';
    this._view = config.view ?? 'compass';
    this._circle = roofCircle(this._model, (config.slot_labels ?? 'eave') === 'eave');
    this._watched = this._collectWatched(config);
  }

  getCardSize() {
    return 12;
  }

  /** sections view (HA 2024.11+): full width by default */
  getGridOptions() {
    return { columns: 'full', min_columns: 6, rows: 'auto' };
  }

  /** sections view (HA 2024.8–2024.10) */
  getLayoutOptions() {
    return { grid_columns: 'full', grid_min_columns: 4 };
  }

  connectedCallback() {
    super.connectedCallback();
    this._timer = window.setInterval(() => {
      this._tick = Date.now();
      this._maybeLoadHistory();
    }, 60000);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timer) window.clearInterval(this._timer);
  }

  // ------------------------------------------------------------ entities
  private _entity(inv: InverterConfig, key: InverterKey): string {
    if (inv.entities?.[key]) return inv.entities[key]!;
    if (inv.prefix) return `${inv.prefix}_${key}`;
    const p = this._config?.entity_pattern ?? 'sensor.inverter_{serial}_{key}';
    return p.replace('{serial}', inv.serial).replace('{key}', key);
  }

  private _collectWatched(cfg: CardConfig): string[] {
    const ids: string[] = [];
    for (const inv of cfg.inverters) for (const k of INVERTER_KEYS) ids.push(this._entity(inv, k));
    for (const s of cfg.strings ?? []) if (s.breaker) ids.push(s.breaker);
    if (cfg.total_power_entity) ids.push(cfg.total_power_entity);
    if (cfg.today_energy_entity) ids.push(cfg.today_energy_entity);
    return ids;
  }

  protected updated() {
    this._maybeLoadHistory();
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (!changed.has('hass') || changed.size > 1) return true;
    const old = changed.get('hass') as Hass | undefined;
    if (!old || !this.hass) return true;
    for (const id of this._watched) if (old.states[id] !== this.hass.states[id]) return true;
    return false;
  }

  // ------------------------------------------------------------ state snapshot
  private _snapshot(): Snapshot {
    const cfg = this._config!;
    const model = this._model!;
    const hass = this.hass!;
    const lat = cfg.latitude ?? hass.config.latitude;
    const lon = cfg.longitude ?? hass.config.longitude;
    const sun = sunPosition(new Date(), lat, lon);
    const sunUp = sun.elevation > (cfg.daylight_elevation ?? 5);

    // raw values
    const raw = new Map<number, { p: [number | null, number | null]; missing: boolean; inv: InverterConfig }>();
    for (const inv of cfg.inverters) {
      const e1 = hass.states[this._entity(inv, 'power_ch_1')];
      const e2 = hass.states[this._entity(inv, 'power_ch_2')];
      raw.set(inv.slot, { inv, missing: !e1 && !e2, p: [num(e1?.state), num(e2?.state)] });
    }

    // orientation reference: median W/panel of all inputs on faces with the same azimuth (±5°)
    const faceOfInput = (slot: number, input: number) => {
      const im = model.inputs.get(inputKey(slot, input));
      return im ? [...im.faces][0] : undefined;
    };
    const orient = (fi?: number) => (fi === undefined ? 'x' : String(Math.round(model.faces[fi].azimuth / 5) * 5));
    const groups = new Map<string, number[]>();
    for (const [slot, r] of raw) {
      for (const i of [0, 1] as const) {
        const im = model.inputs.get(inputKey(slot, i));
        const p = r.p[i];
        if (!im || p === null) continue;
        const g = orient(faceOfInput(slot, i));
        const arr = groups.get(g) ?? [];
        arr.push(p / im.panels);
        groups.set(g, arr);
      }
    }
    const refs = new Map<string, number | null>();
    for (const [g, a] of groups) refs.set(g, median(a));
    // "day" = sun high enough or the roof still produces measurably (dusk, dawn)
    const LIT = 3; // W per panel
    const day = sunUp || [...refs.values()].some((r) => (r ?? 0) >= LIT);

    const invMap = new Map<number, InvState>();
    let total = 0;
    for (const [slot, r] of raw) {
      const inv = r.inv;
      const st = (k: InverterKey) => hass.states[this._entity(inv, k)];
      const online = bool(st('online')?.state);
      const inputs = ([0, 1] as const).map((i): InputState => {
        const im = model.inputs.get(inputKey(slot, i));
        const panels = im?.panels ?? 0;
        const power = r.p[i];
        const wpp = power !== null && panels ? power / panels : null;
        const ref = refs.get(orient(faceOfInput(slot, i))) ?? null;
        const rel = wpp !== null && ref && ref > 0 ? wpp / ref : null;
        let status: Status;
        if (r.missing) status = 'missing';
        else if (power === null) status = sunUp ? 'offline' : 'night';
        else if (ref === null || ref < LIT) status = sunUp ? 'ok' : 'night';
        else if (wpp! < 0.1 * ref) status = 'fault';
        else if (wpp! < 0.7 * ref) status = 'low';
        else status = 'ok';
        return { panels, power, wpp, rel, ref, status };
      }) as [InputState, InputState];
      let status: Status = SEVERITY[inputs[0].status] >= SEVERITY[inputs[1].status] ? inputs[0].status : inputs[1].status;
      if (day && online === false && SEVERITY[status] < SEVERITY.offline) status = 'offline';
      const power = r.p[0] === null && r.p[1] === null ? null : (r.p[0] ?? 0) + (r.p[1] ?? 0);
      if (power) total += power;
      invMap.set(slot, {
        inv,
        missing: r.missing,
        online,
        inputs,
        power,
        temperature: num(st('temperature')?.state),
        frequency: num(st('frequency')?.state),
        voltage: num(st('voltage')?.state),
        signal: num(st('signal')?.state),
        status,
        lastUpdate: st('power_ch_1')?.attributes?.last_data_update ?? st('power_ch_1')?.last_updated,
      });
    }

    const faces = model.faces.map((f) => {
      let power = 0;
      for (const c of f.cells) {
        if (c.slot === undefined || c.input === undefined) continue;
        const s = invMap.get(c.slot)?.inputs[c.input];
        if (s?.wpp) power += s.wpp;
      }
      return {
        power,
        panels: f.panels,
        wpp: f.panels ? power / f.panels : null,
        incidence: incidence(sun, f.azimuth, f.tilt),
      };
    });
    return { sun, day, inv: invMap, total, faces };
  }

  // ------------------------------------------------------------ render
  protected render(): TemplateResult | typeof nothing {
    if (this._loadError) return html`<ha-card><div class="warn" style="padding:12px">roof-pv-card: ${this._loadError}</div></ha-card>`;
    if (!this._config || !this._model || !this.hass) return html`<ha-card><div class="hint" style="padding:12px">loading…</div></ha-card>`;
    const snap = this._snapshot();
    const show = this._config.show ?? DEFAULT_SHOW;
    const parts: Record<SectionName, () => TemplateResult | typeof nothing> = {
      header: () => this._renderHeader(snap),
      roof: () => this._renderRoof(snap),
      sun: () => this._renderSun(snap),
      strings: () => this._renderStrings(snap),
      inverters: () => this._renderInverters(snap),
      inventory: () => this._renderInventory(snap),
    };
    return html`<ha-card>
      ${show.map((s) => (parts[s] ? parts[s]() : nothing))}
      ${this._model.warnings.length
        ? html`<div class="warn">${this._model.warnings.map((w) => html`<div>⚠ ${w}</div>`)}</div>`
        : nothing}
    </ha-card>`;
  }

  private _renderHeader(snap: Snapshot) {
    const cfg = this._config!;
    const totalEnt = cfg.total_power_entity ? num(this.hass!.states[cfg.total_power_entity]?.state) : null;
    const energy = cfg.today_energy_entity ? this.hass!.states[cfg.today_energy_entity] : undefined;
    const wp = (cfg.panel_wp ?? 0) * this._model!.totalPanels;
    const total = totalEnt ?? snap.total;
    const counts: Partial<Record<Status, number>> = {};
    for (const s of snap.inv.values()) counts[s.status] = (counts[s.status] ?? 0) + 1;
    return html`<div class="header">
      <div class="title">${cfg.title ?? 'Roof PV'}</div>
      <div class="kpis">
        <div class="kpi"><span class="v">${fmtW(total)}</span><span class="l">now${wp ? html` · ${pct(total / wp)} of ${(wp / 1000).toFixed(1)} kWp` : nothing}</span></div>
        ${energy
          ? html`<div class="kpi clickable" @click=${() => this._moreInfo(energy.entity_id)}>
              <span class="v">${energy.state} ${energy.attributes.unit_of_measurement ?? ''}</span><span class="l">today</span>
            </div>`
          : nothing}
        <div class="kpi">
          <span class="v status-row">
            ${(['offline', 'fault', 'low', 'missing'] as Status[]).filter((s) => counts[s]).map(
              (s) => html`<span class="chip" style="--c:${STATUS_COLOR[s]}">${counts[s]} ${STATUS_LABEL[s]}</span>`,
            )}
            ${!counts.offline && !counts.fault && !counts.low && !counts.missing
              ? html`<span class="chip" style="--c:${snap.day ? STATUS_COLOR.ok : STATUS_COLOR.night}">${snap.inv.size} ${snap.day ? 'ok' : 'night'}</span>`
              : nothing}
          </span>
          <span class="l">${snap.inv.size} inverters · ${this._model!.totalPanels} panels</span>
        </div>
      </div>
      <div class="modes">
        <button class=${this._view === 'compass' ? 'on' : ''} @click=${() => (this._view = 'compass')} title="Roof inside a compass">Compass</button>
        <button class=${this._view === 'plan' ? 'on' : ''} @click=${() => (this._view = 'plan')} title="Roof plan">Plan</button>
      </div>
      <div class="modes">
        <button class=${this._mode === 'power' ? 'on' : ''} @click=${() => (this._mode = 'power')}>Power</button>
        <button class=${this._mode === 'relative' ? 'on' : ''} @click=${() => (this._mode = 'relative')}>Relative</button>
      </div>
    </div>`;
  }

  // ---------------------------------------------------------------- roof drawing
  private _cellColor(
    snap: Snapshot,
    slot: number,
    input: 0 | 1,
  ): { fill: string; status: Status; s?: InputState; bar?: { frac: number; color: string } } {
    const st = snap.inv.get(slot);
    const s = st?.inputs[input];
    if (!st || !s) return { fill: '#3a3a3a', status: 'missing' };
    if (s.status === 'missing' || s.status === 'offline') return { fill: '#1a1a1a', status: s.status, s };
    const relColor = s.ref !== null && s.ref >= 3 && s.rel !== null ? scale(REL_STOPS, s.rel) : BAR_NEUTRAL;
    if (this._mode === 'relative') {
      if (s.ref === null || s.ref < 3 || s.rel === null) return { fill: PANEL_BG, status: s.status, s };
      return { fill: relColor, status: s.status, s };
    }
    // power mode: dark panel with a bar 0..100 % of panel_wp, coloured by the relative value
    const wp = this._config!.panel_wp ?? 400;
    const frac = Math.max(0, Math.min(1, (s.wpp ?? 0) / wp));
    return { fill: PANEL_BG, status: s.status, s, bar: { frac, color: relColor } };
  }

  private _renderRoof(snap: Snapshot) {
    const m = this._model!;
    const labelMode = this._config!.slot_labels ?? 'eave';
    const pad = labelMode === 'eave' ? 0.75 : 0.5;
    const compassW = 2.2;
    const north = this._config!.north ?? 0;
    const view = this._view;
    // both views use a square drawing area
    let vb: number[];
    let ring: SVGTemplateResult | typeof nothing = nothing;
    if (view === 'compass' && this._circle) {
      const { cx: ccx, cy: ccy, r: rc } = this._circle;
      const R = rc / 0.885; // circle just outside the direction labels, which sit just outside the roof
      const half = R * 1.32; // outer band: power rays + margin
      vb = [ccx - half, ccy - half, 2 * half, 2 * half];
      ring = this._compassRing(ccx, ccy, R, north, snap);
    } else {
      const w = m.bbox.w + 2 * pad + compassW;
      const h = m.bbox.h + 2 * pad;
      const side = Math.max(w, h);
      vb = [m.bbox.x - pad - (side - w) / 2, m.bbox.y - pad - (side - h) / 2, side, side];
    }
    const sel = this._selected;
    const hoverKey = this._hoverKey;

    const outlineMode = this._config!.outline ?? 'panels';
    const faces =
      outlineMode === 'faces'
        ? m.faces.map((f) => {
            const b = f.bbox;
            return svg`<rect class="face" x=${b.x - 0.08} y=${b.y - 0.08} width=${b.w + 0.16} height=${b.h + 0.16} rx="0.08"></rect>`;
          })
        : outlineMode === 'panels' && this._outline
          ? svg`<path class="face" d=${this._outline} fill-rule="evenodd"></path>`
          : nothing;

    const cells = m.cells.map((c) => {
      if (c.roof) return nothing;
      if (c.dummy) return svg`<rect class="dummy" x=${c.x + 0.02} y=${c.y + 0.02} width=${c.w - 0.04} height=${c.h - 0.04}></rect>`;
      const { fill, status, s, bar } = this._cellColor(snap, c.slot!, c.input!);
      const inset = 0.08;
      const barH = bar ? Math.max((c.h - 2 * inset) * bar.frac, (s?.wpp ?? 0) > 0.5 ? 0.04 : 0) : 0;
      const k = inputKey(c.slot!, c.input!);
      const dim = sel !== undefined && sel !== c.slot;
      const hl = sel === c.slot || hoverKey === k;
      const picked = this._picked.includes(this._cellId(c));
      const tip = `Inverter ${c.slot} · input ${c.input! + 1} · ${s?.panels ?? 0} panels\n${fmtW(s?.power)} · ${s?.wpp !== null && s?.wpp !== undefined ? Math.round(s.wpp) + ' W/panel' : '–'} · ${pct(s?.rel)} of median\n${STATUS_LABEL[status]}`;
      return svg`<g class="cell ${dim ? 'dim' : ''}" @click=${(e: MouseEvent) => this._cellClick(e, c)}
          @mouseenter=${() => (this._hoverKey = k)} @mouseleave=${() => (this._hoverKey = undefined)}>
        <title>${tip}</title>
        <rect x=${c.x + 0.025} y=${c.y + 0.025} width=${c.w - 0.05} height=${c.h - 0.05} fill=${fill} class="panel"></rect>
        ${bar && barH > 0.005
          ? svg`<rect x=${c.x + inset} y=${c.y + c.h - inset - barH} width=${c.w - 2 * inset} height=${barH} fill=${bar.color} rx="0.02" pointer-events="none"></rect>`
          : nothing}
        <rect x=${c.x + 0.025} y=${c.y + 0.025} width=${c.w - 0.05} height=${c.h - 0.05} fill="url(#glass)" pointer-events="none"></rect>
        ${status === 'offline' || status === 'missing'
          ? svg`<rect x=${c.x + 0.025} y=${c.y + 0.025} width=${c.w - 0.05} height=${c.h - 0.05} fill="url(#hatch-${status})" pointer-events="none"></rect>`
          : nothing}
        ${status === 'fault' || status === 'low'
          ? svg`<rect x=${c.x + 0.06} y=${c.y + 0.06} width=${c.w - 0.12} height=${c.h - 0.12} fill="none" stroke=${STATUS_COLOR[status]} stroke-width="0.05" pointer-events="none"></rect>`
          : nothing}
        ${picked ? svg`<circle cx=${c.x + c.w / 2} cy=${c.y + c.h / 2} r=${Math.min(c.w, c.h) * 0.22} class="pick" pointer-events="none"></circle>` : nothing}
        ${hl ? svg`<rect x=${c.x + 0.025} y=${c.y + 0.025} width=${c.w - 0.05} height=${c.h - 0.05} class="hl" pointer-events="none"></rect>` : nothing}
      </g>`;
    });

    // slot labels at the centroid of each inverter's cells per face
    const labels: SVGTemplateResult[] = [];
    for (const f of m.faces) {
      const acc = new Map<number, { x: number; y: number; n: number }>();
      for (const c of f.cells) {
        if (c.slot === undefined) continue;
        const a = acc.get(c.slot) ?? { x: 0, y: 0, n: 0 };
        a.x += c.x + c.w / 2;
        a.y += c.y + c.h / 2;
        a.n++;
        acc.set(c.slot, a);
      }
      const b = f.bbox;
      const off = 0.38; // distance of the label from the face edge
      for (const [slot, a] of acc) {
        const cx = a.x / a.n;
        const cy = a.y / a.n;
        if (labelMode === 'none') continue;
        if (labelMode === 'center' || !f.slope) {
          labels.push(svg`<text class="slot" x=${cx} y=${cy} pointer-events="none">${slot}</text>`);
          continue;
        }
        // eave = downhill edge, where the inverters sit; position along the edge from the
        // inverter's panels in its row/column closest to the eave (ignores chains running across)
        const own = f.cells.filter((c) => c.slot === slot);
        const horiz = f.slope === 'down' || f.slope === 'up';
        const key = (c: Cell) => (f.slope === 'down' ? c.row : f.slope === 'up' ? -c.row : f.slope === 'right' ? c.col : -c.col);
        const best = Math.max(...own.map(key));
        const edgeCells = own.filter((c) => key(c) === best);
        const along = edgeCells.reduce((sum, c) => sum + (horiz ? c.x + c.w / 2 : c.y + c.h / 2), 0) / edgeCells.length;
        const [x, y] =
          f.slope === 'down' ? [along, b.y + b.h + off]
          : f.slope === 'up' ? [along, b.y - off]
          : f.slope === 'left' ? [b.x - off, along]
          : [b.x + b.w + off, along];
        const sel = this._selected === slot;
        labels.push(svg`<text class="slot eave ${sel ? 'sel' : ''}" x=${x} y=${y} @click=${() => this._select(slot)}>${slot}</text>`);
      }
    }

    // face labels with slope arrow
    const faceLabels = m.faces.map((f, i) => {
      const b = f.bbox;
      const fs = snap.faces[i];
      const cx = b.x + b.w / 2;
      const cy = b.y + b.h / 2;
      const angle = f.slope ? { up: 0, right: 90, down: 180, left: 270 }[f.slope] : norm(f.azimuth + north);
      return svg`<g class="facelabel" pointer-events="none">
        <g transform="translate(${cx} ${cy}) rotate(${angle})">
          <path d="M0,-0.55 L0.28,-0.1 L0.1,-0.1 L0.1,0.45 L-0.1,0.45 L-0.1,-0.1 L-0.28,-0.1 Z" class="slopearrow"></path>
        </g>
        <text x=${cx} y=${cy + 0.95} class="fname">${f.name}</text>
        <text x=${cx} y=${cy + 1.35} class="fsub">${Math.round(f.azimuth)}° · ${f.tilt}° · ${fmtW(fs.power)}</text>
      </g>`;
    });

    const cx = m.bbox.x + m.bbox.w + pad + compassW / 2;
    const cy = m.bbox.y + 1.2;
    const compass = view === 'compass' ? nothing : svg`<g transform="translate(${cx} ${cy}) rotate(${north})" class="compass">
      <circle r="0.85"></circle>
      <path d="M0,-0.75 L0.22,0 L0,0.12 L-0.22,0 Z" class="n"></path>
      <path d="M0,0.75 L0.22,0 L0,-0.12 L-0.22,0 Z" class="s"></path>
      <text y="-0.95" transform="rotate(${-north} 0 -1.15)" x="0">N</text>
    </g>`;

    const legend = this._mode === 'power'
      ? this._legend(REL_STOPS, '0 %', '100 % of median', `bar height: 0–${this._config!.panel_wp ?? 400} W per panel · colour:`)
      : this._legend(REL_STOPS, '0 %', '100 % of median');

    return html`<div class="roof">
      <svg viewBox=${vb.join(' ')} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#fff" stop-opacity="0.14"></stop>
            <stop offset="0.45" stop-color="#fff" stop-opacity="0.02"></stop>
            <stop offset="1" stop-color="#000" stop-opacity="0.15"></stop>
          </linearGradient>
          <pattern id="hatch-offline" width="0.18" height="0.18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="0.06" height="0.18" fill="#e53935" opacity="0.8"></rect>
          </pattern>
          <pattern id="hatch-missing" width="0.18" height="0.18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="0.06" height="0.18" fill="#9e9e9e" opacity="0.7"></rect>
          </pattern>
        </defs>
        ${ring}${faces}${cells}${labels}${this._config!.face_labels ? faceLabels : nothing}${compass}
      </svg>
      ${legend}
      ${this._renderPicked()}
      ${sel !== undefined ? this._renderDetail(snap, sel) : html`<div class="hint">Tap a panel to see its inverter · Shift+click marks a panel and copies its ID.</div>`}
    </div>`;
  }

  private _compassRing(cx: number, cy: number, R: number, north: number, snap: Snapshot) {
    const pt = (az: number, r: number) => {
      const a = ((az + north) * Math.PI) / 180;
      return [cx + Math.sin(a) * r, cy - Math.cos(a) * r];
    };
    const ticks: SVGTemplateResult[] = [];
    for (let az = 0; az < 360; az += 5) {
      const major = az % 45 === 0;
      const mid = az % 15 === 0;
      const len = R * (major ? 0.05 : mid ? 0.03 : 0.015);
      const [x1, y1] = pt(az, R);
      const [x2, y2] = pt(az, R - len);
      ticks.push(svg`<line x1=${x1} y1=${y1} x2=${x2} y2=${y2} class="tick ${major ? 'major' : ''}" style="stroke-width:${R * (major ? 0.006 : 0.003)}"></line>`);
    }
    const names: [string, number][] = [['N', 0], ['NE', 45], ['E', 90], ['SE', 135], ['S', 180], ['SW', 225], ['W', 270], ['NW', 315]];
    const labels = names.map(([n, az]) => {
      const card = n.length === 1;
      const fs = R * (card ? 0.042 : 0.03);
      const [x, y] = pt(az, R * 0.95 - fs * 0.75);
      return svg`<text x=${x} y=${y} class="rose ${n === 'N' ? 'north' : ''}" style="font-size:${fs}px">${n}</text>`;
    });

    // power rays outside the circle: roof power at the sun's azimuth over today
    const rays: SVGTemplateResult[] = [];
    const lat = this._lat(), lon = this._lon();
    const hist = this._history;
    const kwp = ((this._config!.panel_wp ?? 400) * this._model!.totalPanels) || 1;
    const peak = hist.reduce((a, h) => Math.max(a, h.p), 0);
    const scaleW = Math.max(peak, kwp * 0.2); // full ray length
    const r0 = R * 1.025;
    const band = R * 0.22;
    let prevAz: number | undefined;
    for (const h of hist) {
      if (h.p <= 0) continue;
      const sp = sunPosition(new Date(h.t), lat, lon);
      if (sp.elevation < -2) continue;
      const len = band * Math.min(1, h.p / scaleW);
      const [x1, y1] = pt(sp.azimuth, r0);
      const [x2, y2] = pt(sp.azimuth, r0 + len);
      const v = Math.min(1, h.p / scaleW);
      rays.push(svg`<line x1=${x1} y1=${y1} x2=${x2} y2=${y2} class="ray" style="stroke:${scale(POWER_STOPS, 0.35 + 0.65 * v)};stroke-width:${R * 0.009}"></line>`);
      prevAz = sp.azimuth;
    }
    void prevAz;

    // the sun on the circle
    let sun: SVGTemplateResult | typeof nothing = nothing;
    if (snap.sun.elevation > SUN_H0) {
      const [sx, sy] = pt(snap.sun.azimuth, R);
      const r = R * 0.028;
      const rayEls = [0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const rad = (a * Math.PI) / 180;
        return svg`<line x1=${sx + Math.cos(rad) * r * 1.35} y1=${sy + Math.sin(rad) * r * 1.35} x2=${sx + Math.cos(rad) * r * 1.9} y2=${sy + Math.sin(rad) * r * 1.9} style="stroke-width:${r * 0.32}"></line>`;
      });
      sun = svg`<g class="sunicon"><circle cx=${sx} cy=${sy} r=${r}></circle>${rayEls}</g>`;
    }

    return svg`<g class="compassring" pointer-events="none">
      <circle cx=${cx} cy=${cy} r=${R} class="dial" style="stroke-width:${R * 0.006}"></circle>
      ${rays}${ticks}${labels}${sun}
    </g>`;
  }

  /** today's total power history (for the rays around the compass) */
  private _maybeLoadHistory(force = false) {
    const ent = this._config?.total_power_entity;
    if (!ent || !this.hass?.callWS) return;
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const key = `${ent}|${start.toDateString()}`;
    if (!force && key === this._historyKey && Date.now() - this._historyAt < 5 * 60000) return;
    this._historyKey = key;
    this._historyAt = Date.now();
    this.hass
      .callWS<Record<string, { s: string; lu: number }[]>>({
        type: 'history/history_during_period',
        start_time: start.toISOString(),
        end_time: new Date().toISOString(),
        entity_ids: [ent],
        minimal_response: true,
        no_attributes: true,
      })
      .then((res) => {
        const rows = res?.[ent] ?? [];
        const out: { t: number; p: number }[] = [];
        for (const r of rows) {
          const v = parseFloat(r.s);
          if (isFinite(v)) out.push({ t: r.lu * 1000, p: v });
        }
        this._history = resample(out, 5 * 60000);
        this.requestUpdate();
      })
      .catch(() => {
        /* history not available – no rays */
      });
  }

  private _legend(stops: [number, string][], lo: string, hi: string, prefix?: string) {
    const grad = stops.map(([v, c]) => `${c} ${v * 100}%`).join(',');
    return html`<div class="legend">
      ${prefix ? html`<span>${prefix}</span>` : nothing}
      <span>${lo}</span><span class="bar" style="background:linear-gradient(90deg,${grad})"></span><span>${hi}</span>
      <span class="sw" style="--c:${STATUS_COLOR.offline}">offline</span>
      <span class="sw" style="--c:${STATUS_COLOR.low}">low</span>
    </div>`;
  }

  /** stable, human-readable panel id, e.g. "F1 R3 C17 · inv 3 in 1 · 724000012292" */
  private _cellId(c: Cell): string {
    const pos = `F${c.face + 1} R${c.row} C${c.col}`;
    if (c.dummy || c.slot === undefined) return `${pos} · dummy`;
    const inv = this._config!.inverters.find((i) => i.slot === c.slot);
    return `${pos} · inv ${c.slot} in ${c.input! + 1}${inv ? ` · ${inv.serial}` : ''}`;
  }

  private _cellClick(e: MouseEvent, c: Cell) {
    this._lastCell = c;
    if (e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) {
      const id = this._cellId(c);
      if (this._picked.includes(id)) this._picked = this._picked.filter((p) => p !== id);
      else this._picked = [...this._picked, id];
      this._copy(this._picked.length > 1 ? this._picked.join('\n') : id, this._picked.length > 1 ? `${this._picked.length} panels copied` : `copied: ${id}`);
      return;
    }
    if (c.slot !== undefined) this._select(c.slot);
  }

  private async _copy(text: string, msg: string) {
    let ok = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        ok = true;
      }
    } catch (_) {
      ok = false;
    }
    if (!ok) {
      // http:// (not a secure context): fall back to a hidden textarea
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        ok = document.execCommand('copy');
      } catch (_) {
        ok = false;
      }
      ta.remove();
    }
    this._toast = ok ? msg : `copy failed – select the text below`;
    if (this._toastTimer) window.clearTimeout(this._toastTimer);
    this._toastTimer = window.setTimeout(() => (this._toast = undefined), 2500);
  }

  private _renderPicked() {
    if (!this._picked.length && !this._toast) return nothing;
    return html`<div class="picked">
      ${this._toast ? html`<div class="toast">${this._toast}</div>` : nothing}
      ${this._picked.length
        ? html`<div class="pickhead">
              <b>Marked panels (${this._picked.length})</b>
              <button @click=${() => this._copy(this._picked.join('\n'), `${this._picked.length} panels copied`)}>Copy all</button>
              <button @click=${() => (this._picked = [])}>Clear</button>
            </div>
            <pre class="picklist">${this._picked.join('\n')}</pre>`
        : nothing}
    </div>`;
  }

  private _select(slot: number) {
    this._selected = this._selected === slot ? undefined : slot;
  }

  private _moreInfo(entityId: string) {
    const ev = new Event('hass-more-info', { bubbles: true, composed: true }) as Event & { detail: unknown };
    ev.detail = { entityId };
    this.dispatchEvent(ev);
  }

  private _renderDetail(snap: Snapshot, slot: number) {
    const s = snap.inv.get(slot);
    if (!s) return nothing;
    const inv = s.inv;
    const str = this._config!.strings?.find((x) => x.id === inv.string);
    const faces = new Set<string>();
    for (const i of [0, 1]) {
      const im = this._model!.inputs.get(inputKey(slot, i));
      im?.faces.forEach((f) => faces.add(this._model!.faces[f].name));
    }
    return html`<div class="detail">
      <div class="dhead">
        <span class="dot" style="--c:${STATUS_COLOR[s.status]}"></span>
        <b>Inverter ${slot}${inv.name ? ` · ${inv.name}` : ''}</b>
        <span class="muted">${inv.serial}</span>
        <span class="muted">${inv.string ?? ''}${str?.phase ? ` · ${str.phase}` : ''} · ${[...faces].join(', ')}</span>
        <span class="badge" style="--c:${STATUS_COLOR[s.status]}">${STATUS_LABEL[s.status]}</span>
        <button class="x" @click=${() => (this._selected = undefined)}>✕</button>
      </div>
      <div class="dgrid">
        ${([0, 1] as const).map(
          (i) => html`<div class="dinput clickable" @click=${() => this._moreInfo(this._entity(inv, i ? 'power_ch_2' : 'power_ch_1'))}
              @mouseenter=${() => (this._hoverKey = inputKey(slot, i))} @mouseleave=${() => (this._hoverKey = undefined)}>
            <div class="muted">Input ${i + 1} · ${s.inputs[i].panels} panels</div>
            <div class="big">${fmtW(s.inputs[i].power)}</div>
            <div class="muted">${s.inputs[i].wpp !== null ? `${Math.round(s.inputs[i].wpp!)} W/panel` : '–'} · ${pct(s.inputs[i].rel)} of median</div>
          </div>`,
        )}
        <div class="dvals">
          ${this._val('Temperature', fmt(s.temperature, '°C'), 'temperature', inv)}
          ${this._val('Frequency', fmt(s.frequency, 'Hz', 1), 'frequency', inv)}
          ${this._val('Voltage', fmt(s.voltage, 'V'), 'voltage', inv)}
          ${this._val('Signal', fmt(s.signal, 'dBm'), 'signal', inv)}
          ${this._val('Online', s.online === null ? '–' : s.online ? 'yes' : 'no', 'online', inv)}
        </div>
      </div>
      ${this._lastCell && this._lastCell.slot === slot
        ? html`<div class="small">Panel <span class="mono">${this._cellId(this._lastCell)}</span>
            <button class="mini" @click=${() => this._copy(this._cellId(this._lastCell!), 'copied')}>Copy ID</button></div>`
        : nothing}
      ${s.lastUpdate ? html`<div class="muted small">last data: ${s.lastUpdate}</div>` : nothing}
      ${inv.history?.length
        ? html`<div class="muted small">History: ${inv.history.map((h) => `${h.serial}${h.replaced ? ` (replaced ${h.replaced})` : ''}${h.note ? ` – ${h.note}` : ''}`).join(' → ')} → ${inv.serial}</div>`
        : nothing}
    </div>`;
  }

  private _val(label: string, value: string, key: InverterKey, inv: InverterConfig) {
    return html`<div class="clickable" @click=${() => this._moreInfo(this._entity(inv, key))}><span class="muted">${label}</span> ${value}</div>`;
  }

  // ---------------------------------------------------------------- sun / sky view
  private _sunDay(): SunDay {
    const cfg = this._config!;
    const lat = cfg.latitude ?? this.hass!.config.latitude;
    const lon = cfg.longitude ?? this.hass!.config.longitude;
    const now = new Date();
    const key = `${now.toDateString()}|${lat}|${lon}`;
    if (this._sunDayCache?.key !== key) this._sunDayCache = { key, day: sunDay(now, lat, lon, 5) };
    return this._sunDayCache.day;
  }

  private _renderSun(snap: Snapshot) {
    const m = this._model!;
    const north = this._config!.north ?? 0;
    const day = this._sunDay();
    const R = 100;
    // drawing angle (clockwise from up) for a compass azimuth
    const ang = (az: number) => ((az + north) * Math.PI) / 180;
    const pos = (az: number, el: number) => {
      const r = (R * (90 - Math.max(-2, el))) / 90;
      return [Math.sin(ang(az)) * r, -Math.cos(ang(az)) * r];
    };
    const path = day.path.map((p) => pos(p.azimuth, p.elevation).map((v) => v.toFixed(1)).join(',')).join(' ');
    const sunNow = snap.sun.elevation > SUN_H0 ? pos(snap.sun.azimuth, snap.sun.elevation) : null;
    const rise = day.sunrise ? sunPosition(day.sunrise, this._lat(), this._lon()) : null;
    const set = day.sunset ? sunPosition(day.sunset, this._lat(), this._lon()) : null;
    const cardinals = [['N', 0], ['E', 90], ['S', 180], ['W', 270]] as const;

    // mini roof in the centre (same orientation as the main drawing)
    const s = 52 / Math.max(m.bbox.w, m.bbox.h);
    const ox = -(m.bbox.x + m.bbox.w / 2) * s;
    const oy = -(m.bbox.y + m.bbox.h / 2) * s;
    const wp = this._config!.panel_wp ?? 400;
    const mini = m.faces.map((f, i) => {
      const b = f.bbox;
      const fs = snap.faces[i];
      const fill = scale(POWER_STOPS, Math.sqrt(Math.max(0, fs.wpp ?? 0) / wp));
      return svg`<rect x=${ox + b.x * s} y=${oy + b.y * s} width=${b.w * s} height=${b.h * s} fill=${fill} class="miniface"></rect>`;
    });
    // face normals
    const normals = m.faces.map((f, i) => {
      const b = f.bbox;
      const fx = ox + (b.x + b.w / 2) * s;
      const fy = oy + (b.y + b.h / 2) * s;
      const a = ang(f.azimuth);
      const len = 14 + 22 * snap.faces[i].incidence;
      return svg`<line x1=${fx} y1=${fy} x2=${fx + Math.sin(a) * len} y2=${fy - Math.cos(a) * len} class="normal" style="opacity:${0.35 + 0.65 * snap.faces[i].incidence}"></line>
        <circle cx=${fx + Math.sin(a) * len} cy=${fy - Math.cos(a) * len} r="2" class="normaltip"></circle>`;
    });

    const rows = m.faces.map((f, i) => {
      const fs = snap.faces[i];
      const kwp = (fs.panels * wp) / 1000;
      return html`<tr>
        <td>${f.name}</td>
        <td>${Math.round(f.azimuth)}° / ${f.tilt}°</td>
        <td>${pct(fs.incidence)}</td>
        <td>${fmtW(fs.power)}</td>
        <td>${kwp ? pct(fs.power / (kwp * 1000)) : '–'}</td>
      </tr>`;
    });

    return html`<div class="sun">
      <svg viewBox="-135 -122 270 244" class="sky">
        <circle r=${R} class="horizon"></circle>
        <circle r=${(R * 60) / 90} class="ring"></circle>
        <circle r=${(R * 30) / 90} class="ring"></circle>
        ${cardinals.map(([l, a]) => {
          const [x, y] = pos(a, -10);
          return svg`<text x=${x} y=${y} class="card ${l === 'N' ? 'north' : ''}">${l}</text>`;
        })}
        ${mini}${normals}
        <polyline points=${path} class="sunpath"></polyline>
        ${rise ? this._sunMark(pos(rise.azimuth, 0), `↑ ${fmtTime(day.sunrise)}`) : nothing}
        ${set ? this._sunMark(pos(set.azimuth, 0), `↓ ${fmtTime(day.sunset)}`) : nothing}
        ${sunNow ? svg`<circle cx=${sunNow[0]} cy=${sunNow[1]} r="9" class="sunglow"></circle><circle cx=${sunNow[0]} cy=${sunNow[1]} r="5" class="sundot"></circle>` : nothing}
      </svg>
      <div class="suninfo">
        <div class="sunline">
          <span>☀ ${snap.sun.elevation > SUN_H0 ? `${Math.round(snap.sun.azimuth)}° az · ${Math.round(snap.sun.elevation)}° el` : 'below horizon'}</span>
          <span class="muted">↑ ${fmtTime(day.sunrise)} · ↓ ${fmtTime(day.sunset)}</span>
        </div>
        <table class="faces">
          <thead><tr><th>Face</th><th>Az / tilt</th><th title="share of direct sunlight on the face right now (geometry only)">Sun angle</th><th>Power</th><th>of kWp</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
  }

  private _lat() {
    return this._config!.latitude ?? this.hass!.config.latitude;
  }
  private _lon() {
    return this._config!.longitude ?? this.hass!.config.longitude;
  }

  private _sunMark(p: number[], label: string) {
    const [x, y] = p;
    return svg`<circle cx=${x} cy=${y} r="2.5" class="riseset"></circle>
      <text x=${x * 1.13} y=${y * 1.13 + 3} class="rslabel">${label}</text>`;
  }

  // ---------------------------------------------------------------- strings
  private _renderStrings(snap: Snapshot) {
    const strings = this._config!.strings;
    if (!strings?.length) return nothing;
    const phases = new Map<string, number>();
    const rows = strings.map((st) => {
      const members = [...snap.inv.values()].filter((s) => s.inv.string === st.id);
      const p = members.reduce((a, s) => a + (s.power ?? 0), 0);
      if (st.phase) phases.set(st.phase, (phases.get(st.phase) ?? 0) + p);
      let worst: Status = 'night';
      for (const mbr of members) if (SEVERITY[mbr.status] > SEVERITY[worst]) worst = mbr.status;
      const brk = st.breaker ? this.hass!.states[st.breaker] : undefined;
      const brkOn = brk ? bool(brk.state) : null;
      const allDown = snap.day && members.length > 0 && members.every((s) => s.status === 'offline' || s.status === 'fault');
      return html`<div class="string ${allDown || brkOn === false ? 'down' : ''}">
        <div class="sname"><span class="dot" style="--c:${STATUS_COLOR[worst]}"></span>${st.name ?? st.id}${st.phase ? html` <span class="muted">${st.phase}</span>` : nothing}</div>
        <div class="sval">${fmtW(p)}</div>
        <div class="muted small">${members.map((s) => s.inv.slot).join(' ')}</div>
        ${brk
          ? html`<div class="small clickable" @click=${() => this._moreInfo(brk.entity_id)}>breaker: ${brkOn === null ? brk.state : brkOn ? 'on' : html`<b class="bad">OFF</b>`}</div>`
          : allDown
            ? html`<div class="small bad">whole string down – check RCBO</div>`
            : nothing}
      </div>`;
    });
    const pv = [...phases.values()];
    const imb = pv.length > 1 ? Math.max(...pv) - Math.min(...pv) : 0;
    return html`<div class="section">
      <div class="stitle">Strings</div>
      <div class="strings">${rows}</div>
      ${phases.size
        ? html`<div class="phases">${[...phases.entries()].sort().map(([ph, p]) => html`<span><b>${ph}</b> ${fmtW(p)}</span>`)}
            <span class="muted">imbalance ${fmtW(imb)}</span></div>`
        : nothing}
    </div>`;
  }

  // ---------------------------------------------------------------- inverter table
  private _renderInverters(snap: Snapshot) {
    const list = [...snap.inv.values()].sort((a, b) => a.inv.slot - b.inv.slot);
    return html`<div class="section">
      <div class="stitle">Inverters</div>
      <div class="tablewrap">
        <table class="inv">
          <thead><tr>
            <th></th><th>#</th><th>Serial</th><th>String</th><th>In 1</th><th>In 2</th><th>W/panel</th><th>°C</th><th>Hz</th><th>V</th><th>dBm</th>
          </tr></thead>
          <tbody>
            ${list.map((s) => {
              const w = s.inputs.map((i) => (i.wpp === null ? '–' : Math.round(i.wpp))).join(' / ');
              return html`<tr class=${this._selected === s.inv.slot ? 'sel' : ''} @click=${() => this._select(s.inv.slot)}>
                <td><span class="dot" title=${STATUS_LABEL[s.status]} style="--c:${STATUS_COLOR[s.status]}"></span></td>
                <td>${s.inv.slot}</td>
                <td class="mono">${s.inv.serial}</td>
                <td>${s.inv.string ?? ''}</td>
                <td class=${s.inputs[0].status === 'low' || s.inputs[0].status === 'fault' ? 'warncell' : ''}>${fmtW(s.inputs[0].power)}</td>
                <td class=${s.inputs[1].status === 'low' || s.inputs[1].status === 'fault' ? 'warncell' : ''}>${fmtW(s.inputs[1].power)}</td>
                <td>${w}</td>
                <td>${fmt(s.temperature, '')}</td>
                <td>${fmt(s.frequency, '', 1)}</td>
                <td>${fmt(s.voltage, '')}</td>
                <td>${fmt(s.signal, '')}</td>
              </tr>`;
            })}
          </tbody>
        </table>
      </div>
    </div>`;
  }

  // ---------------------------------------------------------------- inventory check
  private _inventory() {
    const cfg = this._config!;
    const hass = this.hass!;
    const patterns = new Set<string>();
    patterns.add(cfg.entity_pattern ?? 'sensor.inverter_{serial}_{key}');
    for (const inv of cfg.inverters) if (inv.prefix?.includes(inv.serial)) patterns.add(inv.prefix.replace(inv.serial, '{serial}') + '_{key}');
    const res = [...patterns].map(
      (p) => new RegExp('^' + esc(p).replace(esc('{serial}'), '([0-9A-Za-z]+)').replace(esc('{key}'), 'power_ch_1') + '$'),
    );
    const found = new Map<string, HassEntity>();
    for (const id of Object.keys(hass.states)) {
      for (const re of res) {
        const m = re.exec(id);
        if (m) found.set(m[1], hass.states[id]);
      }
    }
    const configured = new Set(cfg.inverters.map((i) => i.serial));
    const ignored = new Set(cfg.ignore_serials ?? []);
    const history = new Set(cfg.inverters.flatMap((i) => (i.history ?? []).map((h) => h.serial)));
    const unknown: { serial: string; state: string; reporting: boolean; old: boolean }[] = [];
    for (const [serial, e] of found) {
      if (configured.has(serial) || ignored.has(serial)) continue;
      unknown.push({ serial, state: e.state, reporting: num(e.state) !== null, old: history.has(serial) });
    }
    const missing = cfg.inverters.filter((i) => !hass.states[this._entity(i, 'power_ch_1')]);
    return { found: found.size, unknown, missing, configured: cfg.inverters.length, ignored: [...ignored].filter((s) => found.has(s)) };
  }

  private _renderInventory(_snap: Snapshot) {
    const inv = this._inventory();
    const problems = inv.unknown.length + inv.missing.length;
    const ok = inv.configured - inv.missing.length;
    return html`<div class="section inventory ${problems ? 'bad' : ''}">
      <div class="stitle clickable" @click=${() => (this._showAllInventory = !this._showAllInventory)}>
        Inventory ${problems ? '⚠' : '✓'}
        <span class="muted small">${ok}/${inv.configured} configured inverters found in HA${inv.unknown.length ? ` · ${inv.unknown.length} unknown` : ''}${inv.ignored.length ? ` · ${inv.ignored.length} ignored` : ''}</span>
      </div>
      ${problems || this._showAllInventory
        ? html`<ul class="small">
            ${inv.missing.map((i) => html`<li>Slot ${i.slot}: <span class="mono">${i.serial}</span> – no entity <span class="mono">${this._entity(i, 'power_ch_1')}</span></li>`)}
            ${inv.unknown.map(
              (u) => html`<li><span class="mono">${u.serial}</span> is in HA but not mapped to a slot –
                ${u.reporting ? html`<b>reporting (${u.state} W)</b>` : `state ${u.state}`}${u.old ? ' (listed as a replaced unit)' : ''}</li>`,
            )}
            ${this._showAllInventory && inv.ignored.length ? html`<li>Ignored: ${inv.ignored.join(', ')}</li>` : nothing}
          </ul>`
        : nothing}
    </div>`;
  }

  // ---------------------------------------------------------------- styles
  static styles = css`
    :host {
      --roof: #2a2f36;
      --roof-edge: #444b55;
    }
    ha-card {
      padding: 12px 14px 14px;
      overflow: hidden;
    }
    .header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 18px;
      margin-bottom: 8px;
    }
    .title {
      font-size: 1.25em;
      font-weight: 500;
      flex: 1 1 auto;
    }
    .kpis {
      display: flex;
      gap: 18px;
      flex-wrap: wrap;
    }
    .kpi {
      display: flex;
      flex-direction: column;
    }
    .kpi .v {
      font-size: 1.15em;
      font-weight: 600;
    }
    .kpi .l,
    .muted {
      color: var(--secondary-text-color);
      font-size: 0.85em;
    }
    .small {
      font-size: 0.82em;
    }
    .mono {
      font-family: var(--code-font-family, monospace);
      font-size: 0.92em;
    }
    .chip {
      display: inline-block;
      padding: 1px 8px;
      border-radius: 10px;
      font-size: 0.8em;
      font-weight: 500;
      background: color-mix(in srgb, var(--c) 22%, transparent);
      color: var(--primary-text-color);
      border: 1px solid var(--c);
      margin-right: 4px;
    }
    .modes button {
      background: none;
      border: 1px solid var(--divider-color, #555);
      color: var(--primary-text-color);
      padding: 3px 10px;
      cursor: pointer;
      font: inherit;
      font-size: 0.85em;
    }
    .modes button:first-child {
      border-radius: 12px 0 0 12px;
    }
    .modes button:last-child {
      border-radius: 0 12px 12px 0;
      border-left: none;
    }
    .modes button.on {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      border-color: var(--primary-color);
    }
    .roof svg {
      width: 100%;
      height: auto;
      display: block;
      background: radial-gradient(ellipse at 30% 20%, #1b222b, #0f1318);
      border-radius: 10px;
    }
    .face {
      fill: var(--roof);
      stroke: var(--roof-edge);
      stroke-width: 0.05;
      stroke-linejoin: round;
    }
    .dummy {
      fill: #15191e;
      stroke: #000;
      stroke-width: 0.02;
    }
    .panel {
      stroke: #000;
      stroke-width: 0.02;
    }
    .cell {
      cursor: pointer;
    }
    .cell.dim {
      opacity: 0.4;
    }
    .hl {
      fill: none;
      stroke: #fff;
      stroke-width: 0.07;
    }
    text.slot {
      font-size: 0.32px;
      fill: #fff;
      fill-opacity: 0.75;
      text-anchor: middle;
      dominant-baseline: central;
      font-weight: 600;
      paint-order: stroke;
      stroke: #000;
      stroke-opacity: 0.5;
      stroke-width: 0.06px;
    }
    text.slot.eave {
      fill: var(--secondary-text-color, #aaa);
      fill-opacity: 1;
      stroke: none;
      cursor: pointer;
      font-weight: 500;
    }
    text.slot.eave.sel {
      fill: var(--primary-text-color, #fff);
      font-weight: 700;
    }
    .facelabel .slopearrow {
      fill: #fff;
      fill-opacity: 0.35;
    }
    .facelabel text {
      text-anchor: middle;
      fill: #fff;
      paint-order: stroke;
      stroke: #000;
      stroke-width: 0.12px;
      stroke-opacity: 0.7;
    }
    .fname {
      font-size: 0.42px;
      font-weight: 600;
    }
    .fsub {
      font-size: 0.32px;
      fill-opacity: 0.85;
    }
    .compassring .dial {
      stroke-dasharray: none;
      fill: rgba(255, 255, 255, 0.02);
      stroke: #4a525d;
    }
    .compassring .tick {
      stroke: #59616c;
    }
    .compassring .tick.major {
      stroke: #8a929c;
    }
    .compassring .ray {
      stroke-linecap: butt;
    }
    .compassring .sunicon circle {
      fill: #ffd54f;
    }
    .compassring .sunicon line {
      stroke: #ffd54f;
      stroke-linecap: round;
    }
    .compassring .rose {
      stroke: none;
      fill: #9aa3ad;
      text-anchor: middle;
      dominant-baseline: central;
      font-weight: 600;
    }
    .compassring .rose.north {
      fill: #e53935;
    }
    .compass circle {
      fill: #0f1318;
      stroke: #555;
      stroke-width: 0.04;
    }
    .compass .n {
      fill: #e53935;
    }
    .compass .s {
      fill: #ccc;
    }
    .compass text {
      font-size: 0.42px;
      fill: #fff;
      text-anchor: middle;
      font-weight: 700;
    }
    .legend {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.78em;
      color: var(--secondary-text-color);
      margin: 6px 2px 0;
      flex-wrap: wrap;
    }
    .legend .bar {
      width: 120px;
      height: 8px;
      border-radius: 4px;
    }
    .legend .sw::before {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      border: 2px solid var(--c);
      margin: 0 3px 0 8px;
      vertical-align: -2px;
    }
    .pick {
      fill: #fff;
      stroke: #e91e63;
      stroke-width: 0.06;
    }
    .picked {
      margin: 6px 2px 0;
      font-size: 0.85em;
    }
    .toast {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 10px;
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      margin-bottom: 4px;
    }
    .pickhead {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .pickhead button,
    button.mini {
      background: none;
      border: 1px solid var(--divider-color, #555);
      color: var(--primary-text-color);
      border-radius: 10px;
      padding: 1px 8px;
      cursor: pointer;
      font: inherit;
      font-size: 0.9em;
    }
    .picklist {
      margin: 4px 0 0;
      padding: 6px 8px;
      border-radius: 6px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
      user-select: all;
      white-space: pre-wrap;
      font-size: 0.9em;
    }
    .hint {
      color: var(--secondary-text-color);
      font-size: 0.8em;
      margin: 4px 2px;
    }
    .detail {
      margin-top: 8px;
      padding: 10px;
      border-radius: 10px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
    }
    .dhead {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 10px;
      align-items: center;
      margin-bottom: 8px;
    }
    .dhead .x {
      margin-left: auto;
      background: none;
      border: none;
      color: var(--secondary-text-color);
      cursor: pointer;
      font-size: 1em;
    }
    .badge {
      font-size: 0.78em;
      padding: 1px 8px;
      border-radius: 10px;
      border: 1px solid var(--c);
      background: color-mix(in srgb, var(--c) 20%, transparent);
    }
    .dgrid {
      display: grid;
      grid-template-columns: 1fr 1fr 1.3fr;
      gap: 10px;
    }
    .dinput .big {
      font-size: 1.3em;
      font-weight: 600;
    }
    .dvals {
      display: grid;
      gap: 2px;
      font-size: 0.9em;
    }
    .dot {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--c);
      margin-right: 4px;
    }
    .clickable {
      cursor: pointer;
    }
    .sun {
      display: grid;
      grid-template-columns: minmax(180px, 1fr) 1.4fr;
      gap: 12px;
      align-items: center;
      margin-top: 14px;
    }
    .sky {
      width: 100%;
      height: auto;
    }
    .horizon {
      fill: color-mix(in srgb, var(--primary-color) 6%, transparent);
      stroke: var(--divider-color, #666);
      stroke-width: 1;
    }
    .ring {
      fill: none;
      stroke: var(--divider-color, #666);
      stroke-width: 0.5;
      stroke-dasharray: 2 3;
    }
    .sky .card {
      font-size: 10px;
      fill: var(--secondary-text-color);
      text-anchor: middle;
      dominant-baseline: central;
    }
    .sky .card.north {
      fill: #e53935;
      font-weight: 700;
    }
    .sunpath {
      fill: none;
      stroke: #f2c14e;
      stroke-width: 1.6;
      stroke-dasharray: 4 3;
    }
    .sundot {
      fill: #ffd54f;
      stroke: #fff;
      stroke-width: 1;
    }
    .sunglow {
      fill: #ffd54f;
      opacity: 0.3;
    }
    .riseset {
      fill: #f2c14e;
    }
    .rslabel {
      font-size: 8px;
      fill: var(--secondary-text-color);
      text-anchor: middle;
    }
    .miniface {
      stroke: #000;
      stroke-width: 0.6;
    }
    .normal {
      stroke: #f2c14e;
      stroke-width: 1.4;
    }
    .normaltip {
      fill: #f2c14e;
    }
    .sunline {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 6px;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      font-size: 0.85em;
    }
    th {
      text-align: left;
      font-weight: 500;
      color: var(--secondary-text-color);
      border-bottom: 1px solid var(--divider-color, #444);
      padding: 3px 4px;
      white-space: nowrap;
    }
    td {
      padding: 3px 4px;
      border-bottom: 1px solid color-mix(in srgb, var(--divider-color, #444) 50%, transparent);
      white-space: nowrap;
    }
    .section {
      margin-top: 14px;
    }
    .stitle {
      font-weight: 500;
      margin-bottom: 6px;
    }
    .strings {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 6px;
    }
    .string {
      padding: 6px 8px;
      border-radius: 8px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
      border: 1px solid transparent;
    }
    .string.down {
      border-color: #e53935;
    }
    .sval {
      font-weight: 600;
    }
    .bad {
      color: #e53935;
    }
    .phases {
      display: flex;
      gap: 14px;
      margin-top: 6px;
      font-size: 0.9em;
      flex-wrap: wrap;
    }
    .tablewrap {
      overflow-x: auto;
    }
    table.inv tr {
      cursor: pointer;
    }
    table.inv tr.sel td {
      background: color-mix(in srgb, var(--primary-color) 18%, transparent);
    }
    .warncell {
      color: #fb8c00;
      font-weight: 600;
    }
    .inventory.bad .stitle {
      color: #fb8c00;
    }
    .inventory ul {
      margin: 0;
      padding-left: 18px;
    }
    .warn {
      margin-top: 10px;
      font-size: 0.8em;
      color: #fb8c00;
    }
    @media (max-width: 600px) {
      .sun {
        grid-template-columns: 1fr;
      }
      .dgrid {
        grid-template-columns: 1fr 1fr;
      }
      .dvals {
        grid-column: span 2;
        grid-template-columns: 1fr 1fr;
      }
    }
  `;
}

if (!customElements.get('roof-pv-card')) customElements.define('roof-pv-card', RoofPvCard);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'roof-pv-card',
  name: 'Roof PV Card',
  description: 'Ennogie-style roof visualisation of a PV system with micro inverters',
  preview: false,
  documentationURL: 'https://github.com/MrJones4u/HA-card-ennogie-style-roof-visualisation',
});

console.info(`%c ROOF-PV-CARD %c ${VERSION} `, 'color:#fff;background:#1d5fa3;font-weight:700', 'color:#1d5fa3;background:#fff');
