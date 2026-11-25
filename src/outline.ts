// Outline around all panels: rasterise the (slightly enlarged) panel rectangles,
// close small gaps (morphological closing) and trace the boundary into an SVG path.

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface OutlineOptions {
  /** distance between panel edge and outline, metres */
  margin: number;
  /** gaps narrower than 2 × merge are bridged, metres */
  merge: number;
  /** raster resolution, metres */
  res?: number;
}

export function outlinePath(rects: Rect[], opt: OutlineOptions): string {
  if (!rects.length) return '';
  const res = opt.res ?? 0.05;
  const grow = opt.margin + opt.merge;
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const r of rects) {
    x0 = Math.min(x0, r.x);
    y0 = Math.min(y0, r.y);
    x1 = Math.max(x1, r.x + r.w);
    y1 = Math.max(y1, r.y + r.h);
  }
  const pad = grow + 2 * res;
  x0 -= pad; y0 -= pad; x1 += pad; y1 += pad;
  const W = Math.ceil((x1 - x0) / res);
  const H = Math.ceil((y1 - y0) / res);
  let g: Uint8Array = new Uint8Array(W * H);
  for (const r of rects) {
    const a = Math.max(0, Math.round((r.x - grow - x0) / res));
    const b = Math.min(W, Math.round((r.x + r.w + grow - x0) / res));
    const c = Math.max(0, Math.round((r.y - grow - y0) / res));
    const d = Math.min(H, Math.round((r.y + r.h + grow - y0) / res));
    for (let y = c; y < d; y++) g.fill(1, y * W + a, y * W + b);
  }
  // erode by `merge` (square kernel, separable) -> closing
  const k = Math.round(opt.merge / res);
  if (k > 0) g = erode(g, W, H, k);

  // boundary edges, oriented so the filled side is on the right
  const at = (x: number, y: number) => (x >= 0 && y >= 0 && x < W && y < H ? g[y * W + x] : 0);
  const next = new Map<number, number[]>(); // start vertex -> end vertices
  const key = (x: number, y: number) => y * (W + 1) + x;
  const add = (ax: number, ay: number, bx: number, by: number) => {
    const k1 = key(ax, ay);
    const l = next.get(k1);
    if (l) l.push(key(bx, by));
    else next.set(k1, [key(bx, by)]);
  };
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (!g[y * W + x]) continue;
      if (!at(x, y - 1)) add(x, y, x + 1, y);
      if (!at(x + 1, y)) add(x + 1, y, x + 1, y + 1);
      if (!at(x, y + 1)) add(x + 1, y + 1, x, y + 1);
      if (!at(x - 1, y)) add(x, y + 1, x, y);
    }
  }
  const parts: string[] = [];
  const fx = (k1: number) => x0 + (k1 % (W + 1)) * res;
  const fy = (k1: number) => y0 + Math.floor(k1 / (W + 1)) * res;
  for (const start of [...next.keys()]) {
    while (next.get(start)?.length) {
      const loop: number[] = [start];
      let cur = next.get(start)!.pop()!;
      let guard = 0;
      while (cur !== start && guard++ < 1e6) {
        loop.push(cur);
        const l = next.get(cur);
        if (!l || !l.length) break;
        cur = l.pop()!;
      }
      // drop collinear points
      const pts: number[] = [];
      for (let i = 0; i < loop.length; i++) {
        const p = loop[(i - 1 + loop.length) % loop.length], c = loop[i], n = loop[(i + 1) % loop.length];
        const dx1 = fx(c) - fx(p), dy1 = fy(c) - fy(p), dx2 = fx(n) - fx(c), dy2 = fy(n) - fy(c);
        if (Math.abs(dx1 * dy2 - dy1 * dx2) > 1e-9) pts.push(c);
      }
      if (pts.length < 3) continue;
      parts.push('M' + pts.map((p) => `${fx(p).toFixed(3)},${fy(p).toFixed(3)}`).join('L') + 'Z');
    }
  }
  return parts.join('');
}

function erode(g: Uint8Array, W: number, H: number, k: number): Uint8Array {
  // horizontal pass: cell stays 1 only if all cells within ±k are 1
  const h = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    let run = 0;
    const row = y * W;
    const left = new Int32Array(W); // length of the run of 1s ending at x
    for (let x = 0; x < W; x++) {
      run = g[row + x] ? run + 1 : 0;
      left[x] = run;
    }
    run = 0;
    for (let x = W - 1; x >= 0; x--) {
      run = g[row + x] ? run + 1 : 0;
      if (left[x] > k && run > k) h[row + x] = 1;
    }
  }
  const v = new Uint8Array(W * H);
  const up = new Int32Array(W * H);
  for (let x = 0; x < W; x++) {
    let run = 0;
    for (let y = 0; y < H; y++) {
      run = h[y * W + x] ? run + 1 : 0;
      up[y * W + x] = run;
    }
    run = 0;
    for (let y = H - 1; y >= 0; y--) {
      run = h[y * W + x] ? run + 1 : 0;
      if (up[y * W + x] > k && run > k) v[y * W + x] = 1;
    }
  }
  return v;
}
