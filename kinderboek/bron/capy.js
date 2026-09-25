// Cappy the capybara — original line art in a few poses (inline SVG).
const S0 = 'fill="#fff" stroke="#1d2b33" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"';
const S = S0;
const L = 'fill="none" stroke="#1d2b33" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"';
const T = 'fill="none" stroke="#1d2b33" stroke-width="2" stroke-linecap="round"';
const D = 'fill="none" stroke="#1d2b33" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 8"';
function flower(x, y, s = 1) {
  const p = [0, 72, 144, 216, 288].map(a => `<circle cx="${(8 * Math.cos(a * Math.PI / 180)).toFixed(1)}" cy="${(8 * Math.sin(a * Math.PI / 180)).toFixed(1)}" r="5.5" fill="#fff" stroke="#1d2b33" stroke-width="2"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})">${p}<circle r="3.6" fill="#fff" stroke="#1d2b33" stroke-width="2"/></g>`;
}
// Face on a head whose snout tip is around x=196. dx/dy shift, sleepy closes eye.
function face(dx, dy, { sleepy = false, flower: fl = false, bird = false } = {}) {
  return `<g transform="translate(${dx},${dy})">
  <path ${L} d="M148,48 C136,66 138,104 156,120"/>
  <ellipse cx="172" cy="64" rx="3.2" ry="4.6" fill="#1d2b33"/><ellipse cx="186" cy="68" rx="3" ry="4.2" fill="#1d2b33"/>
  <path ${L} d="M178,98 C178,106 174,110 169,109 M178,98 C179,106 184,109 189,106"/>
  ${sleepy ? `<path ${L} d="M114,70 Q122,77 130,70"/>` : `<path ${L} d="M113,71 Q122,59 131,71"/>`}
  <circle cx="112" cy="88" r="7.5" ${T}/>
  <path ${T} d="M198,78 L210,73 M199,85 L212,86 M197,92 L208,97"/>
  <path ${S} d="M80,60 C72,42 94,34 100,50"/>
  ${fl ? flower(88, 48) : ''}
  ${bird ? `<g transform="translate(96,14)"><path ${S} d="M0,20 C0,8 10,2 20,4 C26,0 34,2 34,8 L42,10 L34,13 C32,22 22,26 12,24 Z"/><circle cx="28" cy="8" r="1.8" fill="#1d2b33"/><path ${T} d="M8,14 C14,12 18,16 20,20 M14,24 L12,32 M22,24 L22,32"/></g>` : ''}
  </g>`;
}
const HEAD = 'C100,40 130,38 150,46 C176,44 196,60 196,84 C196,106 180,122 158,120';
exports.sit = (o = {}) => `<svg viewBox="0 0 222 204" xmlns="http://www.w3.org/2000/svg">
  <path ${S} d="M60,196 C30,196 22,170 26,140 C30,105 50,70 80,52 ${HEAD} C146,122 138,132 140,144 C146,164 150,182 146,196 Z"/>
  <path ${L} d="M28,172 C40,148 72,146 86,174 C90,182 90,190 86,196"/>
  <path ${L} d="M114,146 C110,166 110,182 112,190 M132,142 C134,164 134,180 132,190"/>
  <path ${S} d="M102,196 C100,182 122,180 124,196 Z M124,196 C124,182 146,180 148,196 Z"/>
  <path ${T} d="M110,196 L110,190 M116,196 L116,190 M132,196 L132,190 M139,196 L139,190"/>
  <path ${D} d="M62,86 C52,104 46,122 46,140 M76,100 C70,116 68,130 70,142"/>
  <path ${T} d="M102,40 L108,46 M116,38 L120,44"/>
  ${face(0, 0, o)}</svg>`;
exports.swim = (o = {}) => `<svg viewBox="0 0 222 170" xmlns="http://www.w3.org/2000/svg">
  <path ${S} d="M38,132 C42,100 54,70 80,52 ${HEAD} C146,122 142,126 142,132 Z"/>
  <path ${L} d="M6,132 C40,126 64,138 100,132 C136,126 170,138 214,130"/>
  <path ${T} d="M22,148 L64,148 M86,154 L136,154 M156,146 L200,146 M44,164 L92,164"/>
  <path ${D} d="M62,86 C54,100 50,114 48,126"/>
  ${o.lily ? `<path ${S} d="M150,160 C150,150 170,146 186,150 L178,158 L196,160 C190,168 160,168 150,160 Z"/>` : ''}
  ${face(0, 0, o)}</svg>`;
exports.sleep = (o = {}) => `<svg viewBox="0 0 250 150" xmlns="http://www.w3.org/2000/svg">
  <path ${S} d="M40,140 C14,140 8,116 16,96 C28,68 60,56 96,58 C104,58 108,60 110,62 C122,52 140,50 150,56 C176,54 196,70 196,92 C196,114 180,130 158,128 C154,132 152,136 150,140 Z" transform="translate(30,0)"/>
  <g transform="translate(30,0)">
  <path ${L} d="M24,134 C34,112 62,110 74,136"/>
  <path ${S} d="M120,140 C120,128 140,126 142,140 Z M140,140 C140,128 160,126 162,140 Z"/>
  <path ${D} d="M40,84 C58,74 78,72 96,76 M30,108 C48,98 66,96 84,100"/>
  ${face(0, 8, { ...o, sleepy: true })}</g>
  <text x="222" y="40" font-family="Fredoka" font-weight="600" font-size="22" fill="#1d2b33">z</text><text x="236" y="24" font-family="Fredoka" font-weight="600" font-size="15" fill="#1d2b33">z</text></svg>`;
exports.flower = flower;
// Overlay labels/markers in the pose's own coordinates: [[x,y,text,{r,fill}]]
function overlay(svg, labels = []) {
  const extra = labels.map(([x, y, t, o = {}]) => o.r
    ? `<circle cx="${x}" cy="${y}" r="${o.r}" fill="${o.fill || '#fff'}" stroke="#1d2b33" stroke-width="1.6"/><text x="${x}" y="${y + o.r * 0.38}" text-anchor="middle" font-family="Fredoka" font-weight="600" font-size="${o.r * 1.1}" fill="#1d2b33">${t}</text>`
    : `<text x="${x}" y="${y}" text-anchor="middle" font-family="Andika" font-size="${o.size || 14}" fill="#1d2b33">${t}</text>`).join('');
  return svg.replace('</svg>', extra + '</svg>');
}
// Coloured version for the cover: recolour white fills.
function colour(svg, body = '#b98252', snout = '#8f5f3c') {
  return svg.replace(/fill="#fff" stroke="#1d2b33" stroke-width="3.4"/g, `fill="${body}" stroke="#3b2616" stroke-width="3.4"`)
    .replace(/stroke="#1d2b33"/g, 'stroke="#3b2616"')
    .replace('<path fill="none" stroke="#3b2616" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" d="M148,48 C136,66 138,104 156,120"/>',
      `<path fill="${snout}" stroke="#3b2616" stroke-width="3.4" stroke-linejoin="round" d="M148,48 C136,66 138,104 156,120 C180,122 196,106 196,84 C196,60 176,44 150,46 Z"/>`)
    .replace(/<circle cx="112" cy="88" r="7.5" fill="none"/g, '<circle cx="112" cy="88" r="7.5" fill="#f4a7a0"');
}
exports.overlay = overlay; exports.colour = colour;
