// Full-wrap KDP cover: back + spine + front with 0.125in bleed. Premium colour, 26 pages.
const { chromium } = require('playwright-core');
const fs = require('fs'), path = require('path');
const c = require('./capy');
const PAGES = 26, SPINE = +(PAGES * 0.002347).toFixed(4); // premium colour paper
const W = 0.125 + 8.5 + SPINE + 8.5 + 0.125, H = 11.25;
const F = f => 'file://' + path.join(__dirname, 'fonts', f);
const inner = s => s.replace(/^<svg[^>]*>/, '').replace('</svg>', '');
const col = s => c.colour(s).replace(/(<path )fill="#b98252"([^>]*d="M0,20 C0,8)/, '$1fill="#f5c542"$2');
const thumb = n => 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'png', `p${n}.png`)).toString('base64');

const scene = `<svg viewBox="0 0 850 1125" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%">
 <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ec8f2"/><stop offset=".6" stop-color="#c9ebfb"/></linearGradient>
 <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ccf6a"/><stop offset="1" stop-color="#4e9d3f"/></linearGradient>
 <linearGradient id="wa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fc3e6"/><stop offset="1" stop-color="#3f9ccc"/></linearGradient></defs>
 <rect width="850" height="1125" fill="url(#sky)"/>
 <g fill="#fff" opacity=".95"><path d="M620,170 c0-30 40-40 58-18 c14-30 66-26 70,8 c30-2 36,40 6,44 h-116 c-26,0-30-26-18-34z"/><path d="M60,560 c0-24 32-32 46-14 c12-24 52-20 56,6 c24-2 28,32 4,34 h-90 c-20,0-24-20-16-26z"/></g>
 <path d="M0,640 C120,560 240,600 330,620 C440,560 600,560 850,620 L850,1125 L0,1125Z" fill="#a8d98a"/>
 <g fill="#5fae4f"><circle cx="40" cy="610" r="70"/><circle cx="130" cy="590" r="60"/><circle cx="760" cy="600" r="70"/><circle cx="840" cy="620" r="60"/></g>
 <path d="M0,700 C200,680 500,690 850,700 L850,1125 L0,1125Z" fill="url(#gr)"/>
 <ellipse cx="640" cy="760" rx="260" ry="46" fill="url(#wa)"/>
 <g fill="#9fd66f" stroke="#3f8a35" stroke-width="2"><ellipse cx="560" cy="770" rx="30" ry="9"/><ellipse cx="700" cy="752" rx="26" ry="8"/></g>
 <g>${[[40, 1040], [120, 990], [760, 1030], [820, 960], [60, 900], [800, 880], [380, 1080], [520, 1090]].map(([x, y]) => `<g transform="translate(${x},${y})">${[0, 72, 144, 216, 288].map(a => `<ellipse cx="${12 * Math.cos(a * Math.PI / 180)}" cy="${12 * Math.sin(a * Math.PI / 180)}" rx="10" ry="7" transform="rotate(${a} ${12 * Math.cos(a * Math.PI / 180)} ${12 * Math.sin(a * Math.PI / 180)})" fill="#fff"/>`).join('')}<circle r="6" fill="#f5c542"/></g>`).join('')}</g>
</svg>`;

const tags = [['Coloring', '#e65a6e'], ['Math', '#f0a030'], ['Reading', '#3f95d8'], ['Science', '#3fa05a'], ['Puzzles', '#8a5ad8'], ['Writing', '#ef7a3c']];
const front = `<div class="front">${scene}
  <div class="sign"><div class="t1">Cappy's Big</div><div class="t2">${'Activity Book'.split('').map((ch, i) => `<span style="color:${['#e65a6e', '#f0a030', '#f2c230', '#3f95d8', '#8a5ad8', '#3fa05a', '#e65a6e', '#f0a030', '#3f95d8', '#8a5ad8', '#3fa05a', '#ef7a3c', '#e65a6e'][i]}">${ch === ' ' ? '&nbsp;' : ch}</span>`).join('')}</div>
    <div class="t3">Capybara Fun for Grade 2</div></div>
  <div class="tags">${tags.map(([t, k]) => `<span style="background:${k}">${t}</span>`).join('')}</div>
  <div class="badge"><svg viewBox="0 0 100 100"><path fill="#f5c542" d="${Array.from({ length: 24 }, (_, i) => { const r = i % 2 ? 42 : 50, a = i * Math.PI / 12; return `${i ? 'L' : 'M'}${50 + r * Math.sin(a)},${50 - r * Math.cos(a)}`; }).join('')}Z"/><circle cx="50" cy="50" r="36" fill="#fff6c9"/></svg><div>Ages<br>7–8</div></div>
  <div class="capbig">${col(c.sit({ bird: true }))}</div>
  <div class="capsm">${col(c.sleep({ flower: true })).replace(/<text[^>]*>z<\/text>/g, "")}</div>
  <div class="pgs">21 fun activities + answer key</div>
</div>`;

