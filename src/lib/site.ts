export const SITE = {
  name: "Safety Gadgets",
  url: "https://safety-gadgets.fr",
  email: "contact@safety-gadgets.com",
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
  tagline: "Un tracker GPS pour votre véhicule, une alarme SOS pour vos proches.",
  description:
    "Safety Gadgets propose un tracker GPS pour véhicule à installation instantanée et une alarme porte-clés SOS GPS pour vos proches — deux produits testés, garantis un an.",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/traceurs-gps/", label: "Nos produits" },
  { href: "/actualites/", label: "Actualités" },
  { href: "/a-propos/", label: "À propos" },
  { href: "/faq/", label: "FAQ" },
  { href: "/professionnels/", label: "Professionnels" },
] as const;

// Formulaire Formspree dédié à Safety Gadgets — ne pas réutiliser celui
// d'un autre projet/client.
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xoeqkppe";
