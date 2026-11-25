# Roof PV Card – Ennogie-style roof visualisation

A Home Assistant Lovelace card that draws your roof panel by panel and colours every panel by what its micro inverter input is producing right now. Built for integrated solar roofs (Ennogie and similar) with many small modules on dual-input micro inverters (APsystems DS3 / YC600 via the `apsystems_ecu_reader` integration), but the entity naming is configurable.

## Features

- **Roof drawing**: every panel at its real position, coloured by **W per panel** (power mode) or **% of the median of panels with the same orientation** (relative mode, best for finding problems on cloudy days).
- **Panel → inverter mapping**: tap a panel to highlight all panels of its inverter and see both inputs, W/panel, temperature, grid frequency, voltage, signal, online state and the replacement history of that slot.
- **Status detection**: `offline` (no data in daylight), `no output` (< 10 % of the orientation median), `low output` (< 70 %), `night`. Night is never shown as a fault.
- **Sun view**: sky dome with today's sun path, sunrise / sunset, current sun position and the roof drawn at its configured rotation. For each roof face: azimuth, tilt, current angle-of-incidence factor and actual production.
- **Strings**: power per AC string (e.g. per RCBO), phase totals and imbalance, optional breaker entity, warning when a whole string is down.
- **Inverter table** with all values.
- **Inventory check**: compares the inverters you configured with the inverter entities that exist in HA, so a swapped inverter that isn't mapped to a slot yet, or a mapped one that disappeared, shows up immediately.

## Installation

### HACS (custom repository)

1. HACS → ⋮ → **Custom repositories** → add `https://github.com/MrJones4u/HA-card-ennogie-style-roof-visualisation`, category **Dashboard**.
2. Install **Roof PV Card**, reload the browser.

### Manual

Copy `dist/roof-pv-card.js` to `/config/www/roof-pv-card.js` and add a dashboard resource `/local/roof-pv-card.js` (type: JavaScript module).

## Configuration

The card is configured in YAML (no visual editor yet). See [`examples/example.yaml`](examples/example.yaml).

| Option | Default | Description |
|---|---|---|
| `title` | `Roof PV` | Card title |
| `panel_wp` | `400` | Peak power of one panel (W), scales the colours and kWp figures |
| `north` | `0` | Direction of north in your drawing, degrees **clockwise from up**. Face azimuths are derived from it |
| `entity_pattern` | `sensor.inverter_{serial}_{key}` | How inverter entity ids are built |
| `panel_size` | `[0.6, 1.2]` | Width and height of one grid cell in metres |
| `faces` | – | Roof faces, see below |
| `strings` | – | Optional AC strings: `id`, `name`, `phase`, `breaker` (entity, on = closed) |
| `inverters` | – | `slot`, `serial`, `string`, optional `name`, `prefix`, `entities`, `history` |
| `ignore_serials` | `[]` | Serials to ignore in the inventory check (stale entities of removed units) |
| `total_power_entity` | – | Optional total power entity (otherwise the inverter sum is shown) |
| `today_energy_entity` | – | Optional energy-today entity |
| `mode` | `power` | Initial colour mode, `power` or `relative` |
| `show` | all | Sections and their order: `header`, `roof`, `sun`, `strings`, `inverters`, `inventory` |
| `daylight_elevation` | `5` | Sun elevation (°) above which missing data counts as offline |
| `latitude` / `longitude` | HA home | Location for the sun calculation |

Inverter entity keys: `power_ch_1`, `power_ch_2`, `temperature`, `frequency`, `voltage`, `signal`, `online`. An inverter's entity is `entities.<key>` if set, else `<prefix>_<key>` if `prefix` is set, else `entity_pattern` with `{serial}` and `{key}` filled in.

### Faces and the panel map

```yaml
faces:
  - name: South
    slope: down      # downhill direction in the drawing: up | down | left | right
    tilt: 20         # degrees
    # azimuth: 180   # optional, overrides slope + north
    x: 0             # top-left of the grid in the drawing, metres
    y: 0
    map: |
      12a 12b 11a 11b .
      12a 12b 11a 11b x
```

Each line of `map` is one row of panels from top to bottom, each token one panel:

- `12a` – panel on inverter **slot 12, input 1** (`12b` = input 2; `121`/`122` also work)
- `.` – no panel
- `x` – dummy / inactive tile (drawn, but not counted)

The number of tokens per input is the number of panels in that chain, so W/panel comes out right even when chains have different lengths.

### How status is judged

For every input the card computes W/panel and compares it with the median W/panel of all inputs on faces with the same azimuth (±5°). Comparing with neighbours instead of with peak power keeps the check meaningful on cloudy days and in winter. Below 5 W/panel median nothing is judged.

## Development

```bash
npm install
npm run build      # -> dist/roof-pv-card.js
npm run watch
```

Releases: build, commit `dist/`, then `gh release create vX.Y.Z dist/roof-pv-card.js` so HACS picks up the new version.

## License

MIT
