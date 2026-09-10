export interface UseCase {
  title: string;
  icon: "car" | "child" | "senior" | "paw" | "bag" | "key" | "wallet" | "luggage" | "camera" | "bed" | "briefcase";
  description: string;
}

export interface Product {
  slug: string;
  sku: string;
  category: string;
  name: string;
  shortName: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  currency: string;
  image: string;
  gallery?: string[];
  comingSoon?: boolean;
  featured?: boolean;
  shortDescription: string;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  useCases: UseCase[];
  faq?: { question: string; answer: string }[];
}

// Prix indicatif — à confirmer par le client avant mise en ligne.
export const PRODUCTS: Product[] = [
  {
    slug: "obd",
    sku: "SG-OBD",
    badge: "Nouveauté",
    featured: true,
    category: "Tracker GPS OBD",
    name: "Tracker OBD",
    shortName: "OBD",
    tagline: "Votre voiture, localisée en temps réel — sans un fil à toucher.",
    price: 29.99,
    currency: "EUR",
    image: "/images/products/obd-1.webp",
    gallery: ["/images/products/obd-1.webp", "/images/products/obd-2.webp", "/images/products/obd-3.webp"],
    shortDescription:
      "Tracker GPS 4G qui se branche directement sur la prise OBD du véhicule, sans câblage ni installation.",
    description:
      "Il se branche directement sur la prise OBD du véhicule — aucun câblage, aucun outil — et transmet sa position en temps réel via réseau 4G. En cas de débranchement, sa batterie de secours prend le relais jusqu'à 2h. Géorepérage, alerte de survitesse et alarme de vibration permettent de définir des zones et d'être alerté en cas de sortie de zone ou de mouvement suspect. Compatible avec la plupart des véhicules (12-36V), garanti un an.",
    highlights: [
      "Installation instantanée sur la prise OBD, sans câblage",
      "Réseau 4G, précision de positionnement à 5 mètres",
      "Géorepérage et alerte de survitesse",
      "Batterie de secours jusqu'à 2h en cas de débranchement",
    ],
    specs: [
      { label: "Type", value: "Tracker GPS OBD (plug-and-play)" },
      { label: "Positionnement", value: "GPS, LBS, Beidou" },
      { label: "Réseau", value: "4G (LTE-FDD B1/B3/B5/B8, LTE-TDD B34/B38/B39/B40/B41)" },
      { label: "Alimentation", value: "Prise OBD du véhicule, 12-36V CC" },
      { label: "Batterie de secours", value: "55 mAh — jusqu'à 2h d'autonomie" },
      { label: "Précision de positionnement", value: "5 mètres" },
      { label: "Fonctions", value: "Géorepérage, alarme de vibration, alerte de survitesse, enregistrement en boucle, surveillance à distance" },
      { label: "Suivi", value: "Application Android/iOS, PC" },
      { label: "Température de fonctionnement", value: "-20°C à 60°C" },
      { label: "Dimensions", value: "48 x 25 x 30 mm" },
      { label: "Poids", value: "30,8 g" },
      { label: "Garantie", value: "1 an" },
    ],
    useCases: [
      {
        title: "Voitures & motos",
        icon: "car",
        description: "Installation instantanée sur la prise OBD, sans outil ni câblage à prévoir.",
      },
      {
        title: "Jeunes conducteurs",
        icon: "child",
        description: "Simple à installer et à retirer, idéal pour surveiller un véhicule prêté à un jeune conducteur.",
      },
      {
        title: "Flottes professionnelles",
        icon: "briefcase",
        description: "Déploiement rapide sur plusieurs véhicules grâce à l'installation sans câblage.",
      },
      {
        title: "Proches qui conduisent",
        icon: "senior",
        description: "Gardez un œil discret sur les déplacements d'un proche, sans intervention technique.",
      },
    ],
    faq: [
      {
        question: "Faut-il une carte SIM pour ce tracker ?",
        answer: "Oui, une carte SIM 4G avec forfait data actif est nécessaire (non fournie) pour la transmission de position en temps réel.",
      },
      {
        question: "Est-il compatible avec ma voiture ?",
        answer: "Oui, il fonctionne sur la plupart des véhicules équipés d'une prise OBD standard, alimentation 12-36V.",
      },
      {
        question: "Que se passe-t-il si quelqu'un le débranche ?",
        answer: "Sa batterie de secours prend le relais jusqu'à 2h et une alerte de débranchement peut être configurée.",
      },
    ],
  },
  {
    slug: "alarme-sos",
    sku: "SG-SOS253",
    badge: "Nouveauté",
    featured: true,
    category: "Alarme personnelle",
    name: "Alarme Porte-clés SOS GPS",
    shortName: "Alarme SOS",
    tagline: "Un geste, et vos proches savent où vous êtes.",
    price: 34.99,
    currency: "EUR",
    image: "/images/products/alarme-porteclef-2.webp",
    shortDescription:
      "Alarme personnelle 130 dB avec bouton SOS, partage de position par SMS et appel, et lampe torche LED — sans fil, sans application.",
    description:
      "D'une pression sur le bouton SOS, elle déclenche une sirène de 130 dB avec lumière stroboscopique pour attirer l'attention immédiatement, tout en envoyant une alerte par SMS et en appelant les contacts d'urgence pré-enregistrés avec la position GPS. Sa lampe torche LED de 25 lux complète l'ensemble pour les environnements sombres. Aucune application à installer : tout fonctionne en sans-fil dès la sortie de la boîte. Compacte (94 x 30 x 13 mm) et légère (26 g), elle s'accroche à un trousseau de clés, un sac ou une ceinture grâce à son mousqueton intégré.",
    highlights: [
      "Sirène 130 dB avec lumière stroboscopique SOS",
      "Alerte SMS et appel automatique aux contacts d'urgence avec position GPS",
      "Lampe torche LED 25 lux intégrée",
      "Sans fil, sans application — batterie rechargeable, jusqu'à 2h d'autonomie continue",
    ],
    specs: [
      { label: "Type", value: "Alarme de sécurité personnelle portable" },
      { label: "Niveau sonore", value: "130 dB" },
      { label: "Fonction d'alerte", value: "Sirène + lumière stroboscopique SOS + appel/SMS + position GPS" },
      { label: "Éclairage", value: "Lampe torche LED, 25 lux" },
      { label: "Batterie", value: "Rechargeable 200 mAh, 3,7 V — jusqu'à 2h d'autonomie continue" },
      { label: "Matériau", value: "ABS + PC" },
      { label: "Étanchéité", value: "Non étanche" },
      { label: "Dimensions", value: "94 x 30 x 13 mm" },
      { label: "Poids", value: "26 g" },
      { label: "Normes", value: "Certifié CE / FCC / RoHS" },
    ],
    useCases: [
      {
        title: "Seniors isolés",
        icon: "senior",
        description: "Un bouton simple pour alerter les proches en cas de malaise ou de besoin d'aide, où qu'ils soient.",
      },
      {
        title: "Trajets et sorties seules",
        icon: "key",
        description: "Accrochée au trousseau de clés, toujours à portée de main pendant un trajet seul, de jour comme de nuit.",
      },
      {
        title: "Voyages & randonnée solo",
        icon: "luggage",
        description: "Compacte et légère, elle se glisse dans un sac pour toute sortie ou déplacement en solo.",
      },
      {
        title: "Jeunes qui rentrent seuls",
        icon: "child",
        description: "Un réflexe simple à apprendre, pour rassurer sans complexifier le quotidien.",
      },
    ],
    faq: [
      {
        question: "L'alarme fonctionne-t-elle sans application ni SIM ?",
        answer: "Oui, tout fonctionne en sans-fil dès la sortie de la boîte : aucune application ni carte SIM à installer.",
      },
      {
        question: "Est-elle étanche ?",
        answer: "Non, elle n'est pas étanche : évitez de l'exposer à la pluie ou à l'immersion.",
      },
      {
        question: "Comment se recharge-t-elle ?",
        answer: "Par câble USB (non fourni détaillé dans la fiche), pour une autonomie allant jusqu'à 2h d'utilisation continue.",
      },
    ],
  },
  {
    slug: "gf07",
    sku: "SG-GF07",
    badge: "Nouveauté",
    comingSoon: true,
    category: "Tracker GPS",
    name: "Tracker GF07",
    shortName: "GF07",
    tagline: "Le mini tracker qui garde un œil sur l'essentiel",
    price: 34.9,
    currency: "EUR",
    image: "/images/products/gf07-1.webp",
    shortDescription:
      "Mini tracker portable, suivi en temps réel via application mobile, autonomie jusqu'à 24h.",
    description:
      "Glissé dans une voiture, une moto, un sac ou attaché au collier d'un animal, le GF07 suit en temps réel ce qui compte pour vous. Localisation précise (GPS, AGPS, GSM, GPRS, LBS), détection de mouvement, alerte de survitesse et relecture du parcours sont consultables à tout moment depuis l'application mobile. Compact, rechargeable et garanti un an, c'est la solution simple pour garder l'esprit tranquille au quotidien.",
    highlights: [
      "Suivi en temps réel via l'application mobile",
      "Positionnement GPS, AGPS, GSM et LBS combinés",
      "Autonomie de 12 à 24h sur batterie rechargeable",
      "Format compact et discret, garantie 1 an",
    ],
    specs: [
      { label: "Type", value: "Mini tracker portable" },
      { label: "Positionnement", value: "AGPS, GPS, GSM, GPRS, LBS (position d'urgence)" },
      { label: "Réseau", value: "2G / GSM / GPRS" },
      { label: "Batterie", value: "Rechargeable — autonomie 12 à 24h" },
      { label: "Stockage local", value: "Carte SD" },
      { label: "Fonctions", value: "Détection de mouvement (ACC), alerte de survitesse, relecture de trajet" },
      { label: "Suivi", value: "Coordonnées par SMS et vue en direct sur l'application" },
      { label: "Garantie", value: "1 an" },
    ],
    useCases: [
      {
        title: "Véhicules & deux-roues",
        icon: "car",
        description: "Fixé dans une voiture ou une moto, il alerte en cas de mouvement suspect et permet de suivre un trajet en temps réel.",
      },
      {
        title: "Enfants",
        icon: "child",
        description: "Glissé dans un sac ou un manteau, il permet de savoir où se trouve un enfant sans avoir à l'appeler.",
      },
      {
        title: "Proches âgés",
        icon: "senior",
        description: "Discret et léger, il rassure sur les déplacements d'un proche tout en respectant son autonomie.",
      },
      {
        title: "Animaux de compagnie",
        icon: "paw",
        description: "Attaché au collier, il aide à retrouver rapidement un animal qui se serait échappé ou perdu.",
      },
    ],
    faq: [
      {
        question: "Faut-il une carte SIM pour ce tracker ?",
        answer: "Oui, une carte SIM classique avec un forfait data actif est nécessaire (non fournie) pour transmettre la position par réseau GSM/GPRS.",
      },
      {
        question: "Quelle est l'autonomie de la batterie ?",
        answer: "Entre 12 et 24h selon la fréquence de mise à jour de la position et la qualité du signal.",
      },
      {
        question: "Peut-on le fixer discrètement sur un véhicule ?",
        answer: "Oui, son format compact permet de le glisser dans la boîte à gants, sous un siège ou dans le coffre sans installation apparente.",
      },
    ],
  },
  {
    slug: "tag-bluetooth",
    sku: "SG-BT01",
    badge: "Nouveauté",
    comingSoon: true,
    category: "Tracker Bluetooth",
    name: "Tracker Bluetooth Find My",
    shortName: "Tag BT",
    tagline: "La balise qui retrouve vos affaires, où qu'elles soient dans le monde",
    price: 19.9,
    currency: "EUR",
    image: "/images/products/bt-tag-1.webp",
    shortDescription:
      "Petite balise Bluetooth compatible avec le réseau Find My d'Apple et le réseau de localisation Google, pour ne plus perdre un sac, des clés ou une valise.",
    description:
      "Accrochée à un trousseau de clés, glissée dans un sac, un portefeuille ou une valise, cette balise Bluetooth s'appuie sur le réseau Find My d'Apple (certifiée MFi) et sur le réseau de localisation Google (Bluetooth 5.4) pour retrouver un objet égaré, partout dans le monde. Un son permet de le localiser à proximité, une alerte prévient en cas d'oubli, et le mode perdu partage sa position dès qu'un appareil du réseau repasse à sa portée.",
    highlights: [
      "Compatible réseau Find My d'Apple (certifiée MFi) et réseau Google",
      "Connexion Bluetooth 5.4 rapide et fiable",
      "Suivi longue distance, partout dans le monde",
      "Mode perdu et alerte d'oubli automatique",
    ],
    specs: [
      { label: "Type", value: "Tracker Bluetooth" },
      { label: "Connectivité", value: "Bluetooth 5.4 (BLE)" },
      { label: "Compatibilité", value: "Certifiée MFi (Apple), certifiée Google" },
      { label: "Mode de positionnement", value: "Réseau Find My / réseau de localisation Google" },
      { label: "Batterie", value: "Lithium" },
      { label: "Matériau", value: "Boîtier ABS" },
      {
        label: "Fonctions",
        value: "Lecture sonore, alerte d'oubli, mode perdu, recherche de précision, partage, nom personnalisé, suivi mondial, itinéraire",
      },
      { label: "Garantie", value: "1 an" },
    ],
    useCases: [
      {
        title: "Sacs",
        icon: "bag",
        description: "Glissée dans une poche intérieure, elle permet de retrouver un sac oublié ou égaré.",
      },
      {
        title: "Clés",
        icon: "key",
        description: "Accrochée au trousseau, elle évite les recherches sous les coussins ou dans les poches.",
      },
      {
        title: "Portefeuille",
        icon: "wallet",
        description: "Compacte et discrète, elle se glisse dans un portefeuille sans le déformer.",
      },
      {
        title: "Bagages",
        icon: "luggage",
        description: "Suivez votre valise pendant un voyage et retrouvez-la facilement à l'arrivée.",
      },
    ],
    faq: [
      {
        question: "Faut-il une carte SIM ou un abonnement ?",
        answer: "Non. La balise utilise uniquement le Bluetooth et s'appuie sur les réseaux Find My d'Apple et de localisation Google, sans carte SIM ni abonnement.",
      },
      {
        question: "Fonctionne-t-elle avec un téléphone Android ?",
        answer: "Oui, elle est certifiée pour le réseau de localisation Google en plus du réseau Find My d'Apple (certifiée MFi).",
      },
      {
        question: "Que se passe-t-il si la pile est vide ?",
        answer: "La balise fonctionne sur pile lithium remplaçable ; une notification prévient avant que la batterie ne soit épuisée.",
      },
    ],
  },
  {
    slug: "detecteur-anti-espion",
    sku: "SG-RK021",
    badge: "Nouveauté",
    comingSoon: true,
    category: "Détecteur anti-espionnage",
    name: "Détecteur de caméras, GPS et micros espions",
    shortName: "Détecteur RK-021",
    tagline: "Repérez ce qui vous surveille avant que ça ne soit trop tard",
    price: 39.9,
    currency: "EUR",
    image: "/images/products/detector-wand-1.webp",
    shortDescription:
      "Détecteur multi-fonctions RF, magnétique et optique : trackers, micros et caméras espions, signaux Bluetooth/WiFi/4G.",
    description:
      "Utilisé en hôtel, en location de vacances, dans une voiture de location ou en réunion, ce détecteur repère les dispositifs de surveillance cachés : il capte les signaux radio (GPS, Bluetooth, WiFi, réseaux 2G/3G/4G) et les champs magnétiques des trackers aimantés, avec une molette de réglage de la sensibilité. Sa sonde LED déportée permet en complément de repérer visuellement le reflet d'un objectif de caméra cachée, même éteinte.",
    highlights: [
      "Détection RF combinée : GPS, Bluetooth, WiFi, 2G/3G/4G",
      "Détecteur de champ magnétique pour trackers aimantés",
      "Sonde LED déportée pour repérer les objectifs de caméras cachées",
      "Sensibilité réglable, garantie 1 an",
    ],
    specs: [
      { label: "Type", value: "Détecteur multi-fonctions RF / magnétique / optique" },
      { label: "Signaux détectés", value: "GPS, Bluetooth, WiFi, réseaux 2G/3G/4G" },
      { label: "Détection magnétique", value: "Oui — trackers et dispositifs aimantés" },
      { label: "Détecteur de caméras", value: "Sonde LED déportée, repérage par reflet d'objectif" },
      { label: "Réglage", value: "Molette de sensibilité manuelle" },
      { label: "Alimentation", value: "Batterie rechargeable" },
      { label: "Garantie", value: "1 an" },
    ],
    useCases: [
      {
        title: "Chambres d'hôtel & locations",
        icon: "bed",
        description: "Vérifiez une chambre d'hôtel ou une location de vacances à l'arrivée, en quelques minutes.",
      },
      {
        title: "Voitures de location",
        icon: "car",
        description: "Repérez un tracker aimanté éventuellement dissimulé dans un véhicule de location.",
      },
      {
        title: "Réunions confidentielles",
        icon: "briefcase",
        description: "Détectez un micro espion avant un échange professionnel sensible.",
      },
      {
        title: "Cabines & vestiaires",
        icon: "camera",
        description: "Repérez visuellement l'objectif d'une caméra cachée grâce à la sonde LED déportée.",
      },
    ],
    faq: [
      {
        question: "Le détecteur repère-t-il les caméras éteintes ?",
        answer: "La sonde LED déportée repère le reflet de l'objectif même hors tension ; la détection RF, elle, ne capte que les appareils actifs qui émettent un signal.",
      },
      {
        question: "Peut-il déclencher de fausses alertes ?",
        answer: "Oui, en environnement urbain dense (Wi-Fi, Bluetooth ambiant) ; la molette de sensibilité permet d'ajuster la détection selon le contexte.",
      },
      {
        question: "Comment est-il alimenté ?",
        answer: "Par batterie rechargeable intégrée, via câble USB fourni.",
      },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

// Les prix produits sont déjà TTC (voir CGV) — ce format l'affiche
// explicitement, comme demandé pour la boutique.
export function formatPriceTTC(price: number, currency = "EUR"): string {
  const formatted = price.toLocaleString("fr-FR", { style: "currency", currency });
  return `${formatted} TTC`;
}
