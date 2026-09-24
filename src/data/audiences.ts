// Pages d'atterrissage par public (SEO + publicité ciblée) et page cadeaux.
// Chaque argument s'appuie sur des fonctions réelles des produits.
export interface Audience {
  slug: string;
  path: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  products: string[]; // slugs, dans l'ordre de recommandation
  benefits: { title: string; body: string }[];
  scenarios: { title: string; body: string }[];
  faq: { question: string; answer: string }[];
}

export const AUDIENCES: Audience[] = [
  {
    slug: "idees-cadeaux",
    path: "/idees-cadeaux/",
    navLabel: "Idées cadeaux",
    metaTitle: "Idées cadeaux sécurité : offrir la tranquillité — Safety Gadgets",
    metaDescription: "Une alarme SOS pour une mère, une fille ou un grand-parent, un tracker GPS pour un jeune conducteur : des cadeaux utiles, avec message personnalisé glissé dans le colis.",
    eyebrow: "Offrir la sécurité",
    title: "Le cadeau qui dit « je tiens à toi »",
    intro: "Un cadeau utile au quotidien, pour les personnes qui comptent. Ajoutez un message personnalisé au moment du paiement : nous le glissons dans le colis.",
    products: ["alarme-sos", "obd"],
    benefits: [
      { title: "Message cadeau offert", body: "Saisissez votre mot au moment du paiement, il est glissé dans le colis." },
      { title: "Livraison offerte dès 49 €", body: "Offrez l'alarme et le tracker ensemble : la livraison est offerte." },
      { title: "Retour sous 30 jours", body: "Le produit ne convient pas ? Retour possible sous 30 jours, produit non utilisé." },
    ],
    scenarios: [
      { title: "Pour une mère ou une fille", body: "L'alarme porte-clés SOS se glisse sur un trousseau : une pression déclenche une sirène de 130 dB et prévient les proches avec la position GPS." },
      { title: "Pour un parent ou grand-parent", body: "Un bouton simple, sans complication, pour alerter la famille en cas de chute ou de malaise." },
      { title: "Pour un jeune conducteur", body: "Le tracker OBD se branche en 3 secondes : vous savez où est la voiture et êtes alerté en cas d'excès de vitesse." },
      { title: "Pour toute la famille", body: "L'alarme pour la personne, le tracker pour la voiture : la protection complète, livraison offerte." },
    ],
    faq: [
      { question: "Puis-je ajouter un message cadeau ?", answer: "Oui, un champ « Message cadeau » est proposé au moment du paiement. Nous glissons votre message dans le colis." },
      { question: "Et si le cadeau ne convient pas ?", answer: "Le retour est possible sous 30 jours, produit non utilisé et dans son emballage d'origine." },
    ],
  },
  {
    slug: "seniors",
    path: "/solutions/seniors/",
    navLabel: "Seniors",
    metaTitle: "Alarme SOS pour personne âgée : alerter ses proches d'une pression — Safety Gadgets",
    metaDescription: "Bouton d'urgence pour senior : sirène 130 dB, alerte SMS et appel aux proches avec la position GPS. Simple, léger, sur un porte-clés.",
    eyebrow: "Seniors",
    title: "Rester autonome, sans jamais être seul",
    intro: "Un bouton d'urgence simple, qui tient sur un porte-clés : d'une pression, vos proches sont prévenus avec votre position.",
    products: ["alarme-sos"],
    benefits: [
      { title: "Un seul bouton", body: "Pas de menu compliqué : une pression sur le bouton SOS suffit." },
      { title: "Les proches prévenus", body: "Alerte SMS et appel automatique aux contacts d'urgence, avec la position GPS." },
      { title: "Léger et discret", body: "26 grammes, à accrocher à un trousseau, un sac ou une ceinture." },
    ],
    scenarios: [
      { title: "Une chute à la maison", body: "Le bouton est à portée de main : un appui suffit pour prévenir la famille." },
      { title: "Une balade ou des courses", body: "En cas de malaise dehors, la sirène attire l'attention et les proches reçoivent la position." },
      { title: "Des enfants qui habitent loin", body: "Ils savent qu'un simple geste suffit pour être prévenus. Tout le monde est rassuré." },
    ],
    faq: [
      { question: "Est-ce compliqué à utiliser pour une personne âgée ?", answer: "Non : une pression sur le bouton SOS déclenche l'alerte. La configuration des contacts se fait une fois, avec l'application, par vous ou un proche." },
      { question: "Combien de temps tient la batterie ?", answer: "La batterie est rechargeable, avec jusqu'à 2h d'utilisation continue de la sirène ou de la lampe." },
    ],
  },
  {
    slug: "trajets-seuls",
    path: "/solutions/trajets-seuls/",
    navLabel: "Trajets seuls",
    metaTitle: "Alarme personnelle pour rentrer seule en sécurité — Safety Gadgets",
    metaDescription: "Alarme personnelle 130 dB avec bouton SOS : attirez l'attention en une seconde et prévenez vos proches avec votre position. Idéale pour les trajets seuls.",
    eyebrow: "Trajets seuls",
    title: "Rentrer seule, l'esprit tranquille",
    intro: "Sur un trousseau ou un sac, l'alarme SOS est toujours à portée de main : une sirène qui attire l'attention, et vos proches prévenus avec votre position.",
    products: ["alarme-sos"],
    benefits: [
      { title: "Sirène de 130 dB", body: "Un son très puissant et une lumière stroboscopique pour attirer l'attention immédiatement." },
      { title: "Position partagée", body: "Vos contacts d'urgence reçoivent une alerte avec votre position GPS." },
      { title: "Lampe LED intégrée", body: "Une lampe torche de 25 lux pour les parkings, halls et rues peu éclairés." },
    ],
    scenarios: [
      { title: "Le retour du soir", body: "Du métro à la porte d'entrée, l'alarme est dans votre main, prête à servir." },
      { title: "Le footing ou la balade", body: "Accrochée à la ceinture, elle ne gêne pas et reste accessible." },
      { title: "Les voyages", body: "Compacte et légère, elle vous accompagne partout." },
    ],
    faq: [
      { question: "L'alarme est-elle facile à déclencher en urgence ?", answer: "Oui, une pression sur le bouton SOS déclenche la sirène et l'alerte à vos contacts." },
      { question: "Est-elle discrète ?", answer: "Elle mesure 94 x 30 x 13 mm pour 26 g : elle passe pour un simple porte-clés." },
    ],
  },
  {
    slug: "jeunes-conducteurs",
    path: "/solutions/jeunes-conducteurs/",
    navLabel: "Jeunes conducteurs",
    metaTitle: "Tracker GPS pour jeune conducteur : suivre la voiture en temps réel — Safety Gadgets",
    metaDescription: "Tracker GPS OBD : branché en 3 secondes, il localise la voiture en temps réel, alerte en cas d'excès de vitesse et de sortie de zone.",
    eyebrow: "Jeunes conducteurs",
    title: "Prêter la voiture, sans passer la soirée à s'inquiéter",
    intro: "Le tracker OBD se branche en 3 secondes sur la prise de la voiture. Vous savez où elle est, et vous êtes alerté en cas d'excès de vitesse.",
    products: ["obd"],
    benefits: [
      { title: "Position en temps réel", body: "Suivez la voiture depuis l'application, à 5 mètres près." },
      { title: "Alerte de survitesse", body: "Soyez prévenu si la vitesse dépasse le seuil que vous avez fixé." },
      { title: "Géorepérage", body: "Définissez des zones et recevez une alerte en cas de sortie." },
    ],
    scenarios: [
      { title: "Les premières sorties seul", body: "Vous savez que la voiture est bien arrivée, sans avoir à appeler." },
      { title: "La voiture partagée en famille", body: "Retrouvez-la facilement et gardez un œil sur son utilisation." },
      { title: "En cas de vol", body: "La position en temps réel aide à retrouver le véhicule." },
    ],
    faq: [
      { question: "Faut-il un abonnement ?", answer: "Il faut une carte SIM 4G avec un peu de data (non fournie). Un petit forfait suffit, par exemple le forfait Free à 2 €/mois." },
      { question: "L'installation est-elle compliquée ?", answer: "Non : le tracker se branche sur la prise OBD de la voiture, sans outil ni câblage." },
    ],
  },
];

export function audience(slug: string): Audience {
  const a = AUDIENCES.find((x) => x.slug === slug);
  if (!a) throw new Error(`Audience inconnue : ${slug}`);
  return a;
}
