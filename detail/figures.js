/* Project figures: schematic redraws of the manuscript figures, on synthetic data.
   FIGS.plate(slug) -> square 100 x 100 SVG (landing page, project list)
   FIGS.wide(slug)  -> multi-panel SVG (project detail page)
   FIGS.caption(slug) -> one-line caption for the wide figure
   All animations are SMIL loops; they are dropped under prefers-reduced-motion. */
(function () {
  'use strict';
  var reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var MONO = "'IBM Plex Mono',ui-monospace,monospace";
  var INK = '#1A1C1D', AX = '#B4B8BB', GRID = '#ECEDEE', LAB = '#61666A', BOX = '#E2E4E5';
  var uid = 0;

  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function gs(r) { return Math.sqrt(-2 * Math.log(1 - r() + 1e-12)) * Math.cos(6.283185 * r()); }
  function n(v) { return Math.round(v * 100) / 100; }
  function kt(v) { return Math.max(0, Math.min(1, v)).toFixed(4); }

  function A(attr, vals, times, dur, extra) {
    if (reduced) return '';
    return '<animate attributeName="' + attr + '" values="' + vals.join(';') + '" keyTimes="' + times.map(kt).join(';') + '" dur="' + dur + 's" repeatCount="indefinite"' + (extra || '') + '/>';
  }
  function show(t0, t1, dur, o) {
    o = o == null ? 1 : o;
    t0 = Math.min(t0, 0.9); t1 = Math.min(Math.max(t1, t0 + 0.002), 0.93);
    return A('opacity', [0, 0, o, o, 0], [0, t0, t1, 0.95, 1], dur);
  }
  function drawA(t0, t1, dur) {
    return A('stroke-dashoffset', [1, 1, 0, 0], [0, t0, t1, 1], dur) + A('opacity', [0, 0, 1, 1, 0], [0, t0, t0 + 0.002, 0.95, 1], dur);
  }
  function slots(vis, dur, attr) {
    var k = vis.length, vals = [vis[0], vis[0]], times = [0, 0.02], i;
    for (i = 0; i < k; i++) {
      if (i > 0) { vals.push(vis[i]); times.push(i / k + 0.025); }
      vals.push(vis[i]); times.push((i + 1) / k - 0.025);
    }
    vals.push(vis[0]); times.push(1);
    return A(attr || 'opacity', vals, times, dur);
  }

  function L(x1, y1, x2, y2, st, sw, ex, inner) {
    return '<line x1="' + n(x1) + '" y1="' + n(y1) + '" x2="' + n(x2) + '" y2="' + n(y2) + '" stroke="' + st + '" stroke-width="' + sw + '"' + (ex || '') + (inner ? '>' + inner + '</line>' : '/>');
  }
  function C(cx, cy, r, fill, ex, inner) {
    return '<circle cx="' + n(cx) + '" cy="' + n(cy) + '" r="' + n(r) + '" fill="' + fill + '"' + (ex || '') + (inner ? '>' + inner + '</circle>' : '/>');
  }
  function P(d, st, sw, ex, inner) {
    return '<path d="' + d + '" fill="none" stroke="' + st + '" stroke-width="' + sw + '" stroke-linejoin="round" stroke-linecap="round"' + (ex || '') + (inner ? '>' + inner + '</path>' : '/>');
  }
  function DP(d, st, sw, t0, t1, dur, ex) {
    return P(d, st, sw, (reduced ? '' : ' pathLength="1" stroke-dasharray="1"') + (ex || ''), drawA(t0, t1, dur));
  }
  function F(d, fill, ex, inner) {
    return '<path d="' + d + '" fill="' + fill + '" stroke="none"' + (ex || '') + (inner ? '>' + inner + '</path>' : '/>');
  }
  function Rc(x, y, w, h, fill, ex, inner) {
    return '<rect x="' + n(x) + '" y="' + n(y) + '" width="' + n(w) + '" height="' + n(h) + '" fill="' + fill + '"' + (ex || '') + (inner ? '>' + inner + '</rect>' : '/>');
  }
  function T(x, y, s, size, ex) {
    return '<text x="' + n(x) + '" y="' + n(y) + '" font-size="' + (size || 11) + '" fill="' + LAB + '"' + (ex || '') + '>' + s + '</text>';
  }
  function poly(pts) {
    return pts.map(function (p, i) { return (i ? 'L' : 'M') + n(p[0]) + ' ' + n(p[1]); }).join('');
  }
  function box(x, y, w, h) { return Rc(x, y, w, h, '#FFFFFF', ' rx="8" stroke="' + BOX + '"'); }
  function axes(g) {
    return L(g.x, g.y + g.h, g.x + g.w, g.y + g.h, AX, 0.8) + L(g.x, g.y, g.x, g.y + g.h, AX, 0.8);
  }
  function svg(W, H, inner) {
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="display:block;height:auto;overflow:visible" font-family="' + MONO + '" role="img">' + inner + '</svg>';
  }
  var PLATE = { x: 6, y: 6, w: 88, h: 88, plate: true };
  function legend(items, x, y) {
    var o = '', cx = x;
    items.forEach(function (it) {
      if (it.dot) o += C(cx + 5, y - 4, 4.2, it.dot, it.ring ? ' stroke="' + INK + '" stroke-width="1"' : '');
      else if (it.fill) o += Rc(cx, y - 9, 16, 10, it.fill, ' rx="2"' + (it.op ? ' opacity="' + it.op + '"' : ''));
      else o += L(cx, y - 4, cx + 20, y - 4, it.line, it.sw || 2, it.dash ? ' stroke-dasharray="' + it.dash + '"' : '');
      var lx = cx + (it.dot ? 16 : it.fill ? 23 : 27);
      o += T(lx, y, it.label, 11);
      cx = lx + it.label.length * 6.7 + 22;
    });
    return o;
  }

  /* ---------- 1. Local Joint Model: individual conditional risk at a landmark ---------- */
  var LJM_COL = ['#58767A', '#8FB9A0', '#B57BEE'];
  function ljmPanel(g, sub, dur) {
    var r = rng(sub.seed), s = 5, o = '', k, t;
    var X = function (v) { return g.x + v / 10 * g.w; };
    var Y = function (v) { return g.y + g.h - (v + 1.2) / 6.6 * g.h; };
    var YR = function (p) { return g.y + g.h - (0.1 + p * 0.78) * g.h; };
    var sw = g.plate ? 1.1 : 1.8, pr = g.plate ? 1.6 : 3.4;
    if (g.plate) o += axes(g);
    else {
      [0, 2, 4].forEach(function (v) { o += L(g.x, Y(v), g.x + g.w, Y(v), GRID, 1) + T(g.x - 9, Y(v) + 4, v, 10.5, ' text-anchor="end"'); });
      [0, 2.5, 5, 7.5, 10].forEach(function (v) { o += L(X(v), g.y, X(v), g.y + g.h, GRID, 1) + T(X(v), g.y + g.h + 17, v, 10.5, ' text-anchor="middle"'); });
      [0, 0.4, 0.8].forEach(function (p) { o += T(g.x + g.w + 9, YR(p) + 4, p.toFixed(1), 10.5, ' fill="#3B5B8C"'); });
    }
    for (k = 0; k < 3; k++) {
      var lvl = [3.1, 1.0, 0.5][k] + (r() - 0.5) * 0.7, sl = [-0.07, 0.19, -0.05][k] * sub.sl;
      t = 0;
      while (t < s - 0.05) {
        var v = lvl + sl * t + gs(r) * 0.14, t0 = 0.03 + t / s * 0.3;
        o += C(X(t), Y(v), pr, LJM_COL[k], '', show(t0, t0 + 0.03, dur));
        t += 0.4 + r() * 1.1;
      }
      o += L(X(s - 0.9), Y(lvl + sl * (s - 0.9)), X(s + 0.85), Y(lvl + sl * (s + 0.85)), LJM_COL[k], sw, ' stroke-dasharray="' + (g.plate ? '2.4 1.8' : '7 5') + '"', show(0.42 + 0.025 * k, 0.47 + 0.025 * k, dur));
    }
    o += L(X(s), g.y, X(s), g.y + g.h, '#5F6468', sw * 0.8, ' stroke-dasharray="' + (g.plate ? '1.6 1.6' : '5 4') + '"', show(0.36, 0.4, dur));
    var pts = [], p = 0, i;
    for (i = 0; i <= 48; i++) {
      t = s + i * (9.8 - s) / 48;
      p = Math.max(p, 1 - Math.exp(-sub.a * Math.pow(t - s, sub.b)) + (r() < 0.2 ? r() * 0.035 : 0));
      pts.push([X(t), YR(Math.min(p, 1))]);
    }
    o += DP(poly(pts), '#3B5B8C', sw * 1.55, 0.5, 0.8, dur);
    o += L(X(sub.T), g.y, X(sub.T), g.y + g.h, '#E0382B', sw, '', show(0.82, 0.86, dur));
    return o;
  }
  var LJM_SUB = [
    { seed: 11, T: 5.3, a: 0.55, b: 1.3, sl: 1.2, id: 'A' }, { seed: 23, T: 6.5, a: 0.22, b: 1.5, sl: 1, id: 'B' },
    { seed: 37, T: 6.3, a: 0.12, b: 1.7, sl: 0.9, id: 'C' }, { seed: 41, T: 9.4, a: 0.012, b: 2.3, sl: 0.4, id: 'D' }
  ];
  function ljmWide() {
    var o = '', xs = [62, 562], ys = [44, 344], pw = 376, ph = 206;
    LJM_SUB.forEach(function (sub, i) {
      var g = { x: xs[i % 2], y: ys[i >> 1], w: pw, h: ph };
      o += box(g.x, g.y, g.w, g.h) + T(g.x, g.y - 12, 'subject ' + sub.id + ' &#183; T = ' + sub.T.toFixed(1) + ' (event)', 12, ' fill="' + INK + '"') + ljmPanel(g, sub, 10);
      o += T(g.x + g.w / 2, g.y + g.h + 36, 'years', 10.5, ' text-anchor="middle"');
    });
    o += T(18, 300, 'longitudinal process', 11, ' text-anchor="middle" transform="rotate(-90 18 300)"');
    o += T(988, 300, 'conditional risk', 11, ' text-anchor="middle" fill="#3B5B8C" transform="rotate(90 988 300)"');
    o += legend([{ dot: LJM_COL[1], label: 'log serBilir' }, { dot: LJM_COL[0], label: 'albumin' }, { dot: LJM_COL[2], label: 'prothrombin' },
      { line: '#5F6468', dash: '5 4', sw: 1.5, label: 'landmark s = 5' }, { line: '#8FB9A0', dash: '7 5', label: 'local linear fit' },
      { line: '#3B5B8C', sw: 3, label: 'risk' }, { line: '#E0382B', label: 'event' }], 62, 626);
    return svg(1000, 638, o);
  }

  /* ---------- 2. Three-way network dynamics: perceived networks by wave ---------- */
  var TW = (function () {
    var r = rng(5), nodes = [], tries = 0;
    while (nodes.length < 20 && tries++ < 4000) {
      var x = 0.06 + r() * 0.88, y = 0.06 + r() * 0.88, ok = true;
      nodes.forEach(function (q) { if (Math.hypot(q.x - x, q.y - y) < 0.15) ok = false; });
      if (ok) nodes.push({ x: x, y: y, m: Math.hypot(x - 0.45, y - 0.55) < 0.27 });
    }
    var cand = [];
    nodes.forEach(function (a, i) { nodes.forEach(function (b, j) { if (i !== j && Math.hypot(a.x - b.x, a.y - b.y) < 0.44) cand.push([i, j]); }); });
    function waves(seed) {
      var q = rng(seed), cur = [], out = [];
      function add(k) { while (k-- > 0) { var c = cand[Math.floor(q() * cand.length)], id = c[0] + '-' + c[1]; if (cur.indexOf(id) < 0) cur.push(id); } }
      function drop(k) { while (k-- > 0 && cur.length) cur.splice(Math.floor(q() * cur.length), 1); }
      [[0, 11], [1, 2], [2, 2], [0, 15], [3, 6], [11, 1]].forEach(function (s) { drop(s[0]); add(s[1]); out.push(cur.slice()); });
      return out;
    }
    return { nodes: nodes, waves: waves };
  })();
  var TW_M = '#5B8FD6', TW_F = '#F0908A';
  function twDefs(id) {
    return '<defs><marker id="' + id + '" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="4.6" markerHeight="4.6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#7E8387"/></marker></defs>';
  }
  function twPanel(g, edges, anim, mid) {
    var o = '', pr = g.plate ? 2.5 : 4.3, sw = g.plate ? 0.7 : 1.1;
    var X = function (v) { return g.x + v * g.w; }, Y = function (v) { return g.y + v * g.h; };
    edges.forEach(function (id, e) {
      var ij = id.split('-'), a = TW.nodes[+ij[0]], b = TW.nodes[+ij[1]];
      var dx = X(b.x) - X(a.x), dy = Y(b.y) - Y(a.y), d = Math.hypot(dx, dy), c = (pr + 1.2) / d;
      o += L(X(a.x) + dx * c, Y(a.y) + dy * c, X(b.x) - dx * c, Y(b.y) - dy * c, '#7E8387', sw, ' marker-end="url(#' + mid + ')"', anim(id, e));
    });
    TW.nodes.forEach(function (q) { o += C(X(q.x), Y(q.y), pr, q.m ? TW_M : TW_F, ' stroke="' + INK + '" stroke-width="' + (g.plate ? 0.6 : 1) + '"'); });
    return o;
  }
  function twPlate() {
    var W = TW.waves(8), all = [], mid = 'fgA' + (++uid), g = { x: 4, y: 2, w: 92, h: 86, plate: true }, o = twDefs(mid), k;
    W.forEach(function (w) { w.forEach(function (id) { if (all.indexOf(id) < 0) all.push(id); }); });
    o += twPanel(g, all, function (id) { return slots(W.map(function (w) { return w.indexOf(id) < 0 ? 0 : 1; }), 12); }, mid);
    for (k = 0; k < 6; k++) o += Rc(29 + k * 7.4, 95, 5.4, 1.6, INK, ' rx=".8" opacity="' + (reduced && k ? 0.18 : 1) + '"', slots([0, 1, 2, 3, 4, 5].map(function (j) { return j === k ? 1 : 0.18; }), 12));
    return svg(100, 100, o);
  }
  function twWide() {
    var mid = 'fgA' + (++uid), o = twDefs(mid), pw = 142, gap = 11, x0 = 66, ys = [44, 232], ph = 150;
    [8, 3].forEach(function (per, row) {
      var W = TW.waves(per);
      W.forEach(function (edges, k) {
        var g = { x: x0 + k * (pw + gap), y: ys[row], w: pw, h: ph };
        o += box(g.x, g.y, g.w, g.h);
        if (!row) o += T(g.x + g.w / 2, g.y - 12, 'wave ' + (k + 1), 12, ' text-anchor="middle" fill="' + INK + '"');
        o += twPanel({ x: g.x + 8, y: g.y + 6, w: g.w - 16, h: g.h - 26 }, edges, function (id, e) { var t0 = 0.03 + k * 0.13 + e * 0.004; return show(t0, t0 + 0.05, 12); }, mid);
        o += T(g.x + g.w / 2, g.y + g.h - 7, 'density ' + (edges.length / 380).toFixed(3), 9.5, ' text-anchor="middle"');
      });
      o += T(34, ys[row] + ph / 2, 'perceiver i = ' + per, 11.5, ' text-anchor="middle" fill="' + INK + '" transform="rotate(-90 34 ' + (ys[row] + ph / 2) + ')"');
    });
    o += legend([{ dot: TW_M, ring: 1, label: 'male' }, { dot: TW_F, ring: 1, label: 'female' }, { line: '#7E8387', sw: 1.4, label: 'tie j -> k as perceived by i' }], 66, 412);
    return svg(1000, 424, o);
  }

  /* ---------- 3. Network-assisted localized FPCA: eigenfunctions on a brain network ---------- */
  var PAR = [[0, 62, 38, 168], [0.15, 71, 67, 232], [0.3, 47, 127, 245], [0.45, 18, 169, 220], [0.6, 34, 195, 160], [0.75, 156, 201, 67], [0.88, 232, 187, 46], [1, 249, 245, 20]];
  function parula(v) {
    v = Math.max(0, Math.min(1, v));
    for (var i = 1; i < PAR.length; i++) if (v <= PAR[i][0]) {
      var a = PAR[i - 1], b = PAR[i], t = (v - a[0]) / (b[0] - a[0]);
      return 'rgb(' + [1, 2, 3].map(function (k) { return Math.round(a[k] + (b[k] - a[k]) * t); }).join(',') + ')';
    }
    return 'rgb(249,245,20)';
  }
  var NET = (function () {
    var r = rng(9), N = [], E = [], i, j;
    for (i = 0; i < 58; i++) { var a = gs(r) * 0.16, b = gs(r) * 0.085; N.push({ x: a * 0.94 + b * 0.34, y: a * 0.34 - b * 0.94, t: 0 }); }
    for (i = 0; i < 24; i++) N.push({ x: gs(r) * 0.27, y: gs(r) * 0.2, t: 1 });
    var near = function (i, pool, k) {
      return pool.filter(function (j) { return j !== i; }).sort(function (p, q) { return Math.hypot(N[p].x - N[i].x, N[p].y - N[i].y) - Math.hypot(N[q].x - N[i].x, N[q].y - N[i].y); }).slice(0, k);
    };
    var base = N.map(function (_, k) { return k; });
    base.forEach(function (k) { near(k, base, N[k].t ? 2 : 3).forEach(function (m) { E.push([k, m]); }); });
    var chains = [];
    for (i = 0; i < 9; i++) {
      var ang = i / 9 * 6.283 + (r() - 0.5) * 0.5, from = 0, best = -1e9;
      base.forEach(function (k) { var s = N[k].x * Math.cos(ang) + N[k].y * Math.sin(ang); if (s > best) { best = s; from = k; } });
      var len = 3 + Math.floor(r() * 3), ch = [from], px = N[from].x, py = N[from].y;
      for (j = 0; j < len; j++) {
        ang += (r() - 0.5) * 0.6; px += Math.cos(ang) * 0.11; py += Math.sin(ang) * 0.11;
        N.push({ x: px, y: py, t: 2 }); E.push([ch[ch.length - 1], N.length - 1]); ch.push(N.length - 1);
        if (j === 1 && r() < 0.6) { N.push({ x: px + Math.cos(ang + 1.1) * 0.1, y: py + Math.sin(ang + 1.1) * 0.1, t: 2 }); E.push([ch[ch.length - 1], N.length - 1]); }
      }
      chains.push(ch);
    }
    var x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    N.forEach(function (p) { x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x); y0 = Math.min(y0, p.y); y1 = Math.max(y1, p.y); });
    N.forEach(function (p) { p.x = 0.04 + (p.x - x0) / (x1 - x0) * 0.92; p.y = 0.05 + (p.y - y0) / (y1 - y0) * 0.9; });
    var cx = 0, cy = 0; base.forEach(function (k) { cx += N[k].x / base.length; cy += N[k].y / base.length; });
    var c1 = [cx - 0.09, cy - 0.03], c2 = [cx + 0.1, cy + 0.06];
    var byDist = function (c) { return base.slice().sort(function (p, q) { return Math.hypot(N[p].x - c[0], N[p].y - c[1]) - Math.hypot(N[q].x - c[0], N[q].y - c[1]); }); };
    var phi = [{}, {}, {}], q = rng(3);
    byDist(c1).slice(0, 34).forEach(function (k) { phi[0][k] = q() < 0.06 ? 0.2 : 0.8 + gs(q) * 0.035; });
    byDist(c2).filter(function (k) { return phi[0][k] == null; }).slice(0, 22).forEach(function (k) { phi[1][k] = q() < 0.08 ? 0.95 : 0.56 + gs(q) * 0.035; });
    var far = chains.slice().sort(function (a, b) { return b.length - a.length; })[0];
    far.slice(1).forEach(function (k, m) { phi[2][k] = [0.62, 0.9, 1, 0.45, 0.25, 0.3][m % 6]; });
    var est = phi.map(function (f, m) {
      var e = {}, z = rng(40 + m), extra = 0;
      Object.keys(f).forEach(function (k) { e[k] = Math.max(0.05, Math.min(1, f[k] * (m === 0 ? 0.72 : 0.85) + gs(z) * 0.11)); });
      N.forEach(function (_, k) { if (e[k] == null && extra < 20 && z() < 0.2) { e[k] = z() * 0.13; extra++; } });
      return e;
    });
    return { N: N, E: E, phi: phi, est: est, c: [c1, c2, [N[far[2]].x, N[far[2]].y]] };
  })();
  function netEdges(g, sw) {
    var o = '';
    NET.E.forEach(function (e) { o += L(g.x + NET.N[e[0]].x * g.w, g.y + NET.N[e[0]].y * g.h, g.x + NET.N[e[1]].x * g.w, g.y + NET.N[e[1]].y * g.h, '#D2D5D7', sw); });
    return o;
  }
  function nalfpcaPlate() {
    var g = { x: 0, y: 0, w: 100, h: 92 }, o = netEdges(g, 0.35), dur = 12;
    NET.N.forEach(function (p, k) {
      var vals = NET.phi.map(function (f) { return f[k]; });
      var on = vals.some(function (v) { return v != null; });
      var m0 = vals[0] != null;
      o += C(g.x + p.x * g.w, g.y + p.y * g.h, m0 ? 2.1 : 0.75, m0 ? parula(vals[0]) : '#B9BDC0', '', on ? slots(vals.map(function (v) { return v == null ? '#B9BDC0' : parula(v); }), dur, 'fill') + slots(vals.map(function (v) { return v == null ? 0.75 : 2.1; }), dur, 'r') : '');
    });
    ['&#8321;', '&#8322;', '&#8323;'].forEach(function (sub, k) {
      var an = slots([0, 1, 2].map(function (j) { return j === k ? 1 : 0; }), dur);
      o += '<text x="50" y="99.5" text-anchor="middle" font-size="6.5" fill="' + LAB + '" opacity="' + (k ? 0 : 1) + '">eigenfunction &#966;' + sub + an + '</text>';
    });
    return svg(100, 100, o);
  }
  function nalfpcaWide() {
    var o = '', pw = 300, gap = 20, x0 = 40, ys = [44, 318], ph = 232, gid = 'fgP' + (++uid), sub = ['&#8321;', '&#8322;', '&#8323;'];
    o += '<defs><linearGradient id="' + gid + '">' + PAR.map(function (s) { return '<stop offset="' + s[0] + '" stop-color="rgb(' + s.slice(1).join(',') + ')"/>'; }).join('') + '</linearGradient></defs>';
    [0, 1].forEach(function (row) {
      [0, 1, 2].forEach(function (m) {
        var g = { x: x0 + m * (pw + gap), y: ys[row], w: pw, h: ph }, f = row ? NET.est[m] : NET.phi[m], q = { x: g.x + 8, y: g.y + 6, w: g.w - 16, h: g.h - 12 };
        o += box(g.x, g.y, g.w, g.h) + T(g.x, g.y - 12, (row ? 'estimate &#966;&#770;' + sub[m] + ', n = 100' : 'true &#966;' + sub[m]) + '  (' + Object.keys(f).length + ' nodes)', 12, ' fill="' + INK + '"') + netEdges(q, 0.7);
        var order = Object.keys(f).sort(function (a, b) { return Math.hypot(NET.N[a].x - NET.c[m][0], NET.N[a].y - NET.c[m][1]) - Math.hypot(NET.N[b].x - NET.c[m][0], NET.N[b].y - NET.c[m][1]); });
        NET.N.forEach(function (p, k) { if (f[k] == null) o += C(q.x + p.x * q.w, q.y + p.y * q.h, 1.7, '#B9BDC0'); });
        order.forEach(function (k, idx) {
          var p = NET.N[k], t0 = 0.04 + m * 0.06 + idx / order.length * 0.45;
          var an = row ? show(t0, t0 + 0.04, 10) : (reduced ? '' : '<animate attributeName="r" values="5.2;6.8;5.2" dur="3.2s" begin="' + n(m * 0.5 + idx * 0.03) + 's" repeatCount="indefinite"/>');
          o += C(q.x + p.x * q.w, q.y + p.y * q.h, 5.2, parula(f[k]), '', an);
        });
      });
    });
    o += Rc(40, 578, 200, 9, 'url(#' + gid + ')', ' rx="2"') + T(40, 602, '0', 10.5) + T(240, 602, 'max |&#966;|', 10.5, ' text-anchor="end"');
    o += T(270, 587, 'node colour = eigenfunction value; grey = exactly zero (outside the localized support)', 11);
    return svg(1000, 610, o);
  }

  /* ---------- 4. Penalized kernel quantile regression ---------- */
  var PK = { lo: '#5B8E7D', hi: '#C8553D' };
  function pkqrPlate() {
    var g = PLATE, r = rng(14), o = axes(g), i, dur = 9, h = 0.26;
    var X = function (u) { return g.x + u * g.w; }, Y = function (v) { return g.y + g.h - v * g.h; };
    var m = function (u) { return 0.47 + 0.2 * Math.sin(6.283 * u) + 0.12 * u; }, sd = function (u) { return 0.05 + 0.13 * u; };
    o += Rc(X(0), g.y, h * g.w, g.h, PK.hi, ' opacity=".11"', A('x', [X(0), X(1 - h), X(0)], [0, 0.5, 1], dur));
    for (i = 0; i < 80; i++) { var u = r(); o += C(X(u), Y(m(u) + sd(u) * gs(r)), 1.05, '#A9AEB2'); }
    [[-1.28, PK.lo], [1.28, PK.hi], [0, INK]].forEach(function (z) {
      var pts = []; for (i = 0; i <= 40; i++) pts.push([X(i / 40), Y(m(i / 40) + z[0] * sd(i / 40))]);
      o += P(poly(pts), z[1], z[0] ? 1.1 : 1.5);
    });
    var cx = [], cy = [], ts = [];
    for (i = 0; i <= 40; i++) { var v = h / 2 + (1 - h) * (i <= 20 ? i / 20 : (40 - i) / 20); cx.push(n(X(v))); cy.push(n(Y(m(v)))); ts.push(i / 40); }
    o += C(cx[0], cy[0], 2.3, INK, ' stroke="#F3F4F4" stroke-width=".8"', A('cx', cx, ts, dur) + A('cy', cy, ts, dur));
    return svg(100, 100, o);
  }
  function pkqrWide() {
    var o = '', xs = [62, 548], ys = [44, 318], pw = 390, ph = 206, dur = 10, h = 0.22;
    var fs = [function (u) { return Math.sin(6.283 * u); }, function (u) { return -1 + 8 * (u - 0.5) * (u - 0.5); }, function () { return 0.6; }, function () { return 0; }];
    var names = ['&#946;&#8321;(u) &#183; varying', '&#946;&#8322;(u) &#183; varying', '&#946;&#8323;(u) &#183; constant, detected', '&#946;&#8324;(u) &#183; zero, removed'];
    fs.forEach(function (f, j) {
      var g = { x: xs[j % 2], y: ys[j >> 1], w: pw, h: ph }, r = rng(70 + j), i;
      var X = function (u) { return g.x + u * g.w; }, Y = function (v) { return g.y + g.h / 2 - v / 1.5 * g.h / 2; };
      var ph1 = r() * 6, ph2 = r() * 6, wig = function (u) { return 0.13 * Math.sin(17 * u + ph1) + 0.08 * Math.sin(31 * u + ph2); };
      o += box(g.x, g.y, g.w, g.h) + T(g.x, g.y - 12, names[j], 12, ' fill="' + INK + '"');
      [-1, 0, 1].forEach(function (v) { o += L(g.x, Y(v), g.x + g.w, Y(v), GRID, 1) + T(g.x - 9, Y(v) + 4, v, 10.5, ' text-anchor="end"'); });
      [0, 0.5, 1].forEach(function (u) { o += T(X(u), g.y + g.h + 17, u, 10.5, ' text-anchor="middle"'); });
      o += Rc(X(0), g.y, h * g.w, g.h, PK.hi, ' opacity=".09"', A('x', [X(0), X(1 - h), X(0)], [0, 0.5, 1], dur));
      var up = [], dn = [], raw = [], pen = [], tru = [];
      for (i = 0; i <= 60; i++) {
        var u = i / 60, e = j < 2 ? f(u) + wig(u) * 0.25 : f(u) + (j === 2 ? 0.03 : 0);
        up.push([X(u), Y(e + 0.24 + 0.1 * Math.abs(u - 0.5))]); dn.push([X(u), Y(e - 0.24 - 0.1 * Math.abs(u - 0.5))]);
        raw.push([X(u), Y(f(u) + wig(u))]); pen.push([X(u), Y(e)]); tru.push([X(u), Y(f(u))]);
      }
      o += F(poly(up.concat(dn.reverse())) + 'Z', PK.hi, ' opacity=".13"') + P(poly(raw), '#9DA2A6', 1.4) + P(poly(tru), INK, 1.5, ' stroke-dasharray="6 4"') + DP(poly(pen), PK.hi, 2.6, 0.06, 0.62, dur);
    });
    o += T(62 + pw / 2, 580, 'index variable u', 10.5, ' text-anchor="middle"') + T(548 + pw / 2, 580, 'index variable u', 10.5, ' text-anchor="middle"');
    o += legend([{ line: INK, dash: '6 4', sw: 1.5, label: 'truth' }, { line: '#9DA2A6', sw: 1.5, label: 'kernel estimate' }, { line: PK.hi, sw: 3, label: 'penalized estimate' }, { fill: PK.hi, op: 0.2, label: 'pointwise band' }, { fill: PK.hi, op: 0.1, label: 'kernel window h' }], 62, 606);
    return svg(1000, 616, o);
  }

  /* ---------- 5. Methylation and ADHD: after Fig. 2 (Manhattan + per-CpG effects) ---------- */
  var CHR = [249, 243, 198, 191, 181, 171, 159, 146, 141, 135, 135, 133, 115, 107, 102, 90, 81, 78, 59, 63, 48, 51];
  var MH = { a: '#1A1C1D', b: '#9A9DA0', cand: '#1FC23A', thr: '#2B3FBF' };
  var MH_PEAK = [[0, 0.55, 6.8, 'PBXIP1'], [0, 0.93, 5.9, 'TARBP1'], [10, 0.12, 7.4, 'INS-IGF2'], [16, 0.35, 6.6, 'SLC6A4']];
  function manhPanel(g, np, dur) {
    var r = rng(21), tot = 2976, acc = 0, o = '', pr = g.plate ? 0.85 : 1.9, groups = [], labels = '';
    var X = function (v) { return g.x + v * g.w; }, Y = function (v) { return g.y + g.h - v / 8.3 * g.h; };
    CHR.forEach(function (len, c) {
      var k = Math.round(np * len / tot), i, s = '', col = c % 2 ? MH.b : MH.a;
      for (i = 0; i < k; i++) s += C(X((acc + r() * len) / tot), Y(4.5 * (1 - Math.sqrt(r())) + Math.abs(gs(r)) * 0.22), pr, col);
      for (i = 0; i < Math.round(k * 0.09); i++) s += C(X((acc + (0.2 + Math.floor(r() * 3) * 0.3 + gs(r) * 0.02) * len) / tot), Y(Math.abs(gs(r)) * 1.1), pr, MH.cand);
      MH_PEAK.forEach(function (pk) {
        if (pk[0] !== c) return;
        var px = (acc + pk[1] * len) / tot;
        for (i = 0; i < 4; i++) s += C(X(px + gs(r) * 0.004), Y(4.6 + (pk[2] - 4.6) * i / 4), pr, col);
        s += C(X(px), Y(pk[2]), pr * 1.35, MH.a, '', A('r', [pr * 1.35, pr * 1.35, pr * 2.5, pr * 1.35, pr * 2.5, pr * 1.35, pr * 1.35], [0, 0.66, 0.71, 0.76, 0.81, 0.86, 1], dur));
        if (!g.plate) {
          var w = pk[3].length * 7.6 + 14, lx = Math.min(Math.max(X(px) - w / 2 + (pk[3] === 'TARBP1' ? 34 : pk[3] === 'PBXIP1' ? -8 : 0), g.x + 2), g.x + g.w - w - 2), ly = Y(pk[2]) - (pk[3] === 'TARBP1' ? -8 : 30);
          labels += '<g>' + Rc(lx, ly, w, 20, '#FFFFFF', ' stroke="' + MH.cand + '" stroke-width="1.3" rx="2"') + T(lx + w / 2, ly + 14, pk[3], 11.5, ' text-anchor="middle" font-style="italic" font-weight="500" fill="' + INK + '"') + show(0.6, 0.65, dur) + '</g>';
        }
      });
      groups.push(s); acc += len;
    });
    groups.forEach(function (s, k) { o += '<g>' + s + show(0.03 + k / 22 * 0.52, 0.07 + k / 22 * 0.52, dur) + '</g>'; });
    o += L(g.x, Y(3), g.x + g.w, Y(3), MH.thr, g.plate ? 0.7 : 1.4) + labels;
    return { svg: o, Y: Y };
  }
  function methPlate() { return svg(100, 100, axes(PLATE) + manhPanel(PLATE, 700, 11).svg); }
  var FOREST = [['INS-IGF2', [37, 8, 74], [37, 4, 80], [35, 5, 72]], ['TARBP1', [-14, -31, 7], [-17, -38, 10], [7, -17, 38]], ['PBXIP1', [16, -8, 46], [18, -6, 49], [4, -16, 29]],
    ['SLC6A4', [-17, -35, 7], [-18, -37, 6], [-4, -24, 21]], ['INS-IGF2', [0, -20, 26], [18, -5, 47], [-4, -28, 27]], ['INS-IGF2', [-1, -20, 22], [-10, -26, 8], [-12, -28, 7]]];
  var AGE_COL = ['#E41A1C', '#377EB8', '#4DAF4A'];
  function methWide() {
    var g = { x: 62, y: 44, w: 560, h: 300 }, dur = 11, m = manhPanel(g, 3000, dur), o = box(g.x, g.y, g.w, g.h) + m.svg, acc = 0, tot = 2976;
    o += T(g.x, g.y - 12, 'prenatal SO&#8322; (3rd trimester) and DNA methylation at age 2', 12, ' fill="' + INK + '"');
    [0, 2, 4, 6, 8].forEach(function (v) { o += T(g.x - 9, m.Y(v) + 4, v, 10.5, ' text-anchor="end"'); });
    CHR.forEach(function (len, c) { if ([0, 1, 2, 4, 6, 8, 10, 13, 17].indexOf(c) >= 0) o += T(g.x + (acc + len / 2) / tot * g.w, g.y + g.h + 17, c + 1, 9.5, ' text-anchor="middle"'); acc += len; });
    o += T(g.x + g.w / 2, g.y + g.h + 38, 'chromosome', 10.5, ' text-anchor="middle"') + T(18, g.y + g.h / 2, '-log10(p)', 11, ' text-anchor="middle" transform="rotate(-90 18 ' + (g.y + g.h / 2) + ')"');
    var q = { x: 706, y: 44, w: 270, h: 300 }, QY = function (v) { return q.y + q.h - (v + 45) / 130 * q.h; };
    o += box(q.x, q.y, q.w, q.h) + T(q.x, q.y - 12, '% change in ADHD rating scale (95% CI)', 12, ' fill="' + INK + '"');
    [-40, 0, 40, 80].forEach(function (v) { o += L(q.x, QY(v), q.x + q.w, QY(v), v ? GRID : '#5F6468', 1) + T(q.x - 8, QY(v) + 4, v, 10.5, ' text-anchor="end"'); });
    FOREST.forEach(function (f, k) {
      var cx = q.x + (k + 0.5) / 6 * q.w;
      [1, 2, 3].forEach(function (a) {
        var x = cx + (a - 2) * 11, t0 = 0.08 + (k * 3 + a) * 0.028;
        o += '<g>' + L(x, QY(f[a][1]), x, QY(f[a][2]), AGE_COL[a - 1], 1.6) + C(x, QY(f[a][0]), 3.6, AGE_COL[a - 1]) + show(t0, t0 + 0.03, dur) + '</g>';
      });
      o += T(cx + 4, q.y + q.h + 14, f[0], 9.5, ' text-anchor="end" font-style="italic" transform="rotate(-38 ' + n(cx + 4) + ' ' + (q.y + q.h + 14) + ')"');
    });
    o += legend([{ dot: MH.a, label: 'CpG (odd chr.)' }, { dot: MH.b, label: 'CpG (even chr.)' }, { dot: MH.cand, label: 'candidate-gene CpG' }, { line: MH.thr, sw: 1.6, label: 'FDR 0.05' },
      { dot: AGE_COL[0], label: 'age 4' }, { dot: AGE_COL[1], label: 'age 6' }, { dot: AGE_COL[2], label: 'age 8' }], 62, 420);
    return svg(1000, 432, o);
  }

  /* ---------- 6. Anomaly detection in SWaT: after Figs. 3-6 (prediction errors, KL divergence) ---------- */
  var AN = { err: '#E0382B', kl: '#F29423', atk: '#2F8CEB', names: ['MV101', 'P101', 'P102', 'FIT101', 'LIT101'] };
  var AN_ATK = [[0.07, 0.008], [0.12, 0.012], [0.2, 0.006], [0.27, 0.01], [0.33, 0.007], [0.47, 0.012], [0.556, 0.088], [0.72, 0.008], [0.8, 0.012], [0.9, 0.006], [0.965, 0.012]];
  function anomaly(g, facets, dur) {
    var r = rng(33), o = '', body = '', top = g.h * 0.6, gap = g.plate ? 1.4 : 5, fh = (top - gap * (facets.length - 1)) / facets.length, sw = g.plate ? 0.55 : 1, id = 'fgC' + (++uid), i;
    var X = function (t) { return g.x + t * g.w; };
    facets.forEach(function (fi, c) {
      var y0 = g.y + c * (fh + gap), base = y0 + fh * 0.9, d = '';
      o += Rc(g.x, y0, g.w, fh, '#EBECED', g.plate ? '' : ' rx="2"');
      if (fi < 2) { var t = r() * 0.01; while (t < 1) { d += 'M' + n(X(t)) + ' ' + n(base) + 'V' + n(base - fh * 0.8 * (0.75 + r() * 0.25)); t += (fi ? 0.0085 : 0.0125) * (0.6 + r() * 0.9) * (g.plate ? 2.2 : 1); } }
      else {
        d = 'M' + n(X(0)) + ' ' + n(base);
        for (i = 1; i <= 120; i++) d += 'L' + n(X(i / 120)) + ' ' + n(base - fh * 0.05 * r());
        d += 'M' + n(X(0.752 + fi * 0.004)) + ' ' + n(base) + 'V' + n(base - fh * 0.82);
        if (fi === 3) d += 'M' + n(X(0.31)) + ' ' + n(base) + 'V' + n(base - fh * 0.22) + 'M' + n(X(0.74)) + ' ' + n(base) + 'V' + n(base - fh * 0.3);
      }
      body += P(d, AN.err, sw);
      if (!g.plate) o += T(g.x + g.w + 8, y0 + fh / 2 + 4, AN.names[fi], 10);
    });
    var ky = g.y + top + g.h * 0.06, kh = g.h * 0.34, zero = ky + kh * 0.74, kd = '';
    AN_ATK.forEach(function (a) { o += Rc(X(a[0]), zero + kh * 0.03, a[1] * g.w, kh * 0.2, AN.atk, '', show(0.85 * a[0], 0.85 * a[0] + 0.02, dur)); });
    for (i = 0; i < (g.plate ? 110 : 330); i++) { var t = r(); kd += 'M' + n(X(t)) + ' ' + n(zero) + 'V' + n(zero - kh * 0.7 * (0.02 + Math.pow(r(), 5) * 0.4)); }
    [[0.556, 0.98], [0.644, 0.8], [0.3, 0.55], [0.905, 0.5], [0.27, 0.34]].forEach(function (s) { kd += 'M' + n(X(s[0])) + ' ' + n(zero) + 'V' + n(zero - kh * 0.72 * s[1]); });
    body += P(kd, AN.kl, sw * 1.1);
    o += L(g.x, zero, g.x + g.w, zero, AX, sw * 0.8) + L(g.x, zero - kh * 0.2, g.x + g.w, zero - kh * 0.2, INK, sw * 0.9);
    if (!g.plate) {
      o += '<g>' + T(X(0.7), ky + 12, 'contextual anomaly detected', 10.5, ' fill="' + AN.err + '"') + L(X(0.7), ky + 17, X(0.56), zero - kh * 0.6, AN.err, 1) + L(X(0.72), ky + 17, X(0.648), zero - kh * 0.5, AN.err, 1) + show(0.58, 0.62, dur) + '</g>';
      o += T(g.x + g.w + 8, zero - kh * 0.3, 'KL div.', 10) + T(g.x + g.w + 8, zero + kh * 0.17, 'attack', 10, ' fill="' + AN.atk + '"');
    }
    if (reduced) return o + body;
    var ww = g.w * 0.05;
    o += '<defs><clipPath id="' + id + '"><rect x="' + n(g.x) + '" y="' + n(g.y - 2) + '" width="0" height="' + n(g.h + 4) + '">' + A('width', [2 * ww, g.w, g.w], [0, 0.85, 1], dur) + '</rect></clipPath></defs>';
    o += '<g clip-path="url(#' + id + ')">' + body + A('opacity', [1, 1, 0], [0, 0.95, 1], dur) + '</g>';
    [['#5F6468', 0], [AN.kl, 1]].forEach(function (w) {
      o += Rc(g.x + w[1] * ww, g.y, ww, top, w[0], ' opacity=".16" stroke="' + w[0] + '" stroke-width="' + sw + '"', A('x', [g.x + w[1] * ww, g.x + g.w - (2 - w[1]) * ww, g.x + g.w - (2 - w[1]) * ww], [0, 0.85, 1], dur) + A('opacity', [0.16, 0.16, 0, 0], [0, 0.85, 0.9, 1], dur));
    });
    return o;
  }
  function anomalyPlate() { return svg(100, 100, anomaly({ x: 4, y: 5, w: 92, h: 90, plate: true }, [0, 2, 4], 10)); }
  function anomalyWide() {
    var g = { x: 56, y: 40, w: 860, h: 330 }, o = box(g.x - 10, g.y - 10, g.w + 84, g.h + 20) + anomaly(g, [0, 1, 2, 3, 4], 13);
    o += T(g.x, g.y - 18, 'prediction error at P1 (raw water supply and storage) and KL divergence between neighbouring windows', 12, ' fill="' + INK + '"');
    o += T(24, g.y + g.h * 0.3, 'prediction error', 11, ' text-anchor="middle" transform="rotate(-90 24 ' + (g.y + g.h * 0.3) + ')"');
    o += legend([{ line: AN.err, sw: 1.5, label: 'RNN-MDN prediction error' }, { line: AN.kl, sw: 1.8, label: 'KL divergence' }, { fill: AN.atk, label: 'real attack' }, { line: INK, sw: 1.4, label: 'baseline threshold' }, { fill: '#5F6468', op: 0.3, label: 'previous window f1' }, { fill: AN.kl, op: 0.3, label: 'current window f2' }], 56, 408);
    return svg(1000, 420, o);
  }

  /* ---------- 7. COVID-19 excess mortality: after Fig. 4 (prediction intervals by method) ---------- */
  var EX = {
    obs: [1330, 1090, 1175, 1090, 1135, 1150, 1082, 1085, 1108, 1098, 1200, 1220, 1330, 1245, 1403, 1200, 1090, 1072],
    rf: [1295, 1150, 1205, 1095, 1130, 1120, 1090, 1103, 1106, 1112, 1165, 1243, 1227, 1183, 1127, 1175, 1117, 1127],
    sar: [1440, 1095, 1240, 1140, 1132, 1087, 1146, 1088, 1115, 1166, 1102, 1340, 1437, 1138, 1210, 1117, 1153, 1133],
    pi: {
      SARIMA: [[1340, 1330, 1015, 1085, 995, 1030, 1010], [1340, 1555, 1260, 1335, 1240, 1278, 1258]],
      OOB: [[1243, 1110, 1070, 1015, 1060, 1003, 1015], [1243, 1340, 1300, 1240, 1288, 1232, 1242]],
      SC: [[1243, 1100, 1160, 1053, 1150, 1020, 1020], [1243, 1345, 1405, 1300, 1392, 1266, 1265]],
      Quantile: [[1243, 1075, 1015, 1030, 1030, 1030, 1030], [1243, 1350, 1600, 1255, 1600, 1210, 1230]]
    }, col: '#2B3FE0'
  };
  function exPanel(g, method, dur) {
    var o = '', sw = g.plate ? 0.9 : 1.5, pred = method === 'SARIMA' ? EX.sar : EX.rf, pi = EX.pi[method];
    var X = function (i) { return g.x + (0.03 + i / 17 * 0.94) * g.w; }, Y = function (v) { return g.y + g.h - (v - 780) / 880 * g.h; };
    o += Rc(X(12), g.y, g.x + g.w - X(12), g.h, '#D9DBDD', ' opacity=".75"');
    if (g.plate) o += axes(g);
    else {
      [800, 1000, 1200, 1400, 1600].forEach(function (v) { o += L(g.x, Y(v), g.x + g.w, Y(v), GRID, 1) + T(g.x - 8, Y(v) + 4, v, 10.5, ' text-anchor="end"'); });
      [[0, '2019-01'], [6, '2019-07'], [12, '2020-01']].forEach(function (t) { o += T(X(t[0]), g.y + g.h + 17, t[1], 10.5, ' text-anchor="middle"'); });
    }
    var up = pi[1].map(function (v, k) { return [X(11 + k), Y(v)]; }), dn = pi[0].map(function (v, k) { return [X(11 + k), Y(v)]; }).reverse();
    o += F(poly(up.concat(dn)) + 'Z', EX.col, ' opacity=".28"', show(0.6, 0.7, dur, 0.28));
    o += DP(poly(pred.map(function (v, i) { return [X(i), Y(v)]; })), EX.col, sw * 1.7, 0.3, 0.62, dur);
    o += DP(poly(EX.obs.map(function (v, i) { return [X(i), Y(v)]; })), INK, sw, 0.04, 0.5, dur);
    o += C(X(14), Y(1403), g.plate ? 2 : 4.5, 'none', ' stroke="#E0382B" stroke-width="' + sw + '"', show(0.74, 0.78, dur) + (reduced ? '' : '<animate attributeName="r" values="' + (g.plate ? '2;3.4;2' : '4.5;8;4.5') + '" dur="1.6s" repeatCount="indefinite"/>'));
    return o;
  }
  function excessWide() {
    var o = '', xs = [62, 548], ys = [44, 322], pw = 410, ph = 200;
    ['SARIMA', 'OOB', 'SC', 'Quantile'].forEach(function (m, k) {
      var g = { x: xs[k % 2], y: ys[k >> 1], w: pw, h: ph };
      o += box(g.x, g.y, g.w, g.h) + T(g.x, g.y - 12, m + (k ? ' &#183; random forest interval' : ' &#183; time-series baseline'), 12, ' fill="' + INK + '"') + exPanel(g, m, 10);
    });
    o += T(18, 290, 'monthly deaths', 11, ' text-anchor="middle" transform="rotate(-90 18 290)"');
    o += legend([{ line: INK, sw: 1.5, label: 'observed' }, { line: EX.col, sw: 3, label: 'predicted' }, { fill: EX.col, op: 0.3, label: '95% prediction interval' }, { fill: '#D9DBDD', label: '2020 (pandemic period)' }, { dot: '#E0382B', label: 'observed above the interval' }], 62, 580);
    return svg(1000, 592, o);
  }

  /* ---------- 8. Demand and supply of physicians: after the 2020 projection report ---------- */
  var MED = { adm: [3365, 3700, 4000, 4500, 5000, 5500], col: ['#F8766D', '#B79F00', '#00BA38', '#00BFC4', '#619CFF', '#F564E3'] };
  function medPanel(g, kind, dur) {
    var o = '', sw = g.plate ? 1 : 1.7, lo = kind ? -44 : 38, hi = kind ? 44 : 70, y;
    var X = function (t) { return g.x + (t - 2017) / 50 * g.w; }, Y = function (v) { return g.y + g.h - (v - lo) / (hi - lo) * g.h; };
    if (g.plate) o += axes(g);
    else {
      (kind ? [-40, -20, 0, 20, 40] : [40, 50, 60, 70]).forEach(function (v) { o += L(g.x, Y(v), g.x + g.w, Y(v), GRID, 1) + T(g.x - 8, Y(v) + 4, v, 10.5, ' text-anchor="end"'); });
      [2020, 2030, 2040, 2050, 2060].forEach(function (t) { o += L(X(t), g.y, X(t), g.y + g.h, GRID, 1) + T(X(t), g.y + g.h + 17, t, 10.5, ' text-anchor="middle"'); });
    }
    if (kind) o += L(g.x, Y(0), g.x + g.w, Y(0), '#3A3E41', sw * 0.8);
    var common = [];
    for (y = 2017; y <= 2026; y++) common.push([X(y), Y(kind ? 1.5 - (y - 2017) * 0.67 : 50 + (y - 2017) * 0.355)]);
    MED.adm.forEach(function (a, k) {
      var w = (a - 3365) / 2135, pts = [], u;
      for (u = 0; u <= 41; u++) pts.push([X(2026 + u), Y(kind ? -4.5 - 2.64 * u + 0.0528 * u * u + w * 3.14 * Math.pow(u, 0.8) : 53.2 + (0.1157 + 0.9883 * w) * u - (0.010377 + 0.011703 * w) * u * u)]);
      o += DP(poly(pts), MED.col[k], sw, 0.28, 0.8, dur);
    });
    o += DP(poly(common), INK, sw * 1.1, 0.04, 0.28, dur);
    return o;
  }
  function medWide() {
    var o = '', gs2 = [{ x: 62, y: 44, w: 410, h: 270 }, { x: 562, y: 44, w: 410, h: 270 }];
    gs2.forEach(function (g, k) { o += box(g.x, g.y, g.w, g.h) + T(g.x, g.y - 12, k ? 'supply minus demand (thousand physicians)' : 'physician labour supply (index)', 12, ' fill="' + INK + '"') + medPanel(g, k, 10); });
    o += T(62, 366, 'annual medical-school admissions', 11) + legend(MED.adm.map(function (a, k) { return { line: MED.col[k], sw: 2.4, label: String(a) }; }), 300, 366);
    return svg(1000, 380, o);
  }

  /* ---------- 9. Disease network: after Fig. 8 (TAN constellation, female over 60) ---------- */
  var DN = [['Liver', '#7BC96F', 0.2, 0.27], ['Respiratory', '#64B5F6', 0.6, 0.25], ['Mental illness', '#B39DDB', 0.87, 0.52], ['Choroid and retina', '#E57373', 0.66, 0.77], ['Nervous system', '#E8D84A', 0.17, 0.75], ['Uterine', '#AEB3B7', 0.42, 0.52]];
  function disease(g, dur) {
    var r = rng(77), o = '', mid = 'fgD' + (++uid), sw = g.plate ? 0.6 : 1.1, pr = g.plate ? 1.3 : 3.2, centers = [];
    var X = function (v) { return g.x + v * g.w; }, Y = function (v) { return g.y + v * g.h; };
    o += '<defs><marker id="' + mid + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="' + (g.plate ? 3.2 : 4.4) + '" markerHeight="' + (g.plate ? 3.2 : 4.4) + '" orient="auto"><path d="M0 0L10 5L0 10z" fill="#2C3E73"/></marker></defs>';
    function arrow(a, b, t0, dash) {
      var dx = X(b[0]) - X(a[0]), dy = Y(b[1]) - Y(a[1]), d = Math.hypot(dx, dy), c = (pr + 1) / d;
      return L(X(a[0]) + dx * c, Y(a[1]) + dy * c, X(b[0]) - dx * c, Y(b[1]) - dy * c, '#2C3E73', sw, ' marker-end="url(#' + mid + ')"' + (dash ? ' stroke-dasharray="' + (g.plate ? '1.4 1.4' : '4 3') + '" opacity=".75"' : ''), show(t0, t0 + 0.04, dur, dash ? 0.75 : 1));
    }
    DN.forEach(function (cl, k) {
      var t0 = 0.04 + k * 0.105, c = [cl[2], cl[3]], nb = 3 + Math.floor(r() * 3), a0 = r() * 6.28, i, nodes = '', edges = '';
      centers.push(c);
      o += '<ellipse cx="' + n(X(c[0])) + '" cy="' + n(Y(c[1])) + '" rx="' + n(g.w * (g.plate ? 0.15 : 0.1)) + '" ry="' + n(g.h * (g.plate ? 0.17 : 0.2)) + '" fill="' + cl[1] + '" opacity=".3">' + show(t0, t0 + 0.05, dur, 0.3) + '</ellipse>';
      for (i = 0; i < nb; i++) {
        var an = a0 + i / nb * 6.28 + (r() - 0.5) * 0.5, rad = 0.07 + r() * 0.045, kx = g.plate ? 0.95 : 0.62, b = [c[0] + Math.cos(an) * rad * kx, c[1] + Math.sin(an) * rad * 1.25];
        edges += arrow(c, b, t0 + 0.03 + i * 0.008);
        nodes += C(X(b[0]), Y(b[1]), pr, '#2C3E73', '', show(t0 + 0.03 + i * 0.008, t0 + 0.07 + i * 0.008, dur));
        if (r() < 0.45) { var b2 = [b[0] + Math.cos(an + 0.5) * 0.05 * kx, b[1] + Math.sin(an + 0.5) * 0.065]; edges += arrow(b, b2, t0 + 0.06); nodes += C(X(b2[0]), Y(b2[1]), pr * 0.85, '#2C3E73', '', show(t0 + 0.06, t0 + 0.1, dur)); }
      }
      o += edges + nodes + C(X(c[0]), Y(c[1]), pr * 1.5, '#2C3E73', ' stroke="#fff" stroke-width="' + sw + '"', show(t0, t0 + 0.04, dur) + (reduced ? '' : '<animate attributeName="r" values="' + n(pr * 1.5) + ';' + n(pr * 2.1) + ';' + n(pr * 1.5) + '" dur="3s" begin="' + n(k * 0.5) + 's" repeatCount="indefinite"/>'));
      if (!g.plate) o += '<g>' + T(X(c[0]), Y(c[1]) - g.h * 0.2 - 6, cl[0], 11, ' text-anchor="middle" fill="' + INK + '"') + show(t0, t0 + 0.05, dur) + '</g>';
    });
    [[5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [0, 1], [3, 2]].forEach(function (e, k) { o += arrow(centers[e[0]], centers[e[1]], 0.7 + k * 0.02, true); });
    return o;
  }

  /* ---------- 10. Microbiome analysis tutorial ---------- */
  var MB_COL = ['#33658A', '#86BBD8', '#5C946E', '#F6AE2D', '#C8553D', '#86608E'];
  var MB_TAX = ['Bacteroidetes', 'Firmicutes', 'Proteobacteria', 'Actinobacteria', 'Verrucomicrobia', 'other'];
  function microbiome(g, per, dur) {
    var r = rng(61), o = '', tot = per * 2, gapG = g.w * 0.06, bw = (g.w - gapG) / tot, treeH = g.h * 0.2, barH = g.h - treeH - g.h * 0.03, s, k;
    var sw = g.plate ? 0.7 : 1.2;
    var bx = function (i) { return g.x + i * bw + (i >= per ? gapG : 0); };
    for (s = 0; s < tot; s++) {
      var grp = s >= per ? 1 : 0, w = [grp ? 2.2 : 5, grp ? 4.6 : 2.4, grp ? 1.6 : 0.8, 0.9, grp ? 0.3 : 0.9, 0.6].map(function (a) { return a * (0.55 + r() * 0.9); });
      var sum = w.reduce(function (a, b) { return a + b; }, 0), y = g.y + g.h, seg = '';
      for (k = 0; k < 6; k++) { var hh = w[k] / sum * barH; y -= hh; seg += Rc(bx(s) + bw * 0.1, y, bw * 0.8, hh, MB_COL[k]); }
      o += '<g>' + seg + show(0.04 + s / tot * 0.5, 0.08 + s / tot * 0.5, dur) + '</g>';
    }
    function tree(a, b, base) {
      if (b - a === 1) return { x: bx(a) + bw / 2, y: base };
      var m = a + Math.ceil((b - a) / 2 - (r() < 0.5 ? 0 : 0.5)); m = Math.max(a + 1, Math.min(b - 1, m));
      var l = tree(a, m, base), q = tree(m, b, base), top = Math.min(l.y, q.y) - treeH / (Math.log2(per) + 1.2) * (0.7 + r() * 0.5);
      d += 'M' + n(l.x) + ' ' + n(l.y) + 'V' + n(top) + 'H' + n(q.x) + 'V' + n(q.y);
      return { x: (l.x + q.x) / 2, y: top };
    }
    var d = ''; tree(0, per, g.y + treeH); var d1 = d; d = ''; tree(per, tot, g.y + treeH);
    o += DP(d1, '#5F6468', sw, 0.58, 0.74, dur) + DP(d, '#5F6468', sw, 0.66, 0.82, dur);
    return o;
  }

  function single(draw, legendItems, xlab, ylab) {
    var g = { x: 70, y: 30, w: 900, h: 290 }, o = box(g.x - 8, g.y - 8, g.w + 16, g.h + 16) + draw(g);
    if (xlab) o += T(g.x + g.w / 2, g.y + g.h + 40, xlab, 10.5, ' text-anchor="middle"');
    if (ylab) o += T(24, g.y + g.h / 2, ylab, 11, ' text-anchor="middle" transform="rotate(-90 24 ' + (g.y + g.h / 2) + ')"');
    if (legendItems) o += legend(legendItems, 70, 388);
    return svg(1000, 400, o);
  }

  var REG = {
    'ljm': { plate: function () { return svg(100, 100, ljmPanel(PLATE, LJM_SUB[1], 10)); }, wide: ljmWide,
      cap: 'Individual conditional-risk curves at landmark s = 5 for four subjects: pre-landmark biomarker observations, the local linear fit around s, the predicted risk, and the observed event time.' },
    'three-way': { plate: twPlate, wide: twWide,
      cap: 'Cognitive social structure over six waves: the network among all actors as perceived by one actor i. Rows are two different perceivers of the same group.' },
    'nalfpca': { plate: nalfpcaPlate, wide: nalfpcaWide,
      cap: 'Localized eigenfunctions on a functional-connectivity network. Top: true supports. Bottom: estimates at n = 100, where small spurious loadings appear outside the support.' },
    'pkqr': { plate: pkqrPlate, wide: pkqrWide,
      cap: 'Varying-coefficient quantile regression. In one step the penalty flattens coefficient functions that are truly constant and removes those that are zero, recovering the partially linear structure.' },
    'methylation-adhd': { plate: methPlate, wide: methWide,
      cap: 'After Fig. 2 of the paper. Left: Manhattan plot for third-trimester SO2 exposure and methylation at age 2; green points are candidate-gene CpGs and the line is the FDR 0.05 threshold. Right: change in ADHD rating scale per CpG at ages 4, 6 and 8.' },
    'anomaly': { plate: anomalyPlate, wide: anomalyWide,
      cap: 'After Figs. 3-6 of the paper. Prediction errors of five SWaT sensors, and the KL divergence between error distributions in neighbouring windows: it spikes at the start and end of the long contextual attack that the fixed threshold misses.' },
    'excess-mortality': { plate: function () { return svg(100, 100, exPanel(PLATE, 'SC', 10)); }, wide: excessWide,
      cap: 'After Fig. 4 of the manuscript. Observed monthly deaths against predictions for 2020 from SARIMA and from three random-forest prediction intervals (out-of-bag, split conformal, quantile).' },
    'medical-services': { plate: function () { return svg(100, 100, medPanel(PLATE, 1, 10)); }, wide: medWide,
      cap: 'After the 2020 projection report. Physician supply and the supply-demand gap to 2067 under six medical-school admission scenarios.' },
    'disease-network': { plate: function () { return svg(100, 100, disease({ x: 1, y: 1, w: 98, h: 98, plate: true }, 11)); },
      wide: function () { return single(function (g) { return disease(g, 11); }, [{ dot: '#2C3E73', label: 'disease' }, { line: '#2C3E73', sw: 1.4, label: 'TAN link (centre -> branch)' }, { line: '#2C3E73', dash: '4 3', sw: 1.4, label: 'link between clusters' }]); },
      cap: 'After Fig. 8 of the paper: tree-augmented naive Bayes constellation for women over 60, with disease clusters shaded by organ system.' },
    'microbiome': { plate: function () { return svg(100, 100, microbiome(PLATE, 7, 10)); },
      wide: function () { return single(function (g) { return microbiome(g, 16, 10); }, MB_TAX.map(function (t, k) { return { fill: MB_COL[k], label: t }; })); },
      cap: 'Relative abundance by sample for two groups, with hierarchical clustering of the samples within each group.' }
  };

  window.FIGS = {
    has: function (slug) { return !!REG[slug]; },
    plate: function (slug) { return REG[slug] ? REG[slug].plate() : ''; },
    wide: function (slug) { return REG[slug] ? REG[slug].wide() : ''; },
    caption: function (slug) { return REG[slug] ? REG[slug].cap + ' Redrawn schematically; not the original data.' : ''; }
  };
})();
