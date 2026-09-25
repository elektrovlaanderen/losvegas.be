// Builds the KDP interior PDF: 8.5 x 11 in, no bleed, premium colour.
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const A = n => `<img class="art" src="art/${n}.png">`;

const CHROME = process.env.CHROME || undefined;
const PUBLISHER = process.env.PUBLISHER || 'Debacker LLC';
const YEAR = 2026;
const DOTS = ['#f2b8bf', '#f6dd8f', '#b9dfc2', '#b9d4ef', '#d7c4ef', '#f7c9a4'];
const TEAL = '#5f9f99';

// ---------- deterministic helpers ----------
let seed = 7;
const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const pages = [];
const answers = [];
let act = 0;

function activity(title, instr, body, answer) {
  act++;
  const dot = DOTS[(act - 1) % DOTS.length];
  pages.push(`<div class="hd"><span class="num" style="background:${dot}">${act}</span><h1>${title}</h1></div>
    <p class="instr">${instr}</p><div class="rule"></div>${body}`);
  if (answer) answers.push(`<div class="ans"><b>${act}. ${title}</b><div>${answer}</div></div>`);
}
const lines = (n, cls = '') => Array.from({ length: n }, () => `<div class="wline ${cls}"></div>`).join('');
const qnum = (i) => `<span class="qn" style="border-color:${['#e58f99', '#e2b84a', '#6fb784', '#6f9fd1', '#a98bd6', '#e59b62'][i % 6]}">${i + 1}</span>`;

// ---------- title page ----------
pages.push(`<div class="title">
  <div class="tt1">Cappy's Big</div><div class="tt2">Activity Book</div>
  <div class="tsub">Color · Read · Count · Learn</div>
  <div class="tpic">${A(1)}</div>
  <div class="tgrade">Grade 2 · Ages 7–8</div>
  <div class="tauthor">${esc(PUBLISHER)}</div></div>`);

// ---------- copyright / belongs to ----------
pages.push(`<div class="belongs"><div class="bb">This book belongs to:</div><div class="wline big"></div>
  <div class="bpic">${A(3)}</div></div>
  <div class="how"><h2>How to use this book</h2>
  <p>Each page has one short activity. Read the directions first, then have fun! Use crayons, colored pencils, or markers.
  Grown-ups can check the answers at the back of the book.</p></div>
  <div class="copy">Published by ${esc(PUBLISHER)}<br>Copyright © ${YEAR} ${esc(PUBLISHER)}. All rights reserved.<br>
  No part of this book may be copied or reproduced without written permission from the author, except for personal or classroom use of single pages.</div>`);

// ---------- 1 Meet Cappy ----------
activity('Meet Cappy', 'Color Cappy and his river home. Then answer the questions.',
  `<div class="pic" style="height:3.9in">${A(4)}</div>
   ${['What color will you make Cappy?', 'What do you see near Cappy?', 'Give Cappy a friend. What is the friend’s name?', 'What would you do with Cappy for one day?']
    .map((q, i) => `<div class="q">${qnum(i)}<span>${q}</span></div>${lines(1)}`).join('')}`,
  'Answers will vary.');


// ---------- 2 All About Capybaras ----------
const passage = 'Cappy is a capybara. He lives near a river in South America with his big family. Capybaras are very good swimmers. They have webbed feet, like a duck! Every day, Cappy eats lots of grass and water plants. When it is hot, he rests in the cool mud. Cappy is gentle, so many animals like to sit with him.';
const readQ = [['Where does Cappy live?', 'Near a river in South America.'], ['What helps capybaras swim?', 'Their webbed feet.'],
  ['What does Cappy eat?', 'Grass and water plants.'], ['What does Cappy do when it is hot?', 'He rests in the cool mud.'],
  ['Why do animals like to sit with Cappy?', 'Because he is gentle.']];
activity('All About Capybaras', 'Read the story. Then answer the questions.',
  `<div class="box read">${passage}</div>
   <div class="pic" style="height:1.9in">${A(2)}</div>
   ${readQ.map(([q], i) => `<div class="q">${qnum(i)}<span>${q}</span></div>${lines(1, 'tight')}`).join('')}`,
  readQ.map(([, a], i) => `${i + 1}. ${a}`).join('<br>'));

// ---------- 3 Color by Number ----------
const key = [['brown', '#c9956a'], ['blue', '#9cc4ea'], ['green', '#a9d6a0'], ['yellow', '#f6dc7a'], ['pink', '#f4b3bf'], ['gray', '#cfd3d6']];
activity('Color by Number', 'Use the color code to color the picture.',
  `<div class="key">${key.map(([n, col], i) => `<span><i style="background:${col}">${i + 1}</i> = ${n}</span>`).join('')}</div>
   <div class="framed" style="height:6.9in">${A(5)}</div>`,
  '1 = Cappy, 2 = water, 3 = grass and leaves, 4 = sun and lily flower, 5 = flowers and cheek, 6 = rocks and nose.');


