// Génère un tapis musical ambient (WAV 16-bit mono, déterministe, sans téléchargement)
// Ton : sobre, feutré, "quiet luxury" — pad grave détuné + pulsation discrète.
import { writeFileSync, mkdirSync } from "fs";

const SR = 44100;
const DUR = 74; // secondes — couvre la vidéo (71.7s) avec marge

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

// Progression grave, quatre accords, ~9s chacun, boucle deux fois
const CHORDS = [
  [110, 130.81, 164.81], // Am (A2, C3, E3)
  [82.41, 98, 123.47], // Em (E2, G2, B2)
  [110, 130.81, 164.81], // Am
  [73.42, 87.31, 110], // Dm (D2, F2, A2)
];
const CHORD_LEN = DUR / (CHORDS.length * 2 - 0.2); // ~9.1s/accord, 2 boucles

const n = Math.floor(SR * DUR);
const out = new Float32Array(n);

function chordAt(tSec) {
  const idx = Math.floor(tSec / CHORD_LEN) % CHORDS.length;
  const local = (tSec % CHORD_LEN) / CHORD_LEN;
  return { chord: CHORDS[idx], local };
}

for (let i = 0; i < n; i++) {
  const t = i / SR;
  let s = 0;

  // Drone grave constant (A1)
  s += Math.sin(2 * Math.PI * 55 * t) * 0.09;

  // Pad : accord courant, deux oscillateurs légèrement détunés par note,
  // enveloppe douce en début/fin de segment pour un fondu naturel.
  const { local } = chordAt(t);
  const fadeLen = 0.16; // fraction du segment en fade in/out
  let env = 1;
  if (local < fadeLen) env = local / fadeLen;
  else if (local > 1 - fadeLen) env = (1 - local) / fadeLen;
  env = env * env * (3 - 2 * env); // smoothstep

  const { chord } = chordAt(t);
  for (const f of chord) {
    s += Math.sin(2 * Math.PI * f * t) * 0.05 * env;
    s += Math.sin(2 * Math.PI * f * 1.003 * t) * 0.035 * env; // détune chorus
  }

  // Pulsation discrète toutes les ~2s (écho du point pulsant à l'écran)
  const pulsePeriod = 2.0;
  const pulsePhase = (t % pulsePeriod) / pulsePeriod;
  const pulseEnv = Math.exp(-pulsePhase * 9) * 0.05;
  s += Math.sin(2 * Math.PI * 60 * t) * pulseEnv;

  // Air : bruit très filtré, quasi imperceptible, pour la texture
  const noise = (Math.random() * 2 - 1) * 0.006;
  s += noise;

  // Léger crescendo global vers la fin (promesse / CTA)
  const swell = 1 + Math.max(0, (t - DUR * 0.85) / (DUR * 0.15)) * 0.25;

  out[i] = s * swell;
}

// Fade in/out global pour éviter tout clic aux bornes
const fadeSamples = SR * 1.2;
for (let i = 0; i < fadeSamples; i++) {
  const g = i / fadeSamples;
  out[i] *= g;
  out[n - 1 - i] *= g;
}

mkdirSync(new URL("../public/music", import.meta.url), { recursive: true });
writeWav(new URL("../public/music/theme.wav", import.meta.url), out);
console.log(`Music written: ${DUR}s to public/music/theme.wav`);
