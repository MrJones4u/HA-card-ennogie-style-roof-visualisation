// Config types and parsing into a render model.

export type Slope = 'up' | 'down' | 'left' | 'right';

export interface FaceConfig {
  name: string;
  /** downhill direction in the drawing; used to derive the azimuth from `north` */
  slope?: Slope;
  /** explicit compass azimuth the face points to (overrides slope + north) */
  azimuth?: number;
  tilt?: number;
  /** position of the top-left cell in the drawing, metres: [x, y] */
  position?: [number, number];
  /** same as position (note: in YAML a bare `y:` key can be read as boolean true – prefer `position`) */
  x?: number;
  y?: number;
  left?: number;
  top?: number;
  /** grid, one row per line, tokens separated by whitespace: `12a` = inverter slot 12 input 1, `12b` = input 2, `.` = nothing, `-` = roof without PV (chimney, duct …), `x` = dummy tile */
  map: string;
  panel_size?: [number, number];
}

export interface StringConfig {
  id: string;
  name?: string;
  phase?: string;
  /** optional entity of the RCBO / RCCB / breaker (switch or binary_sensor, on = closed) */
  breaker?: string;
}

export interface InverterConfig {
  slot: number;
  serial: string;
  string?: string;
  name?: string;
  /** entity id prefix, e.g. sensor.my_inverter_123456 -> sensor.my_inverter_123456_power_ch_1 */
  prefix?: string;
  /** per-key entity overrides */
  entities?: Partial<Record<InverterKey, string>>;
  history?: { serial: string; replaced?: string; note?: string }[];
}

export type InverterKey = 'power_ch_1' | 'power_ch_2' | 'temperature' | 'frequency' | 'voltage' | 'signal' | 'online';
export const INVERTER_KEYS: InverterKey[] = ['power_ch_1', 'power_ch_2', 'temperature', 'frequency', 'voltage', 'signal', 'online'];

export type SectionName = 'header' | 'roof' | 'sun' | 'strings' | 'inverters' | 'inventory';

export interface CardConfig {
  type: string;
  title?: string;
  panel_wp?: number;
  /** direction of north in the drawing, degrees clockwise from "up" */
  north?: number;
  /** entity id pattern with {serial} and {key} */
  entity_pattern?: string;
  panel_size?: [number, number];
  faces: FaceConfig[];
  strings?: StringConfig[];
  inverters: InverterConfig[];
  /** serials to ignore in the inventory check (stale entities of removed units) */
  ignore_serials?: string[];
  total_power_entity?: string;
  today_energy_entity?: string;
  /** show face name, orientation and slope arrow on the roof drawing (default false) */
  face_labels?: boolean;
  /** roof outline: one outline around all panels (default), one box per face, or none */
  outline?: 'panels' | 'faces' | 'none';
  /** distance between panels and outline in metres (default 0.1) */
  outline_margin?: number;
  /** gaps up to 2 × this many metres between panels are bridged by the outline (default 0.35) */
  outline_merge?: number;
  /** inverter numbers: at the eave edge of each face (default), in the centre of its panels, or none */
  slot_labels?: 'eave' | 'center' | 'none';
  /** roof view: inside a compass circle (default) or plain plan */
  view?: 'compass' | 'plan';
  /** default colour mode */
  mode?: 'power' | 'relative';
  /** sections to show, in order */
  show?: SectionName[];
  /** sun elevation (deg) above which an inverter without data counts as offline */
  daylight_elevation?: number;
  /** override location (defaults to HA's home location) */
  latitude?: number;
  longitude?: number;
}

export interface Cell {
  x: number;
  y: number;
  w: number;
  h: number;
  face: number;
  /** 1-based row / column in the face map */
  row: number;
  col: number;
  slot?: number;
  input?: 0 | 1;
  dummy?: boolean;
  /** roof area without PV: part of the outline, not drawn as a panel */
  roof?: boolean;
}

export interface FaceModel {
  index: number;
  name: string;
  azimuth: number;
  tilt: number;
  slope?: Slope;
  bbox: { x: number; y: number; w: number; h: number };
  cells: Cell[];
  panels: number;
  /** inverter slots with at least one panel on this face */
  slots: Set<number>;
}

export interface InputModel {
  slot: number;
  input: 0 | 1;
  panels: number;
  faces: Set<number>;
}