// ---------- 4 Addition / 5 Subtraction ----------
function mathGrid(probs, op, poses) {
  return `<div class="grid2">${probs.map(([a, b], i) => `<div class="card">
    <div class="cpic">${poses[i % poses.length]}</div>
    <div class="sum"><div>${a}</div><div>${op} ${b}</div><div class="bar"></div><div class="abox"></div></div></div>`).join('')}</div>`;
}
const poses = [1, 2, 3, 7, 8, 9].map(A);
const add = [[27, 15], [36, 48], [19, 23], [45, 37], [58, 26], [64, 29]];
activity('Addition Fun', 'Add the numbers. Write the answer in the box. Then color the capybaras.',
  mathGrid(add, '+', poses), add.map(([a, b]) => `${a} + ${b} = <strong>${a + b}</strong>`).join(' · '));
const sub = [[52, 17], [70, 34], [83, 46], [91, 28], [65, 39], [44, 18]];
activity('Subtraction Splash', 'Subtract the numbers. Write the answer in the box. Then color the pictures.',
  mathGrid(sub, '−', [10, 7, 2, 8, 3, 9].map(A)), sub.map(([a, b]) => `${a} − ${b} = <strong>${a - b}</strong>`).join(' · '));

// ---------- 6 Word Search ----------
const words = ['CAPYBARA', 'RIVER', 'SWIM', 'GRASS', 'FRIEND', 'CALM', 'FRUIT', 'PLANTS', 'WATER', 'MUD'];
const N = 11;
const grid = Array.from({ length: N }, () => Array(N).fill(''));
const placed = [];
for (const w of words) {
  for (let t = 0; t < 500; t++) {
    const dir = rnd() < 0.5 ? [0, 1] : [1, 0];
    const r = Math.floor(rnd() * (N - (dir[0] ? w.length - 1 : 0)));
    const col = Math.floor(rnd() * (N - (dir[1] ? w.length - 1 : 0)));
    let ok = true;
    for (let k = 0; k < w.length; k++) { const ch = grid[r + dir[0] * k][col + dir[1] * k]; if (ch && ch !== w[k]) { ok = false; break; } }
    if (!ok) continue;
    const cells = [];
    for (let k = 0; k < w.length; k++) { grid[r + dir[0] * k][col + dir[1] * k] = w[k]; cells.push((r + dir[0] * k) * N + col + dir[1] * k); }
    placed.push(cells); break;
  }
}
if (placed.length !== words.length) throw new Error('word search placement failed');
const solution = new Set(placed.flat());
const ABC = 'ABCDEFGHIJKLMNOPRSTUVWY';
for (let r = 0; r < N; r++) for (let col = 0; col < N; col++) if (!grid[r][col]) grid[r][col] = ABC[Math.floor(rnd() * ABC.length)];
const wsTable = (hl) => `<table class="ws${hl ? ' small' : ''}">${grid.map((row, r) => `<tr>${row.map((ch, col) => `<td class="${hl && solution.has(r * N + col) ? 'hl' : ''}">${ch}</td>`).join('')}</tr>`).join('')}</table>`;
activity('Capybara Word Search', 'Find and circle the words. They go across → and down ↓.',
  `${wsTable(false)}<div class="bank">${words.map(w => `<span>${w}</span>`).join('')}</div>
   <div class="pic corner">${A(3)}</div>`, wsTable(true));

