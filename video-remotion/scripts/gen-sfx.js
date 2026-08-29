// Génère un kit SFX minimal en WAV 16-bit mono, déterministe, sans téléchargement.
import { writeFileSync } from "fs";
import { mkdirSync } from "fs";

const SR = 44100;

function writeWav(path, samples) {
  const n = samples.length;
  const buf = Buffer.alloc(44 + n * 2);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + n * 2, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    buf.writeInt16LE(Math.round(s * 32767), 44 + i * 2);
  }
  writeFileSync(path, buf);
}

function envelope(i, n, attack, release) {
  const a = attack * n, r = release * n;
  if (i < a) return i / a;
  if (i > n - r) return Math.max(0, (n - i) / r);
  return 1;
}

// Whoosh : bruit filtré passe-bande balayé, pour les entrées de texte
function whoosh(dur = 0.35) {
  const n = Math.floor(SR * dur);
  const out = new Float32Array(n);
  let lp = 0;
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const noise = Math.random() * 2 - 1;
    const cutoff = 0.02 + t * 0.35;
    lp += (noise - lp) * cutoff;
    out[i] = lp * envelope(i, n, 0.12, 0.75) * 0.55;
  }
  return out;
}

// Click : impulsion courte pour les hits / stagger
function click(dur = 0.045) {
  const n = Math.floor(SR * dur);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const tone = Math.sin(2 * Math.PI * 1800 * t) * Math.exp(-t * 40);
    out[i] = tone * 0.6;
  }
  return out;
}

// Thump : sinus grave descendant, pour les cuts / bass hit
function thump(dur = 0.4) {
  const n = Math.floor(SR * dur);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const freq = 130 * Math.exp(-t * 4.5) + 45;
    const phase = 2 * Math.PI * freq * t;
    out[i] = Math.sin(phase) * Math.exp(-t * 5.5) * 0.85;
  }
  return out;
}

// Tick : léger, pour les compteurs qui défilent
function tick(dur = 0.02) {
  const n = Math.floor(SR * dur);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / n;
    out[i] = Math.sin(2 * Math.PI * 2600 * t) * Math.exp(-t * 60) * 0.35;
  }
  return out;
}

// Shimmer : petite montée haute fréquence, pour la promesse finale / logo
function shimmer(dur = 0.9) {
  const n = Math.floor(SR * dur);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const freq = 1800 + t * 900;
    const s =
      Math.sin(2 * Math.PI * freq * t) * 0.5 +
      Math.sin(2 * Math.PI * freq * 1.5 * t) * 0.3;
    out[i] = s * envelope(i, n, 0.35, 0.55) * 0.22;
  }
  return out;
}

mkdirSync(new URL("../public/sfx", import.meta.url), { recursive: true });
const dir = new URL("../public/sfx/", import.meta.url);
writeWav(new URL("whoosh.wav", dir), whoosh());
writeWav(new URL("click.wav", dir), click());
writeWav(new URL("thump.wav", dir), thump());
writeWav(new URL("tick.wav", dir), tick());
writeWav(new URL("shimmer.wav", dir), shimmer());
console.log("SFX kit written to public/sfx/");
