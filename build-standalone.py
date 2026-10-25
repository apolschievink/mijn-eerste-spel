"""Rebuild the single-file copy after changing the game or its 3D view."""
from pathlib import Path
root = Path(__file__).resolve().parent
html = (root / 'index.html').read_text()
for source in ('vendor/three.min.js', 'game.js', 'world3d.js'):
    code = (root / source).read_text().replace('</script', '<\\/script')
    html = html.replace(f'<script src="{source}?v=3d-5"></script>', f'<script>\n{code}\n</script>')
(root / 'speel.html').write_text(html)