const back = `<div class="back">
  <h2>Learning is more fun with a capybara friend!</h2>
  <p>Join Cappy the capybara on a big adventure by the river. This activity book is made for <b>2nd graders (ages 7–8)</b> and mixes coloring with real practice in reading, math, and science.</p>
  <ul><li>Reading passages with comprehension questions</li><li>Two-digit addition and subtraction, place value, and story problems</li>
  <li>Telling time, counting coins, and skip counting</li><li>Word search, maze, rhymes, and word scramble</li><li>Capybara science facts and coloring pages</li><li>Answer key for parents and teachers</li></ul>
  <div class="thumbs"><img src="${thumb('04')}"><img src="${thumb('07')}"><img src="${thumb('14')}"></div>
  <div class="capback">${col(c.swim({ flower: true, lily: true }))}</div>
</div>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Andika;font-weight:400;src:url(${F('f1.ttf')})}@font-face{font-family:Andika;font-weight:700;src:url(${F('f2.ttf')})}
@font-face{font-family:Fredoka;font-weight:600;src:url(${F('f4.ttf')})}@font-face{font-family:Fredoka;font-weight:700;src:url(${F('f5.ttf')})}
@page{size:${W}in ${H}in;margin:0}*{box-sizing:border-box}
body{margin:0;width:${W}in;height:${H}in;display:flex;-webkit-print-color-adjust:exact;print-color-adjust:exact;font-family:Andika;color:#1d2b33}
.back{width:${0.125 + 8.5}in;height:100%;background:linear-gradient(#e9f6f3,#cfeee6);padding:.75in .75in .75in .875in;position:relative}
.spine{width:${SPINE}in;height:100%;background:#3fa05a}
.front{width:${8.5 + 0.125}in;height:100%;position:relative;overflow:hidden}
.sign{position:absolute;left:.7in;right:.8in;top:.6in;background:linear-gradient(#d9a066,#b97a45);border:5px solid #7a4a25;border-radius:.35in;padding:.18in .2in .22in;text-align:center;box-shadow:0 .06in 0 #6a3f1f}
.t1{font:700 34pt Fredoka;color:#fff;text-shadow:0 3px 0 #6a3f1f}
.t2{font:700 64pt/1 Fredoka;-webkit-text-stroke:3px #fff;paint-order:stroke fill;text-shadow:0 5px 0 #6a3f1f}
.t3{display:inline-block;margin-top:.12in;background:#f7e2c4;border-radius:.2in;padding:.05in .3in;font:700 24pt Fredoka;color:#3b2616}
.tags{position:absolute;left:.55in;top:4.05in;display:flex;flex-direction:column;gap:.12in}
.tags span{font:700 20pt Fredoka;color:#fff;padding:.06in .3in;border-radius:.2in;transform:rotate(-2deg);box-shadow:0 3px 0 rgba(0,0,0,.2);width:2.2in}
.badge{position:absolute;right:.55in;top:3.9in;width:1.9in;height:1.9in}.badge svg{position:absolute;inset:0}
.badge div{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;font:700 25pt/1 Fredoka;color:#1f3f8a}
.capbig{position:absolute;left:2.6in;top:4.6in;width:5.7in}
.capsm{position:absolute;left:.3in;top:8.2in;width:3.6in}
.pgs{position:absolute;right:.55in;bottom:.6in;font:700 16pt Fredoka;color:#fff;background:rgba(31,63,40,.75);padding:.06in .22in;border-radius:.2in}
.back h2{font:700 26pt/1.15 Fredoka;margin:0 0 .2in;color:#2f7d74}
.back p{font-size:15pt;line-height:1.45;margin:0 0 .12in}
.back ul{font-size:14pt;line-height:1.5;margin:.1in 0 .25in;padding-left:.3in}
.thumbs{display:flex;gap:.18in}.thumbs img{width:2.1in;border:3px solid #fff;border-radius:.08in;box-shadow:0 2px 8px rgba(0,0,0,.2);transform:rotate(-2deg)}
.thumbs img:nth-child(2){transform:rotate(1.5deg)}
.capback{position:absolute;left:.8in;bottom:.7in;width:2.8in}
</style></head><body>${back}<div class="spine"></div>${front}</body></html>`;
fs.writeFileSync(path.join(__dirname, 'cover.html'), html);
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'cover.html'));
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: path.join(__dirname, 'Cappy_Cover_Premium_26p.pdf'), width: W + 'in', height: H + 'in', printBackground: true });
  await p.setViewportSize({ width: Math.round(W * 96), height: Math.round(H * 96) });
  await p.screenshot({ path: path.join(__dirname, 'cover.png') });
  await b.close();
  console.log('cover', W.toFixed(3), 'x', H, 'in, spine', SPINE);
})();
// Chrome rounds the page width; pin the MediaBox to the exact KDP size.
process.on('beforeExit', async function fix() {
  process.removeListener('beforeExit', fix);
  const { PDFDocument } = require('pdf-lib');
  const f = path.join(__dirname, 'Cappy_Cover_Premium_26p.pdf');
  const d = await PDFDocument.load(fs.readFileSync(f));
  const pg = d.getPages()[0];
  pg.setMediaBox(0, pg.getHeight() - H * 72, W * 72, H * 72);
  fs.writeFileSync(f, await d.save());
  console.log('mediabox', (W).toFixed(3), 'x', H);
});
