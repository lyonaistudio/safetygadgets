// Bande-son v3 : énergie "bande-annonce" percutante — basse 808, hi-hats
// rapides, snare sur le contretemps — calée sur le nouveau montage 30s.
import { writeFileSync, mkdirSync } from "fs";

const SR = 44100;
const DUR = 45.7;
const BPM = 140;
const BEAT = 60 / BPM; // 0.4286s
const STEP = BEAT / 4; // pas de 16e de note

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

// Progression sombre, mouvement discret (vi-IV-V-vi), un accord par mesure (~1.7s)
const CHORDS = [
  [110, 130.81, 164.81], // Am
  [87.31, 110, 130.81], // F
  [98, 123.47, 146.83], // G
  [110, 130.81, 164.81], // Am
];
const BEATS_PER_CHORD = 4;

// Courbe d'énergie alignée sur le montage (secondes, version complétée) :
// 0-3.5 accroche | 3.5-7.17 clip de titres (pleine énergie) | 7.17-11.83
// stats | 11.83-18.83 vrai problème (creux, hold sur le split élargi,
// reprise sur "jamais") | 18.83-28.83 capacités (groove plein) | 28.83-33.83
// garanties (calme, lisible — liste défilée) | 33.83-38.5 timeline (reprise
// mesurée) | 38.5-41.83 promesse (presque nu) | 41.83-45.7 CTA (montée finale)
function energyAt(t) {
  const pts = [
    [0, 0.1],
    [3.0, 0.25],
    [3.5, 0.9],
    [7.0, 0.55],
    [11.6, 0.5],
    [11.83, 0.2],
    [14.9, 0.28],
    [15.4, 0.7],
    [16.0, 0.75],
    [18.6, 0.8],
    [19.0, 0.88],
    [28.6, 0.95],
    [28.83, 0.5],
    [33.6, 0.45],
    [33.83, 0.6],
    [38.3, 0.65],
    [38.5, 0.15],
    [41.5, 0.2],
    [41.83, 0.6],
    [45.0, 1.0],
    [45.7, 0],
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

const n = Math.floor(SR * DUR);
const out = new Float32Array(n);

// --- 808 : sub-bass avec glissando descendant caractéristique ---
// motif syncopé classique trap : temps 1, et le "and" du temps 3 (pas 10/16)
const KICK_STEPS = [0, 10];
const totalSteps = Math.floor(DUR / STEP);
for (let step = 0; step < totalSteps; step++) {
  const stepInBar = step % 16;
  if (!KICK_STEPS.includes(stepInBar)) continue;
  const t0 = step * STEP;
  const e = energyAt(t0);
  const chord = chordAt(t0);
  const root = chord[0] / 2;
  const startSample = Math.floor(t0 * SR);
  const durSamples = Math.floor(0.42 * SR);
  for (let i = 0; i < durSamples && startSample + i < n; i++) {
    const tRel = i / SR;
    const freq = root * Math.exp(-tRel * 9) + root * 0.55;
    const a = Math.exp(-tRel / 0.24) * (0.35 + e * 0.5);
    out[startSample + i] += Math.sin(2 * Math.PI * freq * tRel) * a;
  }
}

// --- Hi-hats : 16e de notes, densité pilotée par l'énergie, avec quelques rolls ---
for (let step = 0; step < totalSteps; step++) {
  const t0 = step * STEP;
  const e = energyAt(t0);
  const stepInBar = step % 16;
  // en énergie faible, ne garde que les 8e de notes (pas pairs)
  if (e < 0.4 && stepInBar % 2 !== 0) continue;
  if (e < 0.15) continue;
  const open = stepInBar === 6 || stepInBar === 14; // hat ouvert accent
  const startSample = Math.floor(t0 * SR);
  const durSamples = Math.floor((open ? 0.09 : 0.035) * SR);
  let hp = 0,
    prevNoise = 0;
  for (let i = 0; i < durSamples && startSample + i < n; i++) {
    const tRel = i / SR;
    const noise = Math.random() * 2 - 1;
    hp = noise - prevNoise + hp * 0.92; // filtre passe-haut simple
    prevNoise = noise;
    const a = Math.exp(-tRel / (open ? 0.035 : 0.012)) * (0.05 + e * 0.09);
    out[startSample + i] += hp * a;
  }
}

// --- Snare/clap sur le contretemps (pas 8 de chaque mesure de 16) ---
for (let step = 0; step < totalSteps; step++) {
  const stepInBar = step % 16;
  if (stepInBar !== 8) continue;
  const t0 = step * STEP;
  const e = energyAt(t0);
  if (e < 0.2) continue;
  const startSample = Math.floor(t0 * SR);
  const durSamples = Math.floor(0.13 * SR);
  let bp = 0;
  for (let i = 0; i < durSamples && startSample + i < n; i++) {
    const tRel = i / SR;
    const noise = Math.random() * 2 - 1;
    bp += (noise - bp) * 0.6;
    const tone = Math.sin(2 * Math.PI * 190 * tRel) * 0.3;
    const a = Math.exp(-tRel / 0.045) * (0.2 + e * 0.32);
    out[startSample + i] += (bp * 0.75 + tone) * a;
  }
}

// --- Nappe harmonique sombre, discrète, pour la glue ---
for (let i = 0; i < n; i++) {
  const t = i / SR;
  const chord = chordAt(t);
  const e = energyAt(t);
  let s = 0;
  for (const f of chord) {
    s += Math.sin(2 * Math.PI * f * t) * 0.035;
    s += Math.sin(2 * Math.PI * f * 1.004 * t) * 0.025;
  }
  out[i] += s * (0.25 + e * 0.35);
}

// --- Drone sub continu, poids cinématique ---
for (let i = 0; i < n; i++) {
  const t = i / SR;
  out[i] += Math.sin(2 * Math.PI * 41.2 * t) * 0.05 * (0.35 + energyAt(t) * 0.55);
}

// --- Riser bref juste avant les grandes transitions ---
const RISERS = [3.3, 15.2, 18.9, 41.7];
for (const th of RISERS) {
  const dur = 0.5;
  const startSample = Math.floor((th - dur) * SR);
  const durSamples = Math.floor(dur * SR);
  for (let i = 0; i < durSamples && startSample + i >= 0 && startSample + i < n; i++) {
    const tRel = i / SR;
    const freq = 700 + (tRel / dur) * 2600;
    const a = (tRel / dur) * 0.1;
    out[startSample + i] += Math.sin(2 * Math.PI * freq * tRel) * a;
  }
}

// Fondu global
const fadeIn = SR * 0.15;
const fadeOut = SR * 1.4;
for (let i = 0; i < fadeIn; i++) out[i] *= i / fadeIn;
for (let i = 0; i < fadeOut; i++) out[n - 1 - i] *= i / fadeOut;

mkdirSync(new URL("../public/music", import.meta.url), { recursive: true });
writeWav(new URL("../public/music/theme.wav", import.meta.url), out);
console.log(`Music v3 written: ${DUR}s to public/music/theme.wav`);
