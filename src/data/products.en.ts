import type { Product } from "./products";

// English translations of the product catalogue. Same slugs/sku/price/images
// as the French source (src/data/products.ts) — only text fields differ.
export const PRODUCTS_EN: Product[] = [
  {
    slug: "pack-decouverte",
    sku: "SG-PACK01",
    category: "Discovery pack",
    name: "Safety Gadgets Discovery Pack",
    shortName: "Discovery Pack",
    tagline: "3 ways to protect what matters, bundled in one pack",
    price: 64.7,
    originalPrice: 79.7,
    currency: "EUR",
    image: "/images/products/pack-decouverte-1.webp",
    shortDescription:
      "The GF07 tracker, the Bluetooth tag and the SOS alarm bundled together to try the whole range, with €15 in savings.",
    description:
      "Built to try the essentials of the Safety Gadgets range without having to choose: a versatile GPS tracker for a car, a loved one or a pet, a Bluetooth tag so you never lose your keys or bag again, and a personal alarm to get help with one gesture. Three different uses, three complementary products, bundled at the lowest price in the shop.",
    highlights: [
      "3 flagship products bundled: GF07, Bluetooth tag, SOS alarm",
      "€15 in savings compared to buying separately",
      "Three complementary uses: vehicle/loved one, everyday items, emergency",
      "Each product individually covered by a 1-year warranty",
    ],
    specs: [
      { label: "GPS tracker", value: "GF07 — real-time tracking (€34.90 alone)" },
      { label: "Bluetooth tracker", value: "Find My tag (€19.90 alone)" },
      { label: "Personal alarm", value: "130 dB SOS button (€24.90 alone)" },
      { label: "Pack price", value: "€64.70 incl. VAT instead of €79.70" },
      { label: "Warranty", value: "1 year on each product" },
    ],
    useCases: [
      {
        title: "First purchase",
        icon: "key",
        description: "Ideal for trying the range without having to pick just one product.",
      },
      {
        title: "Complete gift",
        icon: "wallet",
        description: "A useful gift that covers several security needs at once.",
      },
      {
        title: "Family",
        icon: "child",
        description: "Enough to equip a loved one, a car and a set of keys in one go.",
      },
      {
        title: "Best price",
        icon: "bag",
        description: "The cheapest way to try three Safety Gadgets products.",
      },
    ],
    faq: [
      {
        question: "Does the pack really include 3 separate products?",
        answer: "Yes: a GF07 tracker, a Find My Bluetooth tag and an SOS GPS keychain alarm, each with its own 1-year warranty.",
      },
      {
        question: "Can I choose different products to make up my pack?",
        answer: "This pack is offered with this fixed selection to guarantee the best price; for a different combination, order the products separately.",
      },
      {
        question: "Does the discount apply on top of free shipping from €100?",
        answer: "The pack is already at the best available price; combined with another product, it counts normally toward the free-shipping threshold of €100 incl. VAT.",
      },
    ],
  },
  {
    slug: "gf07",
    sku: "SG-GF07",
    category: "GPS Tracker",
    name: "GF07 Tracker",
    shortName: "GF07",
    tagline: "The mini tracker that keeps an eye on what matters",
    price: 34.9,
    currency: "EUR",
    image: "/images/products/gf07-1.webp",
    shortDescription: "Portable mini tracker, real-time tracking via mobile app, up to 24h battery life.",
    description:
      "Slipped into a car, a motorbike, a bag, or clipped to a pet's collar, the GF07 tracks what matters to you in real time. Precise positioning (GPS, AGPS, GSM, GPRS, LBS), motion detection, overspeed alerts and route playback are all available at any time from the mobile app. Compact, rechargeable and covered by a one-year warranty, it's a simple way to stay at ease day to day.",
    highlights: [
      "Real-time tracking via the mobile app",
      "Combined GPS, AGPS, GSM and LBS positioning",
      "12 to 24h battery life on a rechargeable battery",
      "Compact, discreet design, 1-year warranty",
    ],
    specs: [
      { label: "Type", value: "Portable mini tracker" },
      { label: "Positioning", value: "AGPS, GPS, GSM, GPRS, LBS (emergency fallback)" },
      { label: "Network", value: "2G / GSM / GPRS" },
      { label: "Battery", value: "Rechargeable — 12 to 24h battery life" },
      { label: "Local storage", value: "SD card" },
      { label: "Functions", value: "Motion detection (ACC), overspeed alert, route playback" },
      { label: "Tracking", value: "Coordinates by SMS and live view in the app" },
      { label: "Warranty", value: "1 year" },
    ],
    useCases: [
      {
        title: "Vehicles & two-wheelers",
        icon: "car",
        description: "Fitted in a car or motorbike, it alerts on suspicious movement and lets you follow a route in real time.",
      },
      {
        title: "Children",
        icon: "child",
        description: "Slipped into a bag or coat, it lets you know where a child is without having to call them.",
      },
      {
        title: "Elderly relatives",
        icon: "senior",
        description: "Discreet and lightweight, it's reassuring about a relative's movements while respecting their independence.",
      },
      {
        title: "Pets",
        icon: "paw",
        description: "Attached to the collar, it helps quickly find a pet that has run off or gone missing.",
      },
    ],
    faq: [
      {
        question: "Does this tracker need a SIM card?",
        answer: "Yes, a standard SIM card with an active data plan is required (not included) to transmit the position over the GSM/GPRS network.",
      },
      {
        question: "What is the actual battery life?",
        answer: "Between 12 and 24h depending on how often the position is updated and signal quality.",
      },
      {
        question: "Can it be hidden discreetly in a vehicle?",
        answer: "Yes, its compact size lets you slip it into the glovebox, under a seat, or in the boot without any visible installation.",
      },
    ],
  },
  {
    slug: "tag-bluetooth",
    sku: "SG-BT01",
    category: "Bluetooth Tracker",
    name: "AirTag Bluetooth Find My Tracker",
    shortName: "BT Tag",
    tagline: "The tag that finds your things, wherever they are in the world",
    price: 19.9,
    currency: "EUR",
    image: "/images/products/bt-tag-1.webp",
    shortDescription:
      "Small Bluetooth tag compatible with Apple's Find My network and Google's location network, so you never lose a bag, keys or a suitcase again.",
    description:
      "Clipped to a keyring, slipped into a bag, a wallet or a suitcase, this Bluetooth tag relies on Apple's Find My network (MFi certified) and Google's location network (Bluetooth 5.4) to find a lost item anywhere in the world. A sound helps locate it nearby, an alert warns you if you leave it behind, and Lost Mode shares its position as soon as another device on the network passes within range.",
    highlights: [
      "Compatible with Apple's Find My network (MFi certified) and Google's network",
      "Fast, reliable Bluetooth 5.4 connection",
      "Long-range tracking, anywhere in the world",
      "Lost Mode and automatic separation alert",
    ],
    specs: [
      { label: "Type", value: "AirTag Bluetooth tracker" },
      { label: "Connectivity", value: "Bluetooth 5.4 (BLE)" },
      { label: "Compatibility", value: "MFi certified (Apple), Google certified" },
      { label: "Positioning mode", value: "Find My network / Google location network" },
      { label: "Battery", value: "Lithium" },
      { label: "Material", value: "ABS casing" },
      {
        label: "Functions",
        value: "Sound playback, separation alert, Lost Mode, precision finding, sharing, custom name, worldwide tracking, directions",
      },
      { label: "Warranty", value: "1 year" },
    ],
    useCases: [
      {
        title: "Bags",
        icon: "bag",
        description: "Slipped into an inner pocket, it helps you find a bag that's been forgotten or lost.",
      },
      {
        title: "Keys",
        icon: "key",
        description: "Clipped to your keyring, it saves you searching under cushions or in pockets.",
      },
      {
        title: "Wallet",
        icon: "wallet",
        description: "Compact and discreet, it slips into a wallet without adding bulk.",
      },
      {
        title: "Luggage",
        icon: "luggage",
        description: "Track your suitcase during a trip and find it easily on arrival.",
      },
    ],
    faq: [
      {
        question: "Do I need a SIM card or a subscription?",
        answer: "No. The tag uses Bluetooth only and relies on Apple's Find My and Google's location networks, with no SIM card or subscription.",
      },
      {
        question: "Does it work with an Android phone?",
        answer: "Yes, it's certified for Google's location network in addition to Apple's Find My network (MFi certified).",
      },
      {
        question: "What happens when the battery runs out?",
        answer: "The tag runs on a replaceable lithium battery; a notification warns you before it's depleted.",
      },
    ],
  },
  {
    slug: "detecteur-anti-espion",
    sku: "SG-RK021",
    category: "Anti-spy detector",
    name: "Hidden camera, GPS and microphone detector",
    shortName: "RK-021 Detector",
    tagline: "Spot what's watching you before it's too late",
    price: 39.9,
    currency: "EUR",
    image: "/images/products/detector-wand-1.webp",
    shortDescription: "Multi-function RF, magnetic and optical detector: trackers, hidden microphones and cameras, Bluetooth/Wi-Fi/4G signals.",
    description:
      "Used in a hotel, holiday rental, rental car or meeting room, this detector spots hidden surveillance devices: it picks up radio signals (GPS, Bluetooth, Wi-Fi, 2G/3G/4G networks) and the magnetic fields of magnetic trackers, with a sensitivity dial. Its remote LED probe also lets you visually spot the glint of a hidden camera lens, even when powered off.",
    highlights: [
      "Combined RF detection: GPS, Bluetooth, Wi-Fi, 2G/3G/4G",
      "Magnetic field detector for magnetic trackers",
      "Remote LED probe to spot hidden camera lenses",
      "Adjustable sensitivity, 1-year warranty",
    ],
    specs: [
      { label: "Type", value: "Multi-function RF / magnetic / optical detector" },
      { label: "Signals detected", value: "GPS, Bluetooth, Wi-Fi, 2G/3G/4G networks" },
      { label: "Magnetic detection", value: "Yes — trackers and magnetic devices" },
      { label: "Camera detector", value: "Remote LED probe, lens-glint detection" },
      { label: "Adjustment", value: "Manual sensitivity dial" },
      { label: "Power", value: "Rechargeable battery" },
      { label: "Warranty", value: "1 year" },
    ],
    useCases: [
      {
        title: "Hotel rooms & rentals",
        icon: "bed",
        description: "Check a hotel room or holiday rental on arrival, in a few minutes.",
      },
      {
        title: "Rental cars",
        icon: "car",
        description: "Spot a magnetic tracker potentially hidden in a rental vehicle.",
      },
      {
        title: "Confidential meetings",
        icon: "briefcase",
        description: "Detect a hidden microphone before a sensitive business conversation.",
      },
      {
        title: "Changing rooms & cabins",
        icon: "camera",
        description: "Visually spot the lens of a hidden camera thanks to the remote LED probe.",
      },
    ],
    faq: [
      {
        question: "Does it detect switched-off cameras?",
        answer: "The remote LED probe detects a lens glint even when powered off; RF detection, on the other hand, only picks up active devices emitting a signal.",
      },
      {
        question: "Can it trigger false alarms?",
        answer: "Yes, in dense urban environments (ambient Wi-Fi, Bluetooth); the sensitivity dial lets you adjust detection to the context.",
      },
      {
        question: "How is it powered?",
        answer: "By a built-in rechargeable battery, via the supplied USB cable.",
      },
    ],
  },
  {
    slug: "obd",
    sku: "SG-OBD",
    category: "OBD GPS Tracker",
    name: "OBD Tracker",
    shortName: "OBD",
    tagline: "Plugs straight into the OBD port, no wiring",
    price: 39.9,
    currency: "EUR",
    image: "/images/products/obd-1.webp",
    gallery: ["/images/products/obd-1.webp", "/images/products/obd-2.webp", "/images/products/obd-3.webp"],
    shortDescription: "4G GPS tracker that plugs directly into the vehicle's OBD port, with no wiring or installation.",
    description:
      "It plugs directly into the vehicle's OBD port — no wiring, no tools — and transmits its position in real time over the 4G network. If unplugged, its backup battery takes over for up to 2h. Geofencing, overspeed alerts and a vibration alarm let you define zones and get alerted on leaving a zone or on suspicious movement. Compatible with most vehicles (12-36V), 1-year warranty.",
    highlights: [
      "Instant installation on the OBD port, no wiring",
      "4G network, 5-metre positioning accuracy",
      "Geofencing and overspeed alert",
      "Backup battery for up to 2h if unplugged",
    ],
    specs: [
      { label: "Type", value: "Plug-and-play OBD GPS tracker" },
      { label: "Positioning", value: "GPS, LBS, Beidou" },
      { label: "Network", value: "4G (LTE-FDD B1/B3/B5/B8, LTE-TDD B34/B38/B39/B40/B41)" },
      { label: "Power", value: "Vehicle OBD port, 12-36V DC" },
      { label: "Backup battery", value: "55 mAh — up to 2h battery life" },
      { label: "Positioning accuracy", value: "5 metres" },
      { label: "Functions", value: "Geofencing, vibration alarm, overspeed alert, loop recording, remote monitoring" },
      { label: "Tracking", value: "Android/iOS app, PC" },
      { label: "Operating temperature", value: "-20°C to 60°C" },
      { label: "Dimensions", value: "48 x 25 x 30 mm" },
      { label: "Weight", value: "30.8 g" },
      { label: "Warranty", value: "1 year" },
    ],
    useCases: [
      {
        title: "Cars & motorbikes",
        icon: "car",
        description: "Instant installation on the OBD port, no tools or wiring needed.",
      },
      {
        title: "Young drivers",
        icon: "child",
        description: "Simple to install and remove, ideal for keeping an eye on a vehicle lent to a young driver.",
      },
      {
        title: "Professional fleets",
        icon: "briefcase",
        description: "Rapid deployment across several vehicles thanks to wiring-free installation.",
      },
      {
        title: "Relatives who drive",
        icon: "senior",
        description: "Keep a discreet eye on a relative's journeys, with no technical intervention.",
      },
    ],
    faq: [
      {
        question: "Does this tracker need a SIM card?",
        answer: "Yes, a 4G SIM card with an active data plan is required (not included) for real-time position transmission.",
      },
      {
        question: "Is it compatible with my car?",
        answer: "Yes, it works on most vehicles fitted with a standard OBD port, 12-36V power supply.",
      },
      {
        question: "What happens if someone unplugs it?",
        answer: "Its backup battery takes over for up to 2h, and an unplug alert can be configured.",
      },
    ],
  },
  {
    slug: "alarme-sos",
    sku: "SG-SOS253",
    category: "Personal alarm",
    name: "SOS GPS Keychain Alarm",
    shortName: "SOS Alarm",
    tagline: "The gesture that alerts everyone in a second",
    price: 24.9,
    currency: "EUR",
    image: "/images/products/alarme-porteclef-1.webp",
    shortDescription: "130 dB personal alarm with SOS button, SMS and call position sharing, and LED torch — wireless, no app required.",
    description:
      "Press the SOS button and it triggers a 130 dB siren with strobe light to draw attention immediately, while sending an SMS alert and calling pre-saved emergency contacts with your GPS position. Its 25-lux LED torch rounds out the set for dark environments. No app to install: everything works wirelessly straight out of the box. Compact (94 x 30 x 13 mm) and light (26 g), it clips onto a keyring, bag or belt with its built-in carabiner.",
    highlights: [
      "130 dB siren with SOS strobe light",
      "Automatic SMS alert and call to emergency contacts with GPS position",
      "Built-in 25-lux LED torch",
      "Wireless, no app — rechargeable battery, up to 2h continuous use",
    ],
    specs: [
      { label: "Type", value: "Portable personal safety alarm" },
      { label: "Sound level", value: "130 dB" },
      { label: "Alert function", value: "Siren + SOS strobe light + call/SMS + GPS position" },
      { label: "Lighting", value: "LED torch, 25 lux" },
      { label: "Battery", value: "Rechargeable 200 mAh, 3.7 V — up to 2h continuous use" },
      { label: "Material", value: "ABS + PC" },
      { label: "Water resistance", value: "Not water-resistant" },
      { label: "Dimensions", value: "94 x 30 x 13 mm" },
      { label: "Weight", value: "26 g" },
      { label: "Standards", value: "CE / FCC / RoHS certified" },
    ],
    useCases: [
      {
        title: "Isolated seniors",
        icon: "senior",
        description: "A simple button to alert relatives in case of a fall or need for help, wherever they are.",
      },
      {
        title: "Solo trips and outings",
        icon: "key",
        description: "Clipped to the keyring, always at hand during a solo trip, day or night.",
      },
      {
        title: "Solo travel & hiking",
        icon: "luggage",
        description: "Compact and light, it slips into a bag for any solo outing or trip.",
      },
      {
        title: "Young people walking home alone",
        icon: "child",
        description: "A simple habit to learn, reassuring without complicating daily life.",
      },
    ],
    faq: [
      {
        question: "Does the alarm work without an app or SIM card?",
        answer: "Yes, everything works wirelessly straight out of the box: no app or SIM card to set up.",
      },
      {
        question: "Is it water-resistant?",
        answer: "No, it is not water-resistant: avoid exposing it to rain or immersion.",
      },
      {
        question: "How is it recharged?",
        answer: "Via USB cable, for up to 2h of continuous use on a full charge.",
      },
    ],
  },
];
