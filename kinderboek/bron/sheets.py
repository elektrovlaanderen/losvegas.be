# Contact sheets of the rendered pages + a JPEG of the cover, for review in Higgsfield.
from PIL import Image
import glob
fs = sorted(glob.glob('png/p*.png'))
for k, (a, b, cols) in enumerate([(0, 12, 4), (12, 26, 5)]):
    ims = [Image.open(f).convert('RGB').resize((408, 528)) for f in fs[a:b]]
    rows = -(-len(ims) // cols)
    sh = Image.new('RGB', (cols * 420, rows * 540), '#888')
    for i, im in enumerate(ims):
        sh.paste(im, ((i % cols) * 420 + 6, (i // cols) * 540 + 6))
    sh.save(f's{k + 1}.jpg', quality=88)
Image.open('cover.png').convert('RGB').save('cov.jpg', quality=88)
