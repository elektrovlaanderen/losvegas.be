# Cappy's Big Activity Book – Grade 2

Werkboek voor Amazon KDP (paperback), gebaseerd op het "Color & Grow"-voorbeeld: capibara's, kleuren, lezen, rekenen, wetenschap en puzzels.

## Bestanden
| Bestand | Wat |
|---|---|
| `Cappy_Interior_8.5x11.pdf` | Binnenwerk, 26 pagina's, 8,5 × 11 inch, geen afloop |
| `Cappy_Cover_Premium_26p.pdf` | Omslag (achterkant + rug + voorkant), 17,311 × 11,25 inch, met afloop |
| `cover.png`, `voorbeeld_paginas.png` | Voorbeeldafbeeldingen |
| `bron/` | Broncode om de PDF's opnieuw te maken (`npm i playwright-core pdf-lib`, dan `node build.js --png && node cover.js`) |

## Versie 2: met Higgsfield-illustraties (aanbevolen)
De tekeningen zijn gemaakt met Higgsfield (GPT Image 2.5), met de voorbeeldpagina's als stijlreferentie. De PDF's zijn gebouwd in de Higgsfield-sandbox:
- Binnenwerk: https://d2ol7oe51mr4n9.cloudfront.net/user_3HBB2MMxSPG4JtlCTmWPSIJHi6P/c8adbd3e-e9ac-491d-a585-83acaf540417.pdf
- Omslag: https://d2ol7oe51mr4n9.cloudfront.net/user_3HBB2MMxSPG4JtlCTmWPSIJHi6P/ce530469-7ed2-48a7-b671-3aee753f5d8e.pdf
- Voorbeeldbladen: `e36b3344…jpg`, `2ac331ad…jpg` en de omslag `3184405a…jpg` (in je Higgsfield-media)

Opnieuw bouwen (waar de cloudfront-domeinen bereikbaar zijn): in `bron/` voer je `sh fetch_art.sh && npm i playwright-core pdf-lib && node build_img.js --png && node cover_img.js && python3 sheets.py` uit.
De PDF's in deze map (`Cappy_*.pdf`) zijn nog versie 1, met de eenvoudige lijntekeningen.

⚠️ Controleer met de hand: op **Color by Number** (pagina 5) en **Label Cappy** (pagina 11) heeft de AI de cijfers in de tekening gezet. Kijk na of die kloppen met de kleurcode en de antwoordsleutel.

## Instellingen bij het uploaden naar KDP
- **Ink and paper:** Premium color, white paper *(standard color kan pas vanaf 72 pagina's)*
- **Trim size:** 8.5 × 11 in
- **Bleed settings:** No bleed *(binnenwerk)*. De omslag heeft zelf afloop.
- **Cover finish:** Glossy
- **ISBN:** gratis KDP-ISBN
- **Reading age:** 7–8 · **Grade level:** 2
- **AI-generated content:** **Yes**. Tekst en illustraties zijn met AI (Claude) gemaakt. Dit moet je aanvinken.

> ⚠️ Pas je het aantal pagina's aan, dan verandert de rugbreedte. Maak de omslag in dat geval opnieuw: zet `PAGES` in `bron/cover.js` op het nieuwe aantal.

## Voor je het boek publiceert
1. Uitgever staat op **Debacker LLC** (titelpagina + copyright). Vul bij KDP ook een auteursnaam of pennaam in.
2. Bestel eerst een **proof copy** (drukproef) en controleer die op papier.

## Tekst voor de Amazon-pagina
**Title:** Cappy's Big Activity Book
**Subtitle:** Capybara Fun for Grade 2 – Coloring, Reading, Math, Science & Puzzles for Kids Ages 7–8

**Description:**
Learning is more fun with a capybara friend! Join Cappy the capybara on a big adventure by the river. This activity book is made for 2nd graders and mixes coloring with real practice in reading, math, and science.

Inside you'll find 21 activities:
- Reading passages with comprehension questions
- Two-digit addition and subtraction, place value, and story problems
- Telling time, counting coins, and skip counting
- Word search, maze, rhymes, and word scramble
- Capybara science facts and coloring pages
- A certificate and an answer key for parents and teachers

**Keywords (7):** capybara activity book · 2nd grade workbook · grade 2 math and reading · capybara coloring book for kids · summer bridge activities grade 2 · ages 7-8 activity book · homeschool second grade