export interface Model {
  faces: FaceModel[];
  cells: Cell[];
  inputs: Map<string, InputModel>; // key `${slot}:${input}`
  bbox: { x: number; y: number; w: number; h: number };
  totalPanels: number;
  warnings: string[];
}

const SLOPE_ANGLE: Record<Slope, number> = { up: 0, right: 90, down: 180, left: 270 };

export function faceAzimuth(f: FaceConfig, north: number): number {
  if (typeof f.azimuth === 'number') return norm(f.azimuth);
  if (f.slope) return norm(SLOPE_ANGLE[f.slope] - north);
  return 180;
}

export const norm = (a: number) => ((a % 360) + 360) % 360;

export const inputKey = (slot: number, input: number) => `${slot}:${input}`;

export function buildModel(cfg: CardConfig): Model {
  const north = cfg.north ?? 0;
  const [dw, dh] = cfg.panel_size ?? [0.6, 1.2];
  const warnings: string[] = [];
  const inputs = new Map<string, InputModel>();
  const faces: FaceModel[] = [];
  const cells: Cell[] = [];
  const known = new Set(cfg.inverters.map((i) => i.slot));

  cfg.faces.forEach((f, index) => {
    const [pw, ph] = f.panel_size ?? [dw, dh];
    const anyF = f as any;
    const fx = Number(f.position?.[0] ?? f.left ?? f.x ?? 0);
    // YAML 1.1 parsers turn a `y:` key into the boolean key `true`
    const fy = Number(f.position?.[1] ?? f.top ?? f.y ?? anyF['true'] ?? 0);
    const rows = (f.map || '')
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length);
    const fc: Cell[] = [];
    const slots = new Set<number>();
    let maxCols = 0;
    rows.forEach((row, r) => {
      const toks = row.split(/\s+/);
      maxCols = Math.max(maxCols, toks.length);
      toks.forEach((tok, c) => {
        if (tok === '.') return;
        const cell: Cell = { x: fx + c * pw, y: fy + r * ph, w: pw, h: ph, face: index, row: r + 1, col: c + 1 };
        if (tok === '-') {
          cell.roof = true;
        } else if (tok.toLowerCase() === 'x') {
          cell.dummy = true;
        } else {
          const m = /^(\d+)([ab12])$/i.exec(tok);
          if (!m) {
            warnings.push(`${f.name}: unknown token "${tok}" in row ${r + 1}`);
            return;
          }
          const slot = parseInt(m[1], 10);
          const input = (/[a1]/i.test(m[2]) ? 0 : 1) as 0 | 1;
          if (!known.has(slot)) warnings.push(`${f.name}: slot ${slot} is not configured under inverters`);
          cell.slot = slot;
          cell.input = input;
          slots.add(slot);
          const k = inputKey(slot, input);
          const im = inputs.get(k) ?? { slot, input, panels: 0, faces: new Set<number>() };
          im.panels++;
          im.faces.add(index);
          inputs.set(k, im);
        }
        fc.push(cell);
        cells.push(cell);
      });
    });
    faces.push({
      index,
      name: f.name ?? `Face ${index + 1}`,
      azimuth: faceAzimuth(f, north),
      tilt: f.tilt ?? 30,
      slope: f.slope,
      bbox: { x: fx, y: fy, w: maxCols * pw, h: rows.length * ph },
      cells: fc,
      panels: fc.filter((c) => !c.dummy && !c.roof).length,
      slots,
    });
  });

  for (const inv of cfg.inverters) {
    for (const input of [0, 1] as const) {
      if (!inputs.has(inputKey(inv.slot, input))) {
        warnings.push(`Inverter ${inv.slot}: input ${input + 1} has no panels in any face map`);
      }
    }
  }

  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const f of faces) {
    x0 = Math.min(x0, f.bbox.x);
    y0 = Math.min(y0, f.bbox.y);
    x1 = Math.max(x1, f.bbox.x + f.bbox.w);
    y1 = Math.max(y1, f.bbox.y + f.bbox.h);
  }
  if (!isFinite(x0)) { x0 = 0; y0 = 0; x1 = 1; y1 = 1; }
  return {
    faces,
    cells,
    inputs,
    bbox: { x: x0, y: y0, w: x1 - x0, h: y1 - y0 },
    totalPanels: cells.filter((c) => !c.dummy && !c.roof).length,
    warnings,
  };
}