// ---------- 7 Maze ----------
const MW = 12, MH = 13;
const walls = []; // each cell: [top,right,bottom,left]
for (let i = 0; i < MW * MH; i++) walls.push([1, 1, 1, 1]);
(function carve() {
  const seen = new Set([0]); const stack = [0];
  while (stack.length) {
    const cur = stack[stack.length - 1]; const x = cur % MW, y = Math.floor(cur / MW);
    const nb = [[0, -1, 0, 2], [1, 0, 1, 3], [0, 1, 2, 0], [-1, 0, 3, 1]]
      .map(([dx, dy, w, o]) => [x + dx, y + dy, w, o]).filter(([nx, ny]) => nx >= 0 && ny >= 0 && nx < MW && ny < MH && !seen.has(ny * MW + nx));
    if (!nb.length) { stack.pop(); continue; }
    const [nx, ny, w, o] = nb[Math.floor(rnd() * nb.length)];
    const ni = ny * MW + nx; walls[cur][w] = 0; walls[ni][o] = 0; seen.add(ni); stack.push(ni);
  }
})();
function mazePath() {
  const goal = MW * MH - 1, prev = new Map([[0, -1]]), q = [0];
  while (q.length) {
    const cur = q.shift(); if (cur === goal) break;
    const x = cur % MW, y = Math.floor(cur / MW);
    [[0, -1, 0], [1, 0, 1], [0, 1, 2], [-1, 0, 3]].forEach(([dx, dy, w]) => {
      const ni = (y + dy) * MW + x + dx;
      if (!walls[cur][w] && !prev.has(ni)) { prev.set(ni, cur); q.push(ni); }
    });
  }
  const p = []; for (let v = goal; v !== -1; v = prev.get(v)) p.unshift(v); return p;
}
function mazeSvg(sol) {
  const s = 40, ox = 20, oy = 20; let d = '';
  walls.forEach((w, i) => {
    const x = ox + (i % MW) * s, y = oy + Math.floor(i / MW) * s;
    if (w[0] && i !== 0) d += `M${x},${y}h${s}`; if (w[1]) d += `M${x + s},${y}v${s}`;
    if (w[2] && i !== MW * MH - 1) d += `M${x},${y + s}h${s}`; if (w[3]) d += `M${x},${y}v${s}`;
  });
  const pts = sol ? mazePath().map(i => `${ox + (i % MW) * s + s / 2},${oy + Math.floor(i / MW) * s + s / 2}`).join(' ') : '';
  return `<svg viewBox="0 0 ${MW * s + 40} ${MH * s + 40}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
    ${sol ? `<polyline points="${pts}" fill="none" stroke="${TEAL}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/>` : ''}
    <path d="${d}" stroke="#1d2b33" stroke-width="${sol ? 3 : 4}" stroke-linecap="round" fill="none"/></svg>`;
}
activity('Help Cappy Get to the River', 'Draw a line from START to the RIVER. Don’t cross any walls!',
  `<div class="mz"><div class="mzlab">START ↓</div><div class="mzsvg">${mazeSvg(false)}</div><div class="mzlab end">↓ RIVER</div>
   <div class="mzcap">${A(9)}</div><div class="mzriv">${A(2)}</div></div>`,
  `<div style="width:2.4in;height:2.6in">${mazeSvg(true)}</div>`);

// ---------- 8 True or False ----------
const tf = [['Capybaras are the biggest rodents in the world.', 'T'], ['Capybaras live in South America.', 'T'],
  ['Capybaras eat meat.', 'F'], ['Capybaras have webbed feet that help them swim.', 'T'],
  ['Capybaras like to live all alone.', 'F'], ['Baby capybaras are called pups.', 'T'],
  ['Capybaras can hold their breath under water for about five minutes.', 'T'], ['Capybaras can fly.', 'F']];
activity('Capybara Science: True or False?', 'Read each sentence. Circle T for true or F for false.',
  `<div class="tf">${tf.map(([s], i) => `<div class="tfr">${qnum(i)}<span>${s}</span><b>T</b><b>F</b></div>`).join('')}</div>
   <div class="box fact"><b>Did you know?</b> A capybara can sleep in the water with just its nose sticking out!</div>
   <div class="pic" style="height:2in">${A(2)}</div>`,
  tf.map(([, a], i) => `${i + 1}. ${a === 'T' ? 'True' : 'False'}`).join(' · '));

// ---------- 9 Label Cappy ----------
const parts = [[86, 36, 'ear'], [122, 58, 'eye'], [180, 50, 'nose'], [216, 88, 'whiskers'], [135, 204, 'paw'], [44, 112, 'fur']];
activity('Label Cappy', 'Use the word bank. Write the name of each body part next to its number.',
  `<div class="bank">${['whiskers', 'paw', 'ear', 'fur', 'nose', 'eye'].map(w => `<span>${w}</span>`).join('')}</div>
   <div class="pic" style="height:4.4in">${A(6)}</div>
   <div class="grid2 lab">${parts.map((p, i) => `<div class="q">${qnum(i)}<div class="wline"></div></div>`).join('')}</div>`,
  parts.map(([, , w], i) => `${i + 1}. ${w}`).join(' · '));

// ---------- 10 Sequencing ----------
const seq = [['After lunch, Cappy swims in the river.', 3], ['Cappy wakes up when the sun comes up.', 1],
  ['At night, Cappy sleeps next to his family.', 4], ['Cappy eats grass for breakfast.', 2]];
activity('Cappy’s Busy Day', 'What happened first? Write 1, 2, 3, or 4 in each box to put the day in order.',
  `<div class="seq">${seq.map(([s]) => `<div class="seqr"><div class="abox sm"></div><span>${s}</span></div>`).join('')}</div>
   <p class="instr" style="margin-top:.25in">Now draw Cappy’s favorite part of the day.</p>
   <div class="drawbox" style="height:4.3in"></div>`,
  seq.map(([s, n]) => `${n}: ${s}`).sort().join('<br>'));

// ---------- 11 Skip Counting ----------
const skips = [[2, 2], [5, 5], [10, 10], [100, 100]];
const blanks = [2, 4, 6];
activity('Skip Counting on Lily Pads', 'Count by 2s, 5s, 10s, and 100s. Write the missing numbers on the lily pads.',
  skips.map(([st, by]) => `<div class="skip"><div class="sklab">Count by ${by}s</div><div class="pads">${Array.from({ length: 8 }, (_, k) => `<div class="pad">${blanks.includes(k) || k === 7 ? '' : st + by * k}</div>`).join('')}</div></div>`).join('') +
  `<div class="pic" style="height:2.6in">${A(2)}</div>`,
  skips.map(([st, by]) => `By ${by}s: ${[2, 4, 6, 7].map(k => st + by * k).join(', ')}`).join('<br>'));

// ---------- 12 Compare ----------
const cmp = [[45, 54], [72, 27], [38, 38], [99, 100], [61, 16], [250, 205], [413, 431], [87, 78]];
const sign = (a, b) => (a < b ? '&lt;' : a > b ? '&gt;' : '=');
activity('Greater, Less, or Equal?', 'Write &lt;, &gt;, or = in each circle.',
  `<div class="box fact center">&lt; means <b>less than</b> &nbsp;·&nbsp; &gt; means <b>greater than</b> &nbsp;·&nbsp; = means <b>equal to</b></div>
   <div class="grid2 cmp">${cmp.map(([a, b]) => `<div class="cmpr"><span>${a}</span><i></i><span>${b}</span></div>`).join('')}</div>
   <div class="pic" style="height:2.2in">${A(8)}</div>`,
  cmp.map(([a, b]) => `${a} ${sign(a, b)} ${b}`).join(' · '));

// ---------- 13 Place Value ----------
const pv = [346, 572, 809, 130, 465, 291];
activity('Place Value Pond', 'Write how many hundreds, tens, and ones are in each number.',
  `<table class="pv"><tr><th>Number</th><th>Hundreds</th><th>Tens</th><th>Ones</th></tr>
   <tr class="ex"><td>218</td><td>2</td><td>1</td><td>8</td></tr>
   ${pv.map(v => `<tr><td>${v}</td><td></td><td></td><td></td></tr>`).join('')}</table>
   <div class="pic" style="height:2.3in">${A(3)}</div>`,
  pv.map(v => `${v} = ${Math.floor(v / 100)} hundreds, ${Math.floor(v / 10) % 10} tens, ${v % 10} ones`).join('<br>'));

// ---------- 14 Clocks ----------
const times = [[3, 0], [7, 30], [10, 15], [4, 45], [1, 20], [8, 55]];
function clock(h, m) {
  const ma = m * 6, ha = (h % 12) * 30 + m * 0.5;
  const tick = Array.from({ length: 12 }, (_, i) => { const a = i * 30 * Math.PI / 180; return `<text x="${60 + 42 * Math.sin(a)}" y="${60 - 42 * Math.cos(a) + 5}" text-anchor="middle" font-family="Fredoka" font-weight="600" font-size="13">${i || 12}</text>`; }).join('');
  const hand = (ang, len, w) => { const a = ang * Math.PI / 180; return `<line x1="60" y1="60" x2="${60 + len * Math.sin(a)}" y2="${60 - len * Math.cos(a)}" stroke="#1d2b33" stroke-width="${w}" stroke-linecap="round"/>`; };
  return `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="55" fill="#fff" stroke="#1d2b33" stroke-width="4"/>${tick}${hand(ha, 26, 5)}${hand(ma, 38, 3)}<circle cx="60" cy="60" r="4" fill="#1d2b33"/></svg>`;
}
const fmt = (h, m) => `${h}:${String(m).padStart(2, '0')}`;
activity('What Time Is It, Cappy?', 'Look at each clock. Write the time on the line.',
  `<div class="grid3">${times.map(([h, m]) => `<div class="clk">${clock(h, m)}<div class="tline">____ : ____</div></div>`).join('')}</div>
   <div class="pic" style="height:2.2in">${A(1)}</div>`,
  times.map(([h, m]) => fmt(h, m)).join(' · '));

// ---------- 15 Coins ----------
const coin = v => { const r = { 1: 19, 5: 22, 10: 17, 25: 26 }[v]; return `<svg viewBox="0 0 ${2 * r + 6} ${2 * r + 6}" style="width:${(2 * r + 6) / 62}in"><circle cx="${r + 3}" cy="${r + 3}" r="${r}" fill="#fff" stroke="#1d2b33" stroke-width="2.4"/><circle cx="${r + 3}" cy="${r + 3}" r="${r - 5}" fill="none" stroke="#1d2b33" stroke-width="1" stroke-dasharray="2 3"/><text x="${r + 3}" y="${r + 8}" text-anchor="middle" font-family="Fredoka" font-weight="600" font-size="${r * 0.8}">${v}¢</text></svg>`; };
const coinRows = [[25, 10, 5, 1], [10, 10, 5, 1, 1], [25, 25, 10], [5, 5, 5, 1, 1, 1], [25, 10, 10, 5, 1]];
activity('Cappy’s Coin Jar', 'Add up the coins in each row. Write the total. Color the pennies brown!',
  `<div class="box fact center">penny = 1¢ &nbsp;·&nbsp; nickel = 5¢ &nbsp;·&nbsp; dime = 10¢ &nbsp;·&nbsp; quarter = 25¢</div>
   ${coinRows.map((r, i) => `<div class="coinr">${qnum(i)}<div class="coins">${r.map(coin).join('')}</div><div class="ctot">= <span></span> ¢</div></div>`).join('')}
   <div class="pic" style="height:1.3in">${A(7)}</div>`,
  coinRows.map((r, i) => `${i + 1}. ${r.reduce((a, b) => a + b, 0)}¢`).join(' · '));

// ---------- 16 Story problems ----------
const story = [['Cappy ate 14 leaves in the morning and 18 leaves after lunch. How many leaves did he eat in all?', '14 + 18 = 32 leaves'],
  ['There were 25 capybaras in the river. Then 9 got out to rest. How many are still in the river?', '25 − 9 = 16 capybaras'],
  ['Cappy saw 3 birds. Each bird sang 5 songs. How many songs did the birds sing?', '5 + 5 + 5 = 15 songs'],
  ['Lulu has 40 berries. She gives 12 berries to Cappy. How many berries does Lulu have now?', '40 − 12 = 28 berries']];
activity('Story Problems', 'Read each problem. Show your work in the box. Write the answer.',
  story.map(([q], i) => `<div class="sp"><div class="q">${qnum(i)}<span>${q}</span></div><div class="spw"><div class="work"></div><div class="spa">Answer: <span></span></div></div></div>`).join(''),
  story.map(([, a], i) => `${i + 1}. ${a}`).join('<br>'));

// ---------- 17 Rhymes ----------
const rl = ['sun', 'frog', 'tree', 'cake', 'rest', 'boat'], rr = ['nest', 'bee', 'fun', 'coat', 'log', 'lake'];
const rMatch = { sun: 'fun', frog: 'log', tree: 'bee', cake: 'lake', rest: 'nest', boat: 'coat' };
activity('Rhyme Time', 'Draw a line to match the words that rhyme.',
  `<div class="rhyme"><div>${rl.map(w => `<span>${w}<i></i></span>`).join('')}</div><div>${rr.map(w => `<span><i></i>${w}</span>`).join('')}</div></div>
   <p class="instr">Write two more words that rhyme with <b>swim</b>:</p><div class="grid2">${lines(2)}</div>
   <div class="pic" style="height:2.4in">${A(10)}</div>`,
  rl.map(w => `${w} – ${rMatch[w]}`).join(' · ') + '<br>Rhymes with swim: answers will vary (for example: him, Tim, dim, rim).');

// ---------- 18 Scramble ----------
const scr = [['IREVR', 'RIVER', 'Where Cappy swims'], ['SSGRA', 'GRASS', 'What Cappy eats'], ['WMSI', 'SWIM', 'What you do in water'],
  ['NDIREF', 'FRIEND', 'Someone you like to play with'], ['DMU', 'MUD', 'Wet, brown dirt'], ['NUS', 'SUN', 'It shines in the sky']];
activity('Word Scramble', 'Unscramble the letters to make a word. Use the clue to help you.',
  `<div class="scr">${scr.map(([s, , h], i) => `<div class="scrr">${qnum(i)}<span class="let">${s.split('').join(' ')}</span><span class="hint">${h}</span><div class="wline"></div></div>`).join('')}</div>
   <div class="pic" style="height:1.7in">${A(9)}</div>`,
  scr.map(([, w], i) => `${i + 1}. ${w}`).join(' · '));

// ---------- 19 Fill in the blank ----------
const fib = [['Capybaras love to ___ in the river.', 'swim'], ['Cappy eats green ___.', 'grass'], ['The sun makes the water ___.', 'warm'],
  ['Cappy has lots of ___.', 'friends'], ['At night, Cappy likes to ___.', 'sleep'], ['Cappy smiles because he is ___.', 'happy']];
activity('Fill in the Blank', 'Choose a word from the word bank to finish each sentence.',
  `<div class="bank">${['happy', 'swim', 'sleep', 'grass', 'warm', 'friends'].map(w => `<span>${w}</span>`).join('')}</div>
   <div class="fib">${fib.map(([s], i) => `<div class="q">${qnum(i)}<span>${s.replace('___', '<u></u>')}</span></div>`).join('')}</div>
   <div class="pic" style="height:2.6in">${A(3)}</div>`,
  fib.map(([, w], i) => `${i + 1}. ${w}`).join(' · '));

// ---------- 20 Draw & Write ----------
activity('Cappy’s Big Adventure', 'Where will Cappy go next? Draw it in the box. Then write two sentences about it.',
  `<div class="drawbox" style="height:5.2in"></div>${lines(4)}`, 'Answers will vary.');

// ---------- 21 Coloring page ----------
activity('Coloring Time!', 'Color Cappy and Lulu relaxing by the river.',
  `<div class="framed" style="height:7.9in">${A(11)}</div>`, null);

// ---------- certificate ----------
pages.push(`<div class="cert"><div class="cin">
  <div class="ct1">Certificate of Awesome</div><p>This certificate is proudly given to</p><div class="wline big"></div>
  <p>for finishing <b>Cappy’s Big Activity Book</b>!<br>You are a super reader, counter, and thinker.</p>
  <div class="cpic2">${A(1)}</div>
  <div class="csig"><div><div class="wline"></div>Date</div><div><div class="wline"></div>Signed</div></div></div></div>`);

// ---------- answer key ----------
const half = Math.ceil(answers.length / 2);
pages.push(`<div class="hd"><h1>Answer Key</h1></div><div class="rule"></div><div class="akey">${answers.slice(0, half).join('')}</div>`);
pages.push(`<div class="hd"><h1>Answer Key <small>(continued)</small></h1></div><div class="rule"></div><div class="akey">${answers.slice(half).join('')}</div>`);

// ---------- render ----------
const F = f => 'file://' + path.join(__dirname, 'fonts', f);
const css = `
@font-face{font-family:Andika;font-weight:400;src:url(${F('f1.ttf')})}
@font-face{font-family:Andika;font-weight:700;src:url(${F('f2.ttf')})}
@font-face{font-family:Fredoka;font-weight:500;src:url(${F('f3.ttf')})}
@font-face{font-family:Fredoka;font-weight:600;src:url(${F('f4.ttf')})}
@font-face{font-family:Fredoka;font-weight:700;src:url(${F('f5.ttf')})}
@page{size:8.5in 11in;margin:0}
*{box-sizing:border-box}
body{margin:0;font-family:Andika;color:#1d2b33;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:8.5in;height:11in;padding:.65in .7in .75in;position:relative;overflow:hidden;page-break-after:always;background:#fbfcfc}
.page:last-child{page-break-after:auto}
.pno{position:absolute;bottom:.38in;left:0;right:0;text-align:center;font:600 11pt Fredoka;color:#7a8a90}
.hd{display:flex;align-items:center;gap:.18in}
.num{width:.62in;height:.62in;border-radius:50%;border:3px solid ${TEAL};display:flex;align-items:center;justify-content:center;font:700 22pt Fredoka;flex:none}
h1{font:700 28pt/1.05 Fredoka;margin:0}
h1 small{font-size:16pt;color:#7a8a90}
.instr{font-size:14.5pt;margin:.12in 0 .06in;line-height:1.3}
.rule{height:3px;background:${TEAL};border-radius:2px;margin:.08in 0 .18in}
.pic{display:flex;justify-content:center;align-items:center;margin:.08in 0}
.pic>svg{height:100%;width:auto;max-width:100%}
img.art{display:block;width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply}
.framed img.art{background:#fff}
.framed{border:3px solid #1d2b33;border-radius:.18in;padding:.12in;background:#fff}
.q{display:flex;align-items:center;gap:.14in;font:600 14.5pt Andika;margin-top:.14in}
.qn{width:.38in;height:.38in;flex:none;border-radius:50%;border:3px solid;display:inline-flex;align-items:center;justify-content:center;font:700 13pt Fredoka;background:#fff}
.wline{border-bottom:2px solid #9fc3bf;height:.42in;margin-left:.52in}
.wline.tight{height:.34in}
.wline.big{height:.5in;margin:0 .4in}
.box{border:3px solid ${TEAL};border-radius:.18in;background:#eef6f5;padding:.16in .22in;font-size:15pt;line-height:1.5}
.box.fact{font-size:13.5pt;padding:.1in .2in;margin:.14in 0}
.center{text-align:center}
.key{display:flex;justify-content:space-between;border:3px solid ${TEAL};border-radius:.16in;padding:.1in .16in;margin-bottom:.16in;font:600 12.5pt Fredoka}
.key i{display:inline-flex;width:.34in;height:.34in;border-radius:50%;border:2px solid #1d2b33;align-items:center;justify-content:center;font-style:normal;margin-right:2px}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:.16in}
.grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.2in}
.card{border:3px solid #9fd0c9;border-radius:.16in;height:2.62in;display:flex;align-items:center;padding:.1in;background:#fff}
.cpic{flex:1;height:100%;display:flex;align-items:center}.cpic svg{width:100%;max-height:100%}.cpic img.art{height:2.3in}
.sum{width:1.35in;font:600 30pt/1.1 Fredoka;text-align:right}
.sum .bar{height:3px;background:#1d2b33;margin:.04in 0 .1in}
.abox{width:1.1in;height:.72in;border:3px solid #9fd0c9;border-radius:.1in;margin-left:auto;background:#fff}
.abox.sm{width:.6in;height:.6in;margin:0;flex:none}
table.ws{border-collapse:collapse;margin:.05in auto .16in;background:#fff}
table.ws td{width:.52in;height:.52in;text-align:center;font:600 20pt Fredoka;border:1.5px solid #cfe1df}
table.ws.small td{width:.17in;height:.17in;font-size:7pt;border-width:.6px}
table.ws td.hl{background:#b9dfc2}
.bank{display:flex;flex-wrap:wrap;gap:.1in;justify-content:center;border:3px dashed ${TEAL};border-radius:.16in;padding:.12in;margin-bottom:.1in}
.bank span{font:600 14pt Fredoka;padding:.02in .14in;background:#eef6f5;border-radius:.1in}
.corner{height:1.5in}
.mz{position:relative;height:8.2in}
.mzsvg{position:absolute;left:.9in;right:.9in;top:.35in;bottom:.35in}
.mzlab{position:absolute;left:.9in;top:0;font:700 14pt Fredoka;color:${TEAL}}
.mzlab.end{left:auto;right:1.05in;top:auto;bottom:0}
.mzcap{position:absolute;left:-.3in;top:.2in;width:1.5in;height:1.5in}
.mzriv{position:absolute;right:-.4in;bottom:.2in;width:1.8in;height:1.4in}
.tf .tfr{display:flex;align-items:center;gap:.14in;font-size:14.5pt;margin:.12in 0}
.tfr>span:not(.qn){flex:1}.tfr b{width:.44in;height:.44in;border-radius:50%;border:2px solid #9fc3bf;display:inline-flex;align-items:center;justify-content:center;font:700 15pt Fredoka;background:#fff}
.lab .q{margin-top:.02in}.lab .wline{flex:1;margin:0}
.seq .seqr{display:flex;align-items:center;gap:.2in;font-size:15pt;margin:.14in 0}
.drawbox{border:3px dashed ${TEAL};border-radius:.2in;background:#fff;margin:.1in 0 .14in}
.skip{margin:.2in 0 .34in}.sklab{font:700 15pt Fredoka;margin-bottom:.06in}
.pads{display:flex;justify-content:space-between}
.pad{width:.8in;height:.7in;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;border:3px solid #6fb784;background:#eef7f0;display:flex;align-items:center;justify-content:center;font:600 16pt Fredoka}
.cmp{margin:.2in 0}.cmpr{display:flex;align-items:center;justify-content:center;gap:.22in;font:600 26pt Fredoka;padding:.14in;border:3px solid #9fd0c9;border-radius:.16in;background:#fff}
.cmpr span{width:.9in;text-align:center}.cmpr i{width:.62in;height:.62in;border-radius:50%;border:3px solid ${TEAL}}
table.pv{width:100%;border-collapse:separate;border-spacing:0;border:3px solid ${TEAL};border-radius:.16in;overflow:hidden;background:#fff}
table.pv th{background:#eef6f5;font:700 14pt Fredoka;padding:.1in;border-bottom:2px solid ${TEAL}}
table.pv td{text-align:center;height:.6in;font:600 20pt Fredoka;border-top:1.5px solid #cfe1df;border-left:1.5px solid #cfe1df}
table.pv td:first-child{border-left:0}
table.pv tr.ex td{color:#7a8a90;font-size:16pt}
.clk{text-align:center}.clk svg{width:1.75in}.tline{font:600 16pt Fredoka;margin-top:.06in}
.coinr{display:flex;align-items:center;gap:.15in;margin:.12in 0;padding:.06in .12in;border:2px solid #cfe1df;border-radius:.14in;background:#fff}
.coins{flex:1;display:flex;gap:.1in;align-items:center}
.ctot{font:600 20pt Fredoka;white-space:nowrap}.ctot span{display:inline-block;width:.8in;border-bottom:2px solid #1d2b33;height:.4in}
.sp{margin-bottom:.12in}.sp .q{align-items:flex-start;font-weight:400;font-size:14pt;line-height:1.35}
.spw{display:flex;gap:.16in;margin:.06in 0 0 .52in}
.work{flex:1;height:1.05in;border:2px dashed #9fc3bf;border-radius:.12in;background:#fff}
.spa{width:2.1in;font:600 13pt Fredoka;align-self:flex-end}.spa span{display:block;border-bottom:2px solid #1d2b33;height:.4in}
.rhyme{display:flex;justify-content:space-between;margin:.25in .3in .35in}
.rhyme>div{display:flex;flex-direction:column;gap:.42in}
.rhyme span{font:600 22pt Fredoka;display:flex;align-items:center;gap:.14in}
.rhyme i{width:.2in;height:.2in;border-radius:50%;background:${TEAL}}
.scr .scrr{display:grid;grid-template-columns:.5in 1.9in 1fr;align-items:center;row-gap:.06in;margin:.2in 0}
.scrr .let{font:700 19pt Fredoka;letter-spacing:.02in}.scrr .hint{font-size:13pt;color:#4d5d63}
.scrr .wline{grid-column:2/4;margin:0}
.fib .q{font-weight:400;font-size:17pt;margin:.42in 0}.fib u{display:inline-block;width:1.4in;border-bottom:2px solid #1d2b33;height:.3in;vertical-align:bottom}
.title{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border:4px solid ${TEAL};border-radius:.3in;padding:.4in}
.tt1{font:600 32pt Fredoka;color:${TEAL}}.tt2{font:700 50pt/1 Fredoka}.tsub{font:500 18pt Fredoka;margin:.14in 0 .3in;color:#4d5d63}
.tpic{width:4.8in;height:4.8in}.tgrade{font:700 20pt Fredoka;margin-top:.3in;padding:.08in .3in;border-radius:.3in;background:#f6dd8f}.tauthor{font:500 16pt Fredoka;margin-top:.3in}
.belongs{text-align:center;border:3px dashed ${TEAL};border-radius:.24in;padding:.3in;margin-top:.2in;background:#fff}
.bb{font:700 24pt Fredoka;margin-bottom:.1in}.bpic{width:3.4in;height:2.5in;margin:.2in auto 0}
.how{margin-top:.45in}.how h2{font:700 20pt Fredoka;margin:0 0 .08in}.how p{font-size:14pt;line-height:1.5;margin:0}
.copy{position:absolute;left:.7in;right:.7in;bottom:.8in;font-size:10pt;color:#4d5d63;line-height:1.5}
.cert{height:100%;border:6px double ${TEAL};border-radius:.3in;padding:.14in}
.cin{height:100%;border:3px solid #f6dd8f;border-radius:.22in;text-align:center;padding:.5in .4in;display:flex;flex-direction:column;align-items:center}
.ct1{font:700 34pt Fredoka;color:${TEAL}}.cin p{font-size:16pt;line-height:1.5}.cin .wline.big{width:80%;margin:.1in 0 .2in}
.cpic2{width:3.8in;height:3.8in;margin:.2in 0}.csig{display:flex;gap:.6in;width:100%;margin-top:auto;font:600 13pt Fredoka}.csig>div{flex:1}.csig .wline{margin:0 0 .05in}
.akey{columns:2;column-gap:.3in;font-size:10.5pt;line-height:1.45;margin-top:.1in}
.ans{break-inside:avoid;margin-bottom:.14in}.ans>b{font:600 12pt Fredoka;color:${TEAL};display:block}
`;
const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${pages.map((p, i) =>
  `<div class="page">${p}${i > 1 ? `<div class="pno">${i + 1}</div>` : ''}</div>`).join('')}</body></html>`;
fs.writeFileSync(path.join(__dirname, 'interior.html'), html);

(async () => {
  const b = await chromium.launch(CHROME ? { executablePath: CHROME } : {});
  const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'interior.html'));
  await p.evaluate(() => document.fonts.ready);
  // overflow check: any page whose content exceeds its box
  const over = await p.evaluate(() => [...document.querySelectorAll('.page')].map((pg, i) => {
    const r = pg.getBoundingClientRect(); let max = 0;
    pg.querySelectorAll('*').forEach(e => { if (!e.classList.contains('pno')) max = Math.max(max, e.getBoundingClientRect().bottom - r.top); });
    return max > r.height - 0.6 * 96 ? `page ${i + 1}: ${(max / 96).toFixed(2)}in` : null;
  }).filter(Boolean));
  console.log('pages:', pages.length, 'overflow:', over.length ? over : 'none');
  await p.pdf({ path: path.join(__dirname, 'Cappy_Interior_8.5x11.pdf'), width: '8.5in', height: '11in', printBackground: true, preferCSSPageSize: true });
  if (process.argv.includes('--png')) {
    await p.setViewportSize({ width: 816, height: 1056 });
    const n = pages.length;
    for (let i = 0; i < n; i++) {
      await p.evaluate(i => window.scrollTo(0, i * 1056), i);
      await p.screenshot({ path: path.join(__dirname, 'png', `p${String(i + 1).padStart(2, '0')}.png`) });
    }
  }
  await b.close();
})();
