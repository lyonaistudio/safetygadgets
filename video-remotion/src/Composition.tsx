import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "./theme";

const { colors, ease, spring: springs, fonts, specs } = theme;

// ───────────────────────── helpers ─────────────────────────

function mixHex(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

function fmtInt(n: number) {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const Entrance: React.FC<{
  delay?: number;
  y?: number;
  scale?: number;
  config?: typeof springs.smooth;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ delay = 0, y = 36, scale = 0.94, config = springs.smooth, style, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config });
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [y, 0])}px) scale(${interpolate(
          p,
          [0, 1],
          [scale, 1]
        )})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const WordReveal: React.FC<{
  text: string;
  delay?: number;
  per?: number;
  emphasize?: string;
  emphasisColor?: string;
  style?: React.CSSProperties;
}> = ({ text, delay = 0, per = 3, emphasize, emphasisColor = colors.alert, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.28em", ...style }}>
      {text.split(" ").map((word, i) => {
        const p = spring({ frame: frame - delay - i * per, fps, config: springs.snappy });
        const isEmph = emphasize && word.replace(/[.,]/g, "") === emphasize.split(" ")[0];
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: p,
              color: isEmph ? emphasisColor : undefined,
              transform: `translateY(${interpolate(p, [0, 1], [30, 0])}px) scale(${interpolate(
                p,
                [0, 1],
                [isEmph ? 1.5 : 1, 1]
              )})`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

const Counter: React.FC<{
  target: number;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ target, delay = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 28, stiffness: 55, mass: 1 } });
  const value = interpolate(p, [0, 1], [0, target], { extrapolateRight: "clamp" });
  return <span style={{ fontVariantNumeric: "tabular-nums", ...style }}>{fmtInt(value)}</span>;
};

const SourceLabel: React.FC<{ children: React.ReactNode; delay?: number; style?: React.CSSProperties }> = ({
  children,
  delay = 0,
  style,
}) => (
  <Entrance delay={delay} y={10} scale={1} config={springs.snappy}>
    <div
      style={{
        fontFamily: fonts.mono,
        fontSize: 15,
        color: colors.source,
        letterSpacing: "0.01em",
        marginTop: 8,
        ...style,
      }}
    >
      <span style={{ opacity: 0.65, fontWeight: 600 }}>Source : </span>
      {children}
    </div>
  </Entrance>
);

const Hit: React.FC<{ frame: number; src: string; volume?: number }> = ({ frame, src, volume = 0.6 }) => (
  <Sequence from={Math.max(0, frame - 2)}>
    <Audio src={staticFile(`sfx/${src}`)} volume={volume} />
  </Sequence>
);

// Motif récurrent : point pulsant avec ondes concentriques, en accent.
// Purement dérivé de `frame` (modulo) — déterministe, pas d'état/random.
const PulseDot: React.FC<{ size?: number; rings?: number; calm?: boolean }> = ({ size = 90, rings = 3, calm = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const coreP = spring({ frame, fps, config: springs.snappy });
  const period = 46;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {!calm &&
        Array.from({ length: rings }).map((_, i) => {
          const local = ((frame - i * (period / rings)) % period + period) % period;
          const p = local / period;
          const d = size * p;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: d,
                height: d,
                marginLeft: -d / 2,
                marginTop: -d / 2,
                borderRadius: "50%",
                border: `1px solid ${colors.accent}`,
                opacity: interpolate(p, [0, 0.15, 1], [0, 0.55, 0]),
              }}
            />
          );
        })}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 12,
          height: 12,
          marginLeft: -6,
          marginTop: -6,
          borderRadius: "50%",
          background: colors.accent,
          opacity: coreP,
          boxShadow: `0 0 ${calm ? 10 : 18}px 2px ${colors.accent}88`,
          transform: `scale(${interpolate(coreP, [0, 1], [0.5, 1])})`,
        }}
      />
    </div>
  );
};

