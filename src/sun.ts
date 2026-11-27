// Sun position based on the formulas used by suncalc (Vladimir Agafonkin, BSD-2-Clause),
// reduced to what the card needs.

const RAD = Math.PI / 180;
const DAY_MS = 86400000;
const J1970 = 2440588;
const J2000 = 2451545;
const E = RAD * 23.4397; // obliquity of the Earth

const toDays = (date: Date) => date.valueOf() / DAY_MS - 0.5 + J1970 - J2000;

function sunCoords(d: number) {
  const M = RAD * (357.5291 + 0.98560028 * d);
  const C = RAD * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
  const L = M + C + RAD * 102.9372 + Math.PI;
  const dec = Math.asin(Math.sin(0) * Math.cos(E) + Math.cos(0) * Math.sin(E) * Math.sin(L));
  const ra = Math.atan2(Math.sin(L) * Math.cos(E) - Math.tan(0) * Math.sin(E), Math.cos(L));
  return { dec, ra };
}

export interface SunPos {
  /** compass azimuth in degrees, 0 = north, 90 = east */
  azimuth: number;
  /** elevation above the horizon in degrees */
  elevation: number;
}

export function sunPosition(date: Date, lat: number, lon: number): SunPos {
  const lw = RAD * -lon;
  const phi = RAD * lat;
  const d = toDays(date);
  const c = sunCoords(d);
  const H = RAD * (280.16 + 360.9856235 * d) - lw - c.ra;
  const az = Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(c.dec) * Math.cos(phi));
  const alt = Math.asin(Math.sin(phi) * Math.sin(c.dec) + Math.cos(phi) * Math.cos(c.dec) * Math.cos(H));
  return { azimuth: (az / RAD + 180 + 360) % 360, elevation: alt / RAD };
}

export interface SunDay {
  sunrise?: Date;
  sunset?: Date;
  noon?: Date;
  path: { t: Date; azimuth: number; elevation: number }[];
}

/** Path of the sun for the local day containing `date`, sampled every `stepMin` minutes. */
export function sunDay(date: Date, lat: number, lon: number, stepMin = 5): SunDay {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const path: SunDay['path'] = [];
  let sunrise: Date | undefined;
  let sunset: Date | undefined;
  let noon: Date | undefined;
  let maxEl = -90;
  let prev: SunPos | undefined;
  let prevT: Date | undefined;
  const h0 = -0.833; // refraction + sun radius
  for (let m = 0; m <= 24 * 60; m += stepMin) {
    const t = new Date(start.getTime() + m * 60000);
    const p = sunPosition(t, lat, lon);
    if (prev && prevT) {
      if (prev.elevation < h0 && p.elevation >= h0) sunrise = interp(prevT, t, prev.elevation, p.elevation, h0);
      if (prev.elevation >= h0 && p.elevation < h0) sunset = interp(prevT, t, prev.elevation, p.elevation, h0);
    }
    if (p.elevation > maxEl) {
      maxEl = p.elevation;
      noon = t;
    }
    if (p.elevation >= h0 - 1) path.push({ t, ...p });
    prev = p;
    prevT = t;
  }
  return { sunrise, sunset, noon, path };
}

function interp(t0: Date, t1: Date, e0: number, e1: number, h: number): Date {
  const f = (h - e0) / (e1 - e0);
  return new Date(t0.getTime() + f * (t1.getTime() - t0.getTime()));
}

/**
 * Share of direct sunlight hitting a tilted plane (cosine of the angle of incidence), 0..1.
 * Ignores atmosphere, so it is a clear-sky geometry factor, not a forecast.
 */
export function incidence(sun: SunPos, faceAzimuth: number, tilt: number): number {
  if (sun.elevation <= 0) return 0;
  const e = sun.elevation * RAD;
  const b = tilt * RAD;
  const c = Math.sin(e) * Math.cos(b) + Math.cos(e) * Math.sin(b) * Math.cos((sun.azimuth - faceAzimuth) * RAD);
  return Math.max(0, c);
}

/** signed cosine of the angle of incidence (negative = sun behind the plane), ignoring the horizon */
export function incidenceRaw(sun: SunPos, faceAzimuth: number, tilt: number): number {
  const e = sun.elevation * RAD;
  const b = tilt * RAD;
  return Math.sin(e) * Math.cos(b) + Math.cos(e) * Math.sin(b) * Math.cos((sun.azimuth - faceAzimuth) * RAD);
}
