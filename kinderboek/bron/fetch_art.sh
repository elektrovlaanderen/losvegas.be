#!/bin/sh
# Downloads the Higgsfield illustrations into art/ (line art gets a clean white background).
set -e
mkdir -p art
while read n url; do
  curl -sSf -o art/raw$n.png "$url"
  if [ "$n" -le 11 ]; then convert art/raw$n.png -colorspace gray -level 12%,88% -trim +repage -bordercolor white -border 24 art/$n.png; else cp art/raw$n.png art/$n.png; fi
done < "${1:-art_urls.txt}"
