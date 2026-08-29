// theme.ts — source unique de vérité (couleurs, easings, springs, specs).
import { Easing } from "remotion";

export const theme = {
  colors: {
    // Fond propre à la vidéo (frames 0-1000) — distinct du fond réel du site.
    bgVideo: "#0B0F14",
    // Fond réel du site (--color-ink), raccord visuel à partir de la frame 1000.
    bgSite: "#12100d",
    // Accent strict du site (--color-accent) — jamais modifié.
    accent: "#c9a227",
    accentSoft: "#e0c158",
    alert: "#EF4444",
    text: "#F8FAFC",
    source: "#64748B",
  },
  fonts: {
    display: "Fraunces",
    mono: "IBM Plex Mono",
  },
  ease: {
    out: Easing.bezier(0.16, 1, 0.3, 1),
    inOut: Easing.bezier(0.83, 0, 0.17, 1),
    in: Easing.bezier(0.7, 0, 0.84, 0),
  },
  spring: {
    snappy: { damping: 14, stiffness: 160, mass: 0.6 },
    smooth: { damping: 20, stiffness: 90, mass: 1 },
    bouncy: { damping: 11, stiffness: 170, mass: 0.7 },
  },
  specs: {
    compat: "iOS 13+ / Android 8+",
    protocole: "Bluetooth Low Energy 5.0",
    portee: "100 m",
    autonomie: "12 mois",
    etancheite: "IP54",
    url: "safety-gadgets.fr",
  },
} as const;
