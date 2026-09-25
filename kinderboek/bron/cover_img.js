// Full-wrap KDP cover: back + spine + front with 0.125in bleed. Premium colour, 26 pages.
const { chromium } = require(process.env.PW || 'playwright-core');
const fs = require('fs'), path = require('path');
const PAGES = 26, SPINE = +(PAGES * 0.002347).toFixed(4); // premium colour paper
const W = 0.125 + 8.5 + SPINE + 8.5 + 0.125, H = 11.25;
const F = f => 'file://' + path.join(__dirname, 'fonts', f);
const thumb = n => 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'png', `p${n}.png`)).toString('base64');

const scene = `<img src="art/12.png" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">`;

const tags = [['Coloring', '#e65a6e'], ['Math', '#f0a030'], ['Reading', '#3f95d8'], ['Science', '#3fa05a'], ['Puzzles', '#8a5ad8'], ['Writing', '#ef7a3c']];
const front = `<div class="front">${scene}
  <div class="sign"><div class="t1">Cappy's Big</div><div class="t2">${'Activity Book'.split('').map((ch, i) => `<span style="color:${['#e65a6e', '#f0a030', '#f2c230', '#3f95d8', '#8a5ad8', '#3fa05a', '#e65a6e', '#f0a030', '#3f95d8', '#8a5ad8', '#3fa05a', '#ef7a3c', '#e65a6e'][i]}">${ch === ' ' ? '&nbsp;' : ch}</span>`).join('')}</div>
    <div class="t3">Capybara Fun for Grade 2</div></div>
  <div class="tags">${tags.map(([t, k]) => `<span style="background:${k}">${t}</span>`).join('')}</div>
  <div class="badge"><svg viewBox="0 0 100 100"><path fill="#f5c542" d="${Array.from({ length: 24 }, (_, i) => { const r = i % 2 ? 42 : 50, a = i * Math.PI / 12; return `${i ? 'L' : 'M'}${50 + r * Math.sin(a)},${50 - r * Math.cos(a)}`; }).join('')}Z"/><circle cx="50" cy="50" r="36" fill="#fff6c9"/></svg><div>Ages<br>7–8</div></div>
  <div class="pgs">21 fun activities + answer key</div>
</div>`;

const back = `<div class="back">
  <h2>Learning is more fun with a capybara friend!</h2>
  <p>Join Cappy the capybara on a big adventure by the river. This activity book is made for <b>2nd graders (ages 7–8)</b> and mixes coloring with real practice in reading, math, and science.</p>
  <ul><li>Reading passages with comprehension questions</li><li>Two-digit addition and subtraction, place value, and story problems</li>
  <li>Telling time, counting coins, and skip counting</li><li>Word search, maze, rhymes, and word scramble</li><li>Capybara science facts and coloring pages</li><li>Answer key for parents and teachers</li></ul>
  <div class="thumbs"><img src="${thumb('04')}"><img src="${thumb('07')}"><img src="${thumb('14')}"></div>
  <div class="capback"><img src="art/13.png" style="width:100%;mix-blend-mode:multiply"></div>
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
.tags{position:absolute;left:.55in;top:3.9in;display:flex;flex-direction:column;gap:.12in}
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
.capback{position:absolute;left:.7in;bottom:.6in;width:3.3in}
</style></head><body>${back}<div class="spine"></div>${front}</body></html>`;
fs.writeFileSync(path.join(__dirname, 'cover.html'), html);
(async () => {
  const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
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
