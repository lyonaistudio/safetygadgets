export const SITE = {
  name: "Safety Gadgets",
  url: "https://safety-gadgets.fr",
  email: "contact@safety-gadgets.fr",
  city: "Lyon",
  region: "Auvergne-Rhône-Alpes",
  country: "FR",
  hours: "Lundi – Vendredi, 9h – 18h",
  hoursSchema: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: [] as string[],
  tagline: "Trackers et détecteurs compacts pour sécuriser ce qui compte vraiment.",
  description:
    "Safety Gadgets sélectionne et propose des trackers GPS, des trackers AirTag Bluetooth et des détecteurs anti-espionnage compacts et fiables, pour localiser ce qui compte et repérer ce qui vous surveille.",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/traceurs-gps/", label: "Nos produits" },
  { href: "/actualites/", label: "Actualités" },
  { href: "/a-propos/", label: "À propos" },
  { href: "/faq/", label: "FAQ" },
  { href: "/professionnels/", label: "Professionnels" },
] as const;

// Formulaire Formspree dédié à créer pour Safety Gadgets — ne pas réutiliser
// celui d'un autre projet/client. Placeholder à remplacer avant mise en ligne.
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_ME";
