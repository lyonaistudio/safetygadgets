// Bande-son captivante v2 : pulsation rythmique + groove qui construit
// l'énergie au fil de la vidéo, plutôt qu'un simple tapis d'ambiance statique.
import { writeFileSync, mkdirSync } from "fs";

const SR = 44100;
const DUR = 74;
const BPM = 100;
const BEAT = 60 / BPM; // 0.6s

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

// Progression avec mouvement (vi-IV-I-V relatif), 2 mesures par accord (~4.8s)
const CHORDS = [
  [110, 130.81, 164.81], // Am
  [87.31, 110, 130.81], // F
  [98, 123.47, 146.83], // G — variante non résolue, garde la tension
  [82.41, 98, 123.47], // Em
];
const BEATS_PER_CHORD = 8;

// Courbe d'énergie par section, alignée sur le montage de la vidéo (secondes)
// 0-5 intro sobre | 5-20 stats (pulse s'installe) | 20-26 drame (creux tendu)
// 26-32 pourquoi nous | 32-55 produits (groove plein, section la plus longue)
// 55-62 timeline (monte) | 62-67 promesse (respiration) | 67-72 CTA (montée finale)
function energyAt(t) {
  const pts = [
    [0, 0.15],
    [4.5, 0.35],
    [5, 0.55],
    [19, 0.6],
    [20, 0.32],
    [25.5, 0.4],
    [26, 0.6],
    [32, 0.62],
    [54, 0.85],
    [55, 0.78],
    [61, 0.95],
    [62, 0.22],
    [66.5, 0.3],
    [67, 0.55],
    [70.5, 1.0],
    [72.5, 0.9],
    [74, 0],
  ];
  for (let i = 0; i < pts.length - 1; i++) {
    const [t0, v0] = pts[i];
    const [t1, v1] = pts[i + 1];
    if (t >= t0 && t <= t1) {
      const f = (t - t0) / (t1 - t0);
      const s = f * f * (3 - 2 * f);
      return v0 + (v1 - v0) * s;
    }
  }
  return 0.5;
}

function chordAt(t) {
  const beatIdx = Math.floor(t / BEAT);
  const chordIdx = Math.floor(beatIdx / BEATS_PER_CHORD) % CHORDS.length;
  return CHORDS[chordIdx];
}

function env(tRel, attack, decay) {
  if (tRel < 0) return 0;
  if (tRel < attack) return tRel / attack;
  return Math.exp(-(tRel - attack) / decay);
}

const n = Math.floor(SR * DUR);
const out = new Float32Array(n);

// --- Couche 1 : pulsation basse (pluck tonal sur chaque temps) ---
for (let beat = 0; beat < DUR / BEAT; beat++) {
  const tBeat = beat * BEAT;
  const chord = chordAt(tBeat);
  const root = chord[0] / 2; // une octave plus bas
  const e = energyAt(tBeat);
  const startSample = Math.floor(tBeat * SR);
  const durSamples = Math.floor(0.32 * SR);
  for (let i = 0; i < durSamples && startSample + i < n; i++) {
    const tRel = i / SR;
    const a = env(tRel, 0.004, 0.14) * e * 0.5;
    const tone = Math.sin(2 * Math.PI * root * tRel) * 0.7 + Math.sin(2 * Math.PI * root * 2 * tRel) * 0.2;
    out[startSample + i] += tone * a;
  }
}

// --- Couche 2 : clic rythmique sur le contretemps (croche "et") ---
for (let beat = 0; beat < DUR / BEAT; beat++) {
  const tOff = beat * BEAT + BEAT / 2;
  const e = energyAt(tOff);
  if (e < 0.3) continue; // silence pendant les creux (intro, drame, promesse)
  const startSample = Math.floor(tOff * SR);
  const durSamples = Math.floor(0.05 * SR);
  let lp = 0;
  for (let i = 0; i < durSamples && startSample + i < n; i++) {
    const tRel = i / SR;
    const noise = Math.random() * 2 - 1;
    lp += (noise - lp) * 0.5;
    const a = Math.exp(-tRel / 0.012) * e * 0.16;
    out[startSample + i] += lp * a;
  }
}

// --- Couche 3 : nappe harmonique continue (glue, discrète) ---
for (let i = 0; i < n; i++) {
  const t = i / SR;
  const chord = chordAt(t);
  const e = energyAt(t);
  let s = 0;
  for (const f of chord) {
    s += Math.sin(2 * Math.PI * f * t) * 0.045;
    s += Math.sin(2 * Math.PI * f * 1.004 * t) * 0.03;
  }
  out[i] += s * (0.3 + e * 0.4);
}

// --- Couche 4 : shimmer/riser aux moments charnière du montage ---
const HITS = [5, 20, 26, 32, 55, 62, 67, 70.5];
for (const th of HITS) {
  const startSample = Math.floor((th - 0.35) * SR);
  const durSamples = Math.floor(0.9 * SR);
  for (let i = 0; i < durSamples && startSample + i >= 0 && startSample + i < n; i++) {
    const tRel = i / SR;
    const freq = 1600 + tRel * 2200;
    const a = Math.sin((Math.PI * tRel) / 0.9) * 0.09;
    const s = Math.sin(2 * Math.PI * freq * tRel) * 0.5 + Math.sin(2 * Math.PI * freq * 1.5 * tRel) * 0.3;
    out[startSample + i] += s * Math.max(0, a);
  }
}

// --- Couche 5 : drone sub continu, très bas, sensation de "poids" ---
for (let i = 0; i < n; i++) {
  const t = i / SR;
  out[i] += Math.sin(2 * Math.PI * 41.2 * t) * 0.06 * (0.4 + energyAt(t) * 0.6);
}

// Fondu global d'ouverture/fermeture
const fadeIn = SR * 1.0;
const fadeOut = SR * 2.0;
for (let i = 0; i < fadeIn; i++) out[i] *= i / fadeIn;
for (let i = 0; i < fadeOut; i++) out[n - 1 - i] *= i / fadeOut;

mkdirSync(new URL("../public/music", import.meta.url), { recursive: true });
writeWav(new URL("../public/music/theme.wav", import.meta.url), out);
console.log(`Music v2 written: ${DUR}s to public/music/theme.wav`);