const Eyebrow: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <Entrance delay={delay} y={14} scale={1} config={springs.snappy}>
    <div
      style={{
        fontFamily: fonts.mono,
        fontSize: 17,
        letterSpacing: "0.16em",
        color: colors.accent,
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  </Entrance>
);

// ───────────────────────── layers ─────────────────────────
// Blur radii kept modest (CPU-bound software rendering — no GPU compositing).

const BgMesh: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const bgStart = durationInFrames - 100;
  const bg = interpolate(frame, [bgStart, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bgColor = mixHex(colors.bgVideo, colors.bgSite, bg);
  const d1x = Math.sin(frame / 58) * 60;
  const d1y = Math.cos(frame / 70) * 40;
  const d2x = Math.cos(frame / 66) * 50;
  return (
    <AbsoluteFill style={{ background: bgColor }}>
      <div
        style={{
          position: "absolute",
          width: 1300,
          height: 1300,
          borderRadius: "50%",
          top: -520,
          right: -420 + d1x,
          transform: `translateY(${d1y}px)`,
          filter: "blur(55px)",
          background: `radial-gradient(circle, ${colors.accent}22, transparent 62%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          bottom: -380,
          left: -280 + d2x,
          filter: "blur(50px)",
          background: `radial-gradient(circle, ${colors.accentSoft}18, transparent 65%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage: `linear-gradient(${colors.text}88 1px, transparent 1px), linear-gradient(90deg, ${colors.text}88 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(frame, [durationInFrames - 130, durationInFrames], [0, 0.25], {
            extrapolateLeft: "clamp",
          }),
          background: `radial-gradient(ellipse 60% 50% at 50% 60%, ${colors.accent}22, transparent 70%)`,
        }}
      />
    </AbsoluteFill>
  );
};

const Grade: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <AbsoluteFill style={{ backgroundColor: colors.accent, mixBlendMode: "soft-light", opacity: 0.16 }} />
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.22), transparent 26%, transparent 74%, rgba(0,0,0,0.3))",
      }}
    />
  </AbsoluteFill>
);

const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const noise = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        backgroundImage: noise,
        backgroundSize: "220px",
        backgroundPosition: `${(frame * 7) % 220}px ${(frame * 13) % 220}px`,
        opacity: 0.045,
        mixBlendMode: "overlay",
      }}
    />
  );
};

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.3) 100%)",
    }}
  />
);

// Filigrane discret présent sur tout le montage, pour ancrer la marque
// sans répéter le grand logo de la scène finale.
const LogoWatermark: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const ctaStart = durationInFrames - 115; // début de la scène CTA (grand logo)
  const fadeOutStart = ctaStart - 15;
  const o = interpolate(frame, [10, 26, fadeOutStart, fadeOutStart + 15], [0, 0.5, 0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 44,
        bottom: 40,
        width: 70,
        opacity: o,
        mixBlendMode: "screen",
      }}
    >
      <Img src={staticFile("logo.png")} style={{ width: "100%" }} />
    </div>
  );
};

// ───────────────────────── scene 1 — le problème (0-105) ─────────────────────────

const Scene1_Probleme: React.FC<{ duration: number }> = ({ duration: n }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = interpolate(frame, [0, 30], [0, 1], { easing: ease.out, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bagP = spring({ frame, fps, config: springs.smooth });
  const bagGoneO = interpolate(frame, [42, 54], [1, 0], { easing: ease.in, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bagGoneScale = interpolate(frame, [42, 54], [1, 0.75], { easing: ease.in, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitO = interpolate(frame, [n - 10, n - 2], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitY = interpolate(frame, [n - 10, n - 2], [0, -30], { easing: ease.in, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: exitO, transform: `translateY(${exitY}px)` }}>
      <Hit frame={0} src="whoosh.wav" />
      <Hit frame={44} src="thump.wav" volume={0.5} />
      <svg width={900} height={260} viewBox="0 0 900 260" style={{ position: "absolute", top: 100 }}>
        <rect
          x={40}
          y={40}
          width={820}
          height={140}
          rx={26}
          fill="none"
          stroke={colors.text}
          strokeOpacity={0.35}
          strokeWidth={2}
          strokeDasharray={2000}
          strokeDashoffset={2000 * (1 - draw)}
        />
        <line x1={200} y1={40} x2={200} y2={180} stroke={colors.text} strokeOpacity={0.2} strokeWidth={1.5} strokeDasharray={200} strokeDashoffset={200 * (1 - draw)} />
        <line x1={700} y1={40} x2={700} y2={180} stroke={colors.text} strokeOpacity={0.2} strokeWidth={1.5} strokeDasharray={200} strokeDashoffset={200 * (1 - draw)} />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 160,
          transform: `scale(${interpolate(bagP, [0, 1], [0.7, 1]) * bagGoneScale})`,
          opacity: bagP * bagGoneO,
        }}
      >
        <svg width={90} height={140} viewBox="0 0 90 140">
          <circle cx={45} cy={40} r={16} fill="none" stroke={colors.text} strokeWidth={2.5} />
          <rect x={20} y={55} width={50} height={70} rx={10} fill="none" stroke={colors.text} strokeWidth={2.5} />
          <path d="M 30 130 L 45 55 L 60 130" fill="none" stroke={colors.accent} strokeWidth={2.5} />
        </svg>
      </div>
      <div style={{ position: "absolute", top: 420, textAlign: "center", width: 1400 }}>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 52,
            color: colors.text,
            opacity: interpolate(frame, [56, 72], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          En France, un vol toutes les
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontSize: 128,
            color: colors.alert,
            letterSpacing: "-0.02em",
            marginTop: 8,
            transform: `scale(${spring({ frame: frame - 64, fps, config: springs.bouncy })})`,
            textShadow: `0 0 60px ${colors.alert}55`,
          }}
        >
          50 SECONDES
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ───────────────────────── scene 2 — l'ampleur (105-255), stats regroupées ─────────────────────────

const STATS = [
  { value: 622800, label: "sacs, portefeuilles, objets personnels", source: "Ministère de l'Intérieur, SSMSI 2025" },
  { value: 125200, label: "véhicules", source: "Ministère de l'Intérieur, SSMSI 2025" },
  { value: 400000, label: "vélos", source: "Académie des Mobilités Actives" },
];

// Montage rapide façon "clip" : de courts titres-chocs originaux (pas des
// captures d'articles réels — question de droits — ni des faux imités avec
// une fausse source, ce qui serait trompeur) qui s'enchaînent avant de se
// poser sur les statistiques. Chaque titre porte une vraie source — les
// mêmes déjà citées ailleurs dans la vidéo — affichée en petit dessous.
const HEADLINES: { text: string; source?: string }[] = [
  { text: "UN SAC ARRACHÉ EN PLEINE RUE", source: "Ministère de l'Intérieur, SSMSI 2025" },
  { text: "UNE VOITURE DISPARUE EN QUELQUES MINUTES", source: "Ministère de l'Intérieur, SSMSI 2025" },
  { text: "UN VÉLO VOLÉ DEVANT CHEZ LUI", source: "Académie des Mobilités Actives" },
  { text: "UN TÉLÉPHONE SUBTILISÉ DANS LA FOULE", source: "Ministère de l'Intérieur, SSMSI 2025" },
  { text: "PARTI EN UNE SECONDE." },
];
const HEADLINE_FRAMES = 22;

const HeadlineMontage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const idx = Math.min(HEADLINES.length - 1, Math.floor(frame / HEADLINE_FRAMES));
  const local = frame - idx * HEADLINE_FRAMES;
  const p = spring({ frame: local, fps, config: springs.snappy });
  const exitLocal = interpolate(local, [HEADLINE_FRAMES - 4, HEADLINE_FRAMES], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sourceP = spring({ frame: local - 4, fps, config: springs.snappy });
  const current = HEADLINES[idx];
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Hit frame={idx * HEADLINE_FRAMES} src="tick.wav" volume={0.32} />
      <div style={{ textAlign: "center", width: 1550 }}>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 56,
            color: colors.text,
            letterSpacing: "-0.01em",
            opacity: p * exitLocal,
            transform: `scale(${interpolate(p, [0, 1], [0.88, 1])})`,
          }}
        >
          {current.text}
        </div>
        {current.source && (
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 15,
              color: colors.source,
              marginTop: 10,
              opacity: sourceP * exitLocal,
            }}
          >
            <span style={{ opacity: 0.65, fontWeight: 600 }}>Source : </span>
            {current.source}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

const StatsGrid: React.FC<{ duration: number }> = ({ duration: n }) => {
  const frame = useCurrentFrame();
  const exitO = interpolate(frame, [n - 12, n - 2], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: exitO }}>
      <Eyebrow delay={0}>Chaque année, en France</Eyebrow>
      <div style={{ display: "flex", gap: 90, marginTop: 40 }}>
        {STATS.map((s, i) => (
          <Entrance key={i} delay={18 + i * 16} y={40}>
            <div style={{ textAlign: "center", width: 380 }}>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 800,
                  fontSize: 92,
                  color: i === 0 ? colors.accent : colors.text,
                  letterSpacing: "-0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                <Counter target={s.value} delay={18 + i * 16 + 6} />
              </div>
              <div style={{ fontFamily: fonts.mono, fontSize: 19, color: colors.text, opacity: 0.85, marginTop: 8 }}>{s.label}</div>
              <SourceLabel delay={18 + i * 16 + 20}>{s.source}</SourceLabel>
            </div>
          </Entrance>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Scene2_Ampleur: React.FC = () => {
  const montageLen = HEADLINES.length * HEADLINE_FRAMES;
  const statsLen = 140;
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={montageLen}>
        <HeadlineMontage />
      </Sequence>
      <Sequence from={montageLen} durationInFrames={statsLen}>
        <StatsGrid duration={statsLen} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ───────────────────────── scene 3 — le vrai problème (255-385) ─────────────────────────

const Scene3_Drame: React.FC<{ duration: number }> = ({ duration: n }) => {
  const frame = useCurrentFrame();
  const splitO = interpolate(frame, [90, 107], [1, 0], { easing: ease.in, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const splitShiftL = interpolate(frame, [90, 107], [0, -80], { easing: ease.in, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const splitShiftR = interpolate(frame, [90, 107], [0, 80], { easing: ease.in, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitO = interpolate(frame, [n - 10, n - 2], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: exitO }}>
      <div style={{ position: "absolute", inset: 0, opacity: splitO }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "50%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `translateX(${splitShiftL}px)`,
          }}
        >
          <Entrance delay={8} y={40}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 120, color: colors.text }}>
                <Counter target={40} delay={16} />%
              </div>
              <div style={{ fontFamily: fonts.mono, fontSize: 19, color: colors.source, marginTop: 8 }}>des véhicules retrouvés</div>
              <SourceLabel delay={28}>Argos, France Assureurs</SourceLabel>
            </div>
          </Entrance>
        </div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "18%",
            width: 1.5,
            height: "64%",
            background: `linear-gradient(180deg, transparent, ${colors.accent}66, transparent)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "50%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `translateX(${splitShiftR}px)`,
          }}
        >
          <Entrance delay={28} y={40}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 120, color: colors.text }}>
                <Counter target={7} delay={34} />%
              </div>
              <div style={{ fontFamily: fonts.mono, fontSize: 19, color: colors.source, marginTop: 8 }}>des vélos</div>
              <SourceLabel delay={48}>FUB (Fédération française des usagers de la bicyclette)</SourceLabel>
            </div>
          </Entrance>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: interpolate(frame, [102, 124], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ width: 1400, textAlign: "center" }}>
          <WordReveal
            text="Le problème n'est pas le vol."
            delay={105}
            per={3}
            style={{ justifyContent: "center", fontFamily: fonts.display, fontWeight: 600, fontSize: 44, color: colors.source }}
          />
          <div style={{ height: 14 }} />
          <WordReveal
            text="C'est de ne jamais savoir où."
            delay={124}
            per={3}
            emphasize="jamais"
            emphasisColor={colors.accent}
            style={{ justifyContent: "center", fontFamily: fonts.display, fontWeight: 700, fontSize: 52, color: colors.text }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ───────────────────────── scene 4 — ce que vous pouvez faire (385-685) ─────────────────────────
// Capacités génériques plutôt que des produits nommés un à un : le montage
// reste valable même si le catalogue évolue, sans jamais avoir besoin d'être
// remonté à chaque nouveau produit.

const CAPABILITIES = [
  { title: "Localiser", desc: "une voiture, une moto ou un proche en temps réel", icon: "pin" },
  { title: "Retrouver", desc: "un objet égaré, où qu'il soit dans le monde", icon: "tag" },
  { title: "Détecter", desc: "ce qui vous surveille dans un lieu ou un véhicule", icon: "scan" },
  { title: "Alerter", desc: "vos proches en un geste, en cas d'urgence", icon: "bell" },
];

const CapIcon: React.FC<{ kind: string }> = ({ kind }) => {
  const s = { stroke: colors.accent, strokeWidth: 2.2, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "pin")
    return (
      <svg width={46} height={46} viewBox="0 0 46 46">
        <path d="M23 6 C15 6 9 12 9 20 C9 29 23 40 23 40 C23 40 37 29 37 20 C37 12 31 6 23 6 Z" {...s} />
        <circle cx={23} cy={20} r={6} {...s} />
      </svg>
    );
  if (kind === "tag")
    return (
      <svg width={46} height={46} viewBox="0 0 46 46">
        <path d="M8 8 H24 L38 22 L24 36 L8 20 Z" {...s} />
        <circle cx={16} cy={16} r={3} {...s} />
      </svg>
    );
  if (kind === "scan")
    return (
      <svg width={46} height={46} viewBox="0 0 46 46">
        <circle cx={20} cy={20} r={12} {...s} />
        <path d="M29 29 L39 39" {...s} />
        <path d="M20 13 A7 7 0 0 1 27 20" {...s} />
      </svg>
    );
  return (
    <svg width={46} height={46} viewBox="0 0 46 46">
      <path d="M23 8 C17 8 14 13 14 19 V25 L9 32 H37 L32 25 V19 C32 13 29 8 23 8 Z" {...s} />
      <path d="M19 32 A4 4 0 0 0 27 32" {...s} />
    </svg>
  );
};

const Scene4_Capacites: React.FC<{ duration: number }> = ({ duration: n }) => {
  const frame = useCurrentFrame();
  const exitO = interpolate(frame, [n - 12, n - 2], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: exitO }}>
      <Hit frame={0} src="click.wav" volume={0.35} />
      <div style={{ textAlign: "center", marginBottom: 54 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
          <PulseDot size={64} rings={3} />
        </div>
        <Eyebrow delay={0}>Avec Safety Gadgets</Eyebrow>
        <Entrance delay={12} y={20}>
          <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 40, color: colors.text, marginTop: 16 }}>
            Vous pouvez :
          </div>
        </Entrance>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 34, width: 1300 }}>
        {CAPABILITIES.map((c, i) => (
          <Entrance key={i} delay={30 + i * 12} y={26}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 22,
                border: `1px solid ${colors.text}18`,
                borderRadius: 20,
                padding: "26px 30px",
                background: `linear-gradient(180deg, ${colors.text}0c, transparent)`,
              }}
            >
              <CapIcon kind={c.icon} />
              <div>
                <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 26, color: colors.text }}>{c.title}</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 16, color: colors.source, marginTop: 4, lineHeight: 1.4 }}>{c.desc}</div>
              </div>
            </div>
          </Entrance>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ───────────────────────── scene 5 — la preuve technique (garanties) ─────────────────────────
