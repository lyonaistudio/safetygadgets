# Préfixe les liens absolus (/page/) par le sous-dossier GitHub Pages
# (/safetygadgets/page/), tant que le site est servi sur
# lyonaistudio.github.io/safetygadgets au lieu de son propre domaine.
# Usage : python3 scripts/prefix-base.py dist /safetygadgets
import re, pathlib, sys
root = pathlib.Path(sys.argv[1]); B = sys.argv[2].rstrip("/")
def pre(u):
    return u if (u.startswith(B + "/") or u == B or u.startswith("//")) else B + u
attr = re.compile(r'((?:href|src|action|poster|data-src)=["\'])(/[^"\']*)')
srcset = re.compile(r'(srcset=["\'])([^"\']*)')
cssurl = re.compile(r'(url\(["\']?)(/[^)"\']*)')
n = 0
for p in root.rglob("*"):
    if p.suffix not in (".html", ".css", ".webmanifest"): continue
    t = p.read_text(); o = t
    t = attr.sub(lambda m: m.group(1) + pre(m.group(2)), t)
    t = srcset.sub(lambda m: m.group(1) + ", ".join((pre(x.strip()) if x.strip().startswith("/") else x.strip()) for x in m.group(2).split(",")), t)
    t = cssurl.sub(lambda m: m.group(1) + pre(m.group(2)), t)
    if p.suffix == ".webmanifest": t = re.sub(r'"(/[^"]*)"', lambda m: '"' + pre(m.group(1)) + '"', t)
    if t != o: p.write_text(t); n += 1
print("fichiers modifiés", n)
