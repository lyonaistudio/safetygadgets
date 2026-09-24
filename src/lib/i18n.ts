export type Locale = "fr" | "en" | "de";

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

// Pages traduites pour l'instant (voir mémoire projet) : accueil, produits,
// FAQ, à propos, contact. CGV/mentions légales et actualités restent
// uniquement en français — la navigation traduite ne les liste donc pas.
export const NAV_LINKS_BY_LOCALE: Record<Locale, { href: string; label: string }[]> = {
  fr: [
    { href: "/", label: "Accueil" },
    { href: "/traceurs-gps/", label: "Nos produits" },
    { href: "/actualites/", label: "Actualités" },
    { href: "/a-propos/", label: "À propos" },
    { href: "/faq/", label: "FAQ" },
    { href: "/professionnels/", label: "Professionnels" },
  ],
  en: [
    { href: "/en/", label: "Home" },
    { href: "/en/traceurs-gps/", label: "Products" },
    { href: "/en/a-propos/", label: "About" },
    { href: "/en/faq/", label: "FAQ" },
    { href: "/en/contact/", label: "Contact" },
  ],
  de: [
    { href: "/de/", label: "Startseite" },
    { href: "/de/traceurs-gps/", label: "Produkte" },
    { href: "/de/a-propos/", label: "Über uns" },
    { href: "/de/faq/", label: "FAQ" },
    { href: "/de/contact/", label: "Kontakt" },
  ],
};

export const UI = {
  fr: {
    skipToContent: "Aller au contenu",
    stockSav: "Stock en France · SAV en France",
    promoBar: "Offre de lancement −20 %",
    promoEndsIn: "fin dans",
    freeShipping: "Livraison offerte dès 49 € TTC d'achat",
    contactCta: "Nous contacter",
    cartAria: "Voir le panier",
    langAria: "Langue et région",
    comingSoon: "Bientôt",
    footerNav: "Navigation",
    footerContact: "Contact",
    footerShipping: ", France — expédition dans toute l'Europe",
    footerRights: "Tous droits réservés.",
    footerCgv: "CGV",
    footerLegal: "Mentions légales & confidentialité",
    seeFullFaq: "Voir toute la FAQ",
    addToCart: "Ajouter au panier",
    viewSheet: "Voir la fiche",
    faqEyebrow: "Questions fréquentes",
    siteDescription:
      "Safety Gadgets propose un tracker GPS pour véhicule et une alarme porte-clés SOS pour vos proches — deux produits testés et garantis un an.",
  },
  en: {
    skipToContent: "Skip to content",
    stockSav: "Stock in France · French customer service",
    promoBar: "Launch offer −20%",
    promoEndsIn: "ends in",
    freeShipping: "Free shipping from €49 incl. VAT",
    contactCta: "Contact us",
    cartAria: "View cart",
    langAria: "Language and region",
    comingSoon: "Coming soon",
    footerNav: "Navigation",
    footerContact: "Contact",
    footerShipping: ", France — shipping across Europe",
    footerRights: "All rights reserved.",
    footerCgv: "Terms of sale",
    footerLegal: "Legal notice & privacy",
    seeFullFaq: "See the full FAQ",
    addToCart: "Add to cart",
    viewSheet: "View product",
    faqEyebrow: "Frequently asked questions",
    siteDescription:
      "Safety Gadgets selects GPS trackers, Bluetooth trackers and compact, reliable anti-spy detectors, to locate what matters and spot what's watching you.",
  },
  de: {
    skipToContent: "Zum Inhalt springen",
    stockSav: "Lager in Frankreich · Kundenservice in Frankreich",
    promoBar: "Einführungsangebot −20 %",
    promoEndsIn: "endet in",
    freeShipping: "Kostenloser Versand ab 49 € inkl. MwSt.",
    contactCta: "Kontakt aufnehmen",
    cartAria: "Warenkorb ansehen",
    langAria: "Sprache und Region",
    comingSoon: "Demnächst",
    footerNav: "Navigation",
    footerContact: "Kontakt",
    footerShipping: ", Frankreich — Versand in ganz Europa",
    footerRights: "Alle Rechte vorbehalten.",
    footerCgv: "AGB",
    footerLegal: "Impressum & Datenschutz",
    seeFullFaq: "Vollständige FAQ ansehen",
    addToCart: "In den Warenkorb",
    viewSheet: "Produkt ansehen",
    faqEyebrow: "Häufig gestellte Fragen",
    siteDescription:
      "Safety Gadgets bietet GPS-Tracker, Bluetooth-Tracker und kompakte, zuverlässige Spionage-Detektoren, um zu orten, was zählt, und zu erkennen, was Sie überwacht.",
  },
} as const;

export interface SwitcherLinks {
  fr: string;
  en: string;
  de: string;
}

export const HOME_SWITCHER: SwitcherLinks = { fr: "/", en: "/en/", de: "/de/" };

export function productSwitcher(slug: string): SwitcherLinks {
  return {
    fr: `/traceurs-gps/${slug}/`,
    en: `/en/traceurs-gps/${slug}/`,
    de: `/de/traceurs-gps/${slug}/`,
  };
}

export const PAGE_SWITCHERS = {
  products: { fr: "/traceurs-gps/", en: "/en/traceurs-gps/", de: "/de/traceurs-gps/" } as SwitcherLinks,
  faq: { fr: "/faq/", en: "/en/faq/", de: "/de/faq/" } as SwitcherLinks,
  about: { fr: "/a-propos/", en: "/en/a-propos/", de: "/de/a-propos/" } as SwitcherLinks,
  contact: { fr: "/contact/", en: "/en/contact/", de: "/de/contact/" } as SwitcherLinks,
};