// Adapté du brief original : plutôt qu'une fiche technique d'un seul produit
// (Bluetooth/GSM diffèrent selon le tracker), on montre les engagements
// valables sur toute la gamme — vrais, vérifiables, jamais à ré-écrire si
// le catalogue change.

const GUARANTEES: { label: string; value: string }[] = [
  { label: "GARANTIE", value: "1 an, pièces et main-d'œuvre" },
  { label: "EXPÉDITION", value: "24 à 48h ouvrées" },
  { label: "RETOUR", value: "30 jours, sans justification" },
  { label: "PAIEMENT", value: "sécurisé, en ligne" },
  { label: "SUPPORT", value: "réponse personnelle, pas de standard téléphonique" },
];

const Scene5_Garanties: React.FC<{ duration: number }> = ({ duration: n }) => {
  const frame = useCurrentFrame();
  const exitO = interpolate(frame, [n - 12, n - 2], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: exitO }}>
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <Eyebrow delay={0}>Notre engagement</Eyebrow>
        <Entrance delay={12} y={20}>
          <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 38, color: colors.text, marginTop: 16 }}>
            Ce qui ne change jamais.
          </div>
        </Entrance>
      </div>
      <div style={{ width: 760 }}>
        {GUARANTEES.map((g, i) => (
          <Entrance key={i} delay={30 + i * 16} y={16}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 24,
                borderBottom: `1px solid ${colors.text}18`,
                padding: "14px 0",
                fontFamily: fonts.mono,
              }}
            >
              <span style={{ fontSize: 15, letterSpacing: "0.08em", color: colors.accent, whiteSpace: "nowrap" }}>{g.label}</span>
              <span style={{ fontSize: 17, color: colors.text, textAlign: "right" }}>{g.value}</span>
            </div>
          </Entrance>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ───────────────────────── scene 6 — ce que ça change (timeline) ─────────────────────────
// Les 3 jalons décrivent le fonctionnement du produit (aucune source requise).
// La seule statistique tierce affichée est vérifiée et sourcée (Argos, via
// France Assureurs) — pas la citation non vérifiable du brief d'origine.

const TIMELINE: { label: string; desc: string }[] = [
  { label: "Alerte immédiate", desc: "Notification dès qu'un mouvement est détecté" },
  { label: "Position en temps réel", desc: "Localisation transmise en quelques secondes" },
  { label: "Historique complet", desc: "Trajet consultable à tout moment dans l'app" },
];

const Scene6_Timeline: React.FC<{ duration: number }> = ({ duration: n }) => {
  const frame = useCurrentFrame();
  const exitO = interpolate(frame, [n - 12, n - 2], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: exitO }}>
      <Eyebrow delay={0}>Pourquoi c'est important</Eyebrow>
      <Entrance delay={12} y={20}>
        <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 38, color: colors.text, marginTop: 16, textAlign: "center" }}>
          Plus tôt on sait, mieux on retrouve.
        </div>
      </Entrance>
      <div style={{ display: "flex", alignItems: "flex-start", marginTop: 56, width: 1300, position: "relative" }}>
        <div style={{ position: "absolute", top: 17, left: 90, right: 90, height: 1, background: `${colors.text}22` }} />
        {TIMELINE.map((m, i) => (
          <Entrance key={i} delay={26 + i * 14} y={20} style={{ flex: 1, textAlign: "center" }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                border: `1px solid ${colors.accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                background: colors.bgVideo,
                fontFamily: fonts.mono,
                fontSize: 14,
                color: colors.accent,
              }}
            >
              {i + 1}
            </div>
            <div style={{ marginTop: 18, fontFamily: fonts.display, fontWeight: 700, fontSize: 21, color: colors.text }}>{m.label}</div>
            <div style={{ marginTop: 6, fontFamily: fonts.mono, fontSize: 14, color: colors.source, lineHeight: 1.4, maxWidth: 300, marginLeft: "auto", marginRight: "auto" }}>
              {m.desc}
            </div>
          </Entrance>
        ))}
      </div>
      <div style={{ marginTop: 48, textAlign: "center" }}>
        <Entrance delay={80} y={16}>
          <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 24, color: colors.accentSoft }}>
            30 % des véhicules volés sont retrouvés en moins d'une semaine.
          </div>
        </Entrance>
        <SourceLabel delay={92}>Argos, France Assureurs</SourceLabel>
      </div>
    </AbsoluteFill>
  );
};

// ───────────────────────── scene 7 — la promesse ─────────────────────────

const Scene7_Promesse: React.FC = () => {
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", width: 1300 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <PulseDot size={40} calm />
        </div>
        <Entrance delay={12} y={26}>
          <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 40, color: colors.text }}>
            Il est important de prendre soin de ce que l'on aime.
          </div>
        </Entrance>
        <Entrance delay={44} y={26}>
          <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 40, color: colors.accentSoft, marginTop: 20 }}>
            Ce qui compte pour vous ne devrait jamais disparaître.
          </div>
        </Entrance>
      </div>
    </AbsoluteFill>
  );
};

// ───────────────────────── scene 8 — CTA ─────────────────────────

const Scene8_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoP = spring({ frame, fps, config: springs.bouncy });
  const textO = interpolate(frame, [28, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Hit frame={0} src="shimmer.wav" volume={0.5} />
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          filter: "blur(70px)",
          background: `radial-gradient(circle, ${colors.accent}33, transparent 65%)`,
          opacity: logoP,
        }}
      />
      <Img
        src={staticFile("logo.png")}
        style={{
          width: "30%",
          opacity: logoP,
          transform: `scale(${interpolate(logoP, [0, 1], [0.7, 1])})`,
          mixBlendMode: "screen",
        }}
      />
      <div style={{ position: "absolute", top: 700, textAlign: "center", opacity: textO }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 28, color: colors.text }}>Ne perdez plus ce qui compte.</div>
        <div style={{ fontFamily: fonts.mono, fontSize: 18, color: colors.accent, marginTop: 10 }}>{specs.url}</div>
      </div>
    </AbsoluteFill>
  );
};

// ───────────────────────── main ─────────────────────────

export const Main: React.FC = () => {
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Audio
        src={staticFile("music/theme.wav")}
        volume={(f) =>
          interpolate(f, [0, 30, durationInFrames - 60, durationInFrames - 6], [0, 0.5, 0.5, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      <BgMesh />
      <Sequence from={0} durationInFrames={105}>
        <Scene1_Probleme duration={105} />
      </Sequence>
      <Sequence from={105} durationInFrames={250}>
        <Scene2_Ampleur />
      </Sequence>
      <Sequence from={355} durationInFrames={210}>
        <Scene3_Drame duration={210} />
      </Sequence>
      <Sequence from={565} durationInFrames={300}>
        <Scene4_Capacites duration={300} />
      </Sequence>
      <Sequence from={865} durationInFrames={150}>
        <Scene5_Garanties duration={150} />
      </Sequence>
      <Sequence from={1015} durationInFrames={140}>
        <Scene6_Timeline duration={140} />
      </Sequence>
      <Sequence from={1155} durationInFrames={100}>
        <Scene7_Promesse />
      </Sequence>
      <Sequence from={1255} durationInFrames={115}>
        <Scene8_CTA />
      </Sequence>
      <LogoWatermark />
      <Grade />
      <Grain />
      <Vignette />
    </AbsoluteFill>
  );
};
