import type { Product } from "./products";

// Deutsche Übersetzung des Produktkatalogs. Gleiche Slugs/SKUs/Preise/Bilder
// wie die französische Quelle (src/data/products.ts) — nur die Texte unterscheiden sich.
export const PRODUCTS_DE: Product[] = [
  {
    slug: "pack-decouverte",
    sku: "SG-PACK01",
    badge: "Paket",
    category: "Entdecker-Paket",
    name: "Safety Gadgets Entdecker-Paket",
    shortName: "Entdecker-Paket",
    tagline: "3 Wege, zu schützen, was zählt, in einem Paket vereint",
    price: 64.7,
    originalPrice: 79.7,
    currency: "EUR",
    image: "/images/products/pack-decouverte-1.webp",
    shortDescription:
      "Der GF07-Tracker, das Bluetooth-Tag und der SOS-Alarm vereint, um das gesamte Sortiment zu testen — mit 15 € Ersparnis.",
    description:
      "Konzipiert, um das Wesentliche des Safety-Gadgets-Sortiments zu entdecken, ohne wählen zu müssen: ein vielseitiger GPS-Tracker für ein Auto, eine nahestehende Person oder ein Haustier, ein Bluetooth-Tag, damit Sie nie wieder Ihre Schlüssel oder Tasche verlieren, und ein persönlicher Alarm, um mit einer Geste Hilfe zu rufen. Drei verschiedene Anwendungen, drei sich ergänzende Produkte, vereint zum günstigsten Preis im Shop.",
    highlights: [
      "3 Bestseller vereint: GF07, Bluetooth-Tag, SOS-Alarm",
      "15 € Ersparnis gegenüber dem Einzelkauf",
      "Drei sich ergänzende Anwendungen: Fahrzeug/Angehörige, Alltagsgegenstände, Notfall",
      "Jedes Produkt einzeln mit 1 Jahr Garantie",
    ],
    specs: [
      { label: "GPS-Tracker", value: "GF07 — Echtzeit-Ortung (34,90 € einzeln)" },
      { label: "Bluetooth-Tracker", value: "Find-My-Tag (19,90 € einzeln)" },
      { label: "Persönlicher Alarm", value: "SOS-Knopf 130 dB (24,90 € einzeln)" },
      { label: "Paketpreis", value: "64,70 € inkl. MwSt. statt 79,70 €" },
      { label: "Garantie", value: "1 Jahr auf jedes Produkt" },
    ],
    useCases: [
      {
        title: "Erstkauf",
        icon: "key",
        description: "Ideal, um das Sortiment zu entdecken, ohne sich auf ein einzelnes Produkt festlegen zu müssen.",
      },
      {
        title: "Komplettes Geschenk",
        icon: "wallet",
        description: "Ein nützliches Geschenk, das mehrere Sicherheitsbedürfnisse auf einmal abdeckt.",
      },
      {
        title: "Familie",
        icon: "child",
        description: "Genug, um eine nahestehende Person, ein Auto und einen Schlüsselbund auf einmal auszustatten.",
      },
      {
        title: "Bester Preis",
        icon: "bag",
        description: "Der günstigste Weg, drei Safety-Gadgets-Produkte auszuprobieren.",
      },
    ],
    faq: [
      {
        question: "Enthält das Paket wirklich 3 separate Produkte?",
        answer: "Ja: einen GF07-Tracker, ein Find-My-Bluetooth-Tag und einen SOS-GPS-Schlüsselanhänger-Alarm, jeweils mit eigener 1-jähriger Garantie.",
      },
      {
        question: "Kann ich andere Produkte für mein Paket wählen?",
        answer: "Dieses Paket wird mit dieser festen Auswahl angeboten, um den besten Preis zu garantieren; für eine andere Kombination bestellen Sie die Produkte einzeln.",
      },
      {
        question: "Gilt der Rabatt zusätzlich zum kostenlosen Versand ab 100 €?",
        answer: "Das Paket hat bereits den günstigsten Preis; in Kombination mit einem weiteren Produkt zählt es normal zum Schwellenwert für kostenlosen Versand ab 100 € inkl. MwSt.",
      },
    ],
  },
  {
    slug: "gf07",
    sku: "SG-GF07",
    badge: "Neu",
    category: "GPS-Tracker",
    name: "GF07 Tracker",
    shortName: "GF07",
    tagline: "Der Mini-Tracker, der das Wesentliche im Blick behält",
    price: 34.9,
    currency: "EUR",
    image: "/images/products/gf07-1.webp",
    shortDescription: "Tragbarer Mini-Tracker, Echtzeit-Ortung über die App, bis zu 24 Std. Akkulaufzeit.",
    description:
      "Ob im Auto, auf dem Motorrad, in einer Tasche oder am Halsband eines Tieres — der GF07 verfolgt in Echtzeit, was Ihnen wichtig ist. Präzise Ortung (GPS, AGPS, GSM, GPRS, LBS), Bewegungserkennung, Geschwindigkeitsalarm und Streckenverlauf sind jederzeit über die App abrufbar. Kompakt, wiederaufladbar und mit einem Jahr Garantie — eine einfache Lösung für mehr Ruhe im Alltag.",
    highlights: [
      "Echtzeit-Ortung über die mobile App",
      "Kombinierte GPS-, AGPS-, GSM- und LBS-Ortung",
      "12 bis 24 Std. Akkulaufzeit, wiederaufladbar",
      "Kompaktes, unauffälliges Design, 1 Jahr Garantie",
    ],
    specs: [
      { label: "Typ", value: "Tragbarer Mini-Tracker" },
      { label: "Ortung", value: "AGPS, GPS, GSM, GPRS, LBS (Notfall-Ortung)" },
      { label: "Netz", value: "2G / GSM / GPRS" },
      { label: "Akku", value: "Wiederaufladbar — 12 bis 24 Std. Laufzeit" },
      { label: "Lokaler Speicher", value: "SD-Karte" },
      { label: "Funktionen", value: "Bewegungserkennung (ACC), Geschwindigkeitsalarm, Streckenverlauf" },
      { label: "Ortung", value: "Koordinaten per SMS und Live-Ansicht in der App" },
      { label: "Garantie", value: "1 Jahr" },
    ],
    useCases: [
      {
        title: "Fahrzeuge & Zweiräder",
        icon: "car",
        description: "Im Auto oder Motorrad angebracht, warnt er bei verdächtigen Bewegungen und ermöglicht Echtzeit-Streckenverfolgung.",
      },
      {
        title: "Kinder",
        icon: "child",
        description: "In einer Tasche oder Jacke platziert, zeigt er, wo sich ein Kind befindet, ohne anrufen zu müssen.",
      },
      {
        title: "Ältere Angehörige",
        icon: "senior",
        description: "Diskret und leicht, gibt er Sicherheit über die Bewegungen eines Angehörigen, ohne dessen Unabhängigkeit einzuschränken.",
      },
      {
        title: "Haustiere",
        icon: "paw",
        description: "Am Halsband befestigt, hilft er, ein entlaufenes oder verlorenes Tier schnell wiederzufinden.",
      },
    ],
    faq: [
      {
        question: "Benötigt dieser Tracker eine SIM-Karte?",
        answer: "Ja, eine herkömmliche SIM-Karte mit aktivem Datentarif ist erforderlich (nicht im Lieferumfang enthalten), um die Position über GSM/GPRS zu übertragen.",
      },
      {
        question: "Wie hoch ist die tatsächliche Akkulaufzeit?",
        answer: "Zwischen 12 und 24 Std., abhängig von der Aktualisierungsfrequenz und der Signalqualität.",
      },
      {
        question: "Lässt er sich diskret im Fahrzeug anbringen?",
        answer: "Ja, dank seiner kompakten Größe passt er ins Handschuhfach, unter einen Sitz oder in den Kofferraum, ohne sichtbar zu sein.",
      },
    ],
  },
  {
    slug: "tag-bluetooth",
    sku: "SG-BT01",
    badge: "Neu",
    category: "Bluetooth-Tracker",
    name: "Bluetooth Find My Tracker",
    shortName: "BT Tag",
    tagline: "Der Anhänger, der Ihre Sachen wiederfindet, egal wo auf der Welt",
    price: 19.9,
    currency: "EUR",
    image: "/images/products/bt-tag-1.webp",
    shortDescription: "Kleiner Bluetooth-Anhänger, kompatibel mit dem Find My-Netzwerk von Apple und dem Google-Ortungsnetzwerk — Taschen, Schlüssel oder Koffer nie wieder verlieren.",
    description:
      "Am Schlüsselbund befestigt oder in einer Tasche, einem Portemonnaie oder einem Koffer verstaut, nutzt dieser Bluetooth-Anhänger das Find My-Netzwerk von Apple (MFi-zertifiziert) und das Google-Ortungsnetzwerk (Bluetooth 5.4), um verlorene Gegenstände überall auf der Welt wiederzufinden. Ein Ton hilft bei der Ortung in der Nähe, eine Benachrichtigung warnt beim Vergessen, und der Verloren-Modus teilt die Position, sobald ein Gerät des Netzwerks in Reichweite kommt.",
    highlights: [
      "Kompatibel mit Apples Find My-Netzwerk (MFi-zertifiziert) und Google-Netzwerk",
      "Schnelle, zuverlässige Bluetooth-5.4-Verbindung",
      "Langstrecken-Ortung, weltweit",
      "Verloren-Modus und automatische Trennungswarnung",
    ],
    specs: [
      { label: "Typ", value: "Bluetooth-Tracker" },
      { label: "Konnektivität", value: "Bluetooth 5.4 (BLE)" },
      { label: "Kompatibilität", value: "MFi-zertifiziert (Apple), Google-zertifiziert" },
      { label: "Ortungsmodus", value: "Find My-Netzwerk / Google-Ortungsnetzwerk" },
      { label: "Akku", value: "Lithium" },
      { label: "Material", value: "ABS-Gehäuse" },
      {
        label: "Funktionen",
        value: "Tonwiedergabe, Trennungswarnung, Verloren-Modus, Feinortung, Teilen, individueller Name, weltweite Ortung, Wegbeschreibung",
      },
      { label: "Garantie", value: "1 Jahr" },
    ],
    useCases: [
      {
        title: "Taschen",
        icon: "bag",
        description: "In einer Innentasche platziert, hilft er, eine vergessene oder verlorene Tasche wiederzufinden.",
      },
      {
        title: "Schlüssel",
        icon: "key",
        description: "Am Schlüsselbund befestigt, erspart er das Suchen unter Kissen oder in Taschen.",
      },
      {
        title: "Portemonnaie",
        icon: "wallet",
        description: "Kompakt und dezent, passt er ins Portemonnaie, ohne dieses zu verformen.",
      },
      {
        title: "Gepäck",
        icon: "luggage",
        description: "Verfolgen Sie Ihren Koffer während der Reise und finden Sie ihn bei der Ankunft leicht wieder.",
      },
    ],
    faq: [
      {
        question: "Brauche ich eine SIM-Karte oder ein Abo?",
        answer: "Nein. Der Anhänger nutzt ausschließlich Bluetooth sowie das Find My-Netzwerk von Apple und das Google-Ortungsnetzwerk — ohne SIM-Karte oder Abo.",
      },
      {
        question: "Funktioniert er mit einem Android-Smartphone?",
        answer: "Ja, er ist zusätzlich zum Find My-Netzwerk von Apple (MFi-zertifiziert) auch für das Google-Ortungsnetzwerk zertifiziert.",
      },
      {
        question: "Was passiert, wenn die Batterie leer ist?",
        answer: "Der Anhänger läuft mit einer austauschbaren Lithiumbatterie; eine Benachrichtigung warnt, bevor sie leer ist.",
      },
    ],
  },
  {
    slug: "detecteur-anti-espion",
    sku: "SG-RK021",
    badge: "Neu",
    category: "Spionage-Detektor",
    name: "Detektor für versteckte Kameras, GPS-Tracker und Mikrofone",
    shortName: "Detektor RK-021",
    tagline: "Erkennen Sie, was Sie überwacht, bevor es zu spät ist",
    price: 39.9,
    currency: "EUR",
    image: "/images/products/detector-wand-1.webp",
    shortDescription: "Multifunktionaler RF-, Magnet- und optischer Detektor: Tracker, versteckte Mikrofone und Kameras, Bluetooth-/WLAN-/4G-Signale.",
    description:
      "Ob im Hotelzimmer, in der Ferienwohnung, im Mietwagen oder im Konferenzraum — dieser Detektor spürt versteckte Überwachungsgeräte auf: Er erfasst Funksignale (GPS, Bluetooth, WLAN, 2G/3G/4G-Netze) sowie die Magnetfelder magnetischer Tracker, mit einstellbarem Empfindlichkeitsregler. Die externe LED-Sonde ermöglicht zusätzlich das visuelle Erkennen des Objektiv-Reflexes einer versteckten Kamera, selbst wenn diese ausgeschaltet ist.",
    highlights: [
      "Kombinierte RF-Erkennung: GPS, Bluetooth, WLAN, 2G/3G/4G",
      "Magnetfeld-Detektor für magnetische Tracker",
      "Externe LED-Sonde zur Erkennung versteckter Kameraobjektive",
      "Einstellbare Empfindlichkeit, 1 Jahr Garantie",
    ],
    specs: [
      { label: "Typ", value: "Multifunktionaler RF- / Magnet- / optischer Detektor" },
      { label: "Erkannte Signale", value: "GPS, Bluetooth, WLAN, 2G/3G/4G-Netze" },
      { label: "Magneterkennung", value: "Ja — Tracker und magnetische Geräte" },
      { label: "Kameradetektor", value: "Externe LED-Sonde, Erkennung per Objektiv-Reflex" },
      { label: "Einstellung", value: "Manueller Empfindlichkeitsregler" },
      { label: "Stromversorgung", value: "Wiederaufladbarer Akku" },
      { label: "Garantie", value: "1 Jahr" },
    ],
    useCases: [
      {
        title: "Hotelzimmer & Ferienwohnungen",
        icon: "bed",
        description: "Überprüfen Sie ein Hotelzimmer oder eine Ferienwohnung bei Ankunft in wenigen Minuten.",
      },
      {
        title: "Mietwagen",
        icon: "car",
        description: "Erkennen Sie einen möglicherweise versteckten Magnet-Tracker in einem Mietfahrzeug.",
      },
      {
        title: "Vertrauliche Meetings",
        icon: "briefcase",
        description: "Erkennen Sie ein verstecktes Mikrofon vor einem sensiblen geschäftlichen Gespräch.",
      },
      {
        title: "Umkleiden & Kabinen",
        icon: "camera",
        description: "Erkennen Sie visuell das Objektiv einer versteckten Kamera dank der externen LED-Sonde.",
      },
    ],
    faq: [
      {
        question: "Erkennt der Detektor auch ausgeschaltete Kameras?",
        answer: "Die externe LED-Sonde erkennt den Objektiv-Reflex auch im ausgeschalteten Zustand; die RF-Erkennung erfasst dagegen nur aktive Geräte, die ein Signal aussenden.",
      },
      {
        question: "Kann es zu Fehlalarmen kommen?",
        answer: "Ja, in dicht besiedelten städtischen Umgebungen (WLAN, Bluetooth in der Umgebung); der Empfindlichkeitsregler ermöglicht eine Anpassung an den jeweiligen Kontext.",
      },
      {
        question: "Wie wird das Gerät mit Strom versorgt?",
        answer: "Über einen integrierten, wiederaufladbaren Akku, per mitgeliefertem USB-Kabel.",
      },
    ],
  },
  {
    slug: "obd",
    sku: "SG-OBD",
    badge: "Neu",
    category: "OBD-GPS-Tracker",
    name: "OBD-Tracker",
    shortName: "OBD",
    tagline: "Wird direkt in die OBD-Buchse gesteckt, keine Verkabelung",
    price: 39.9,
    currency: "EUR",
    image: "/images/products/obd-1.webp",
    gallery: ["/images/products/obd-1.webp", "/images/products/obd-2.webp", "/images/products/obd-3.webp"],
    shortDescription: "4G-GPS-Tracker, der direkt in die OBD-Buchse des Fahrzeugs gesteckt wird — ohne Verkabelung oder Installation.",
    description:
      "Er wird direkt in die OBD-Buchse des Fahrzeugs gesteckt — keine Verkabelung, kein Werkzeug — und überträgt seine Position in Echtzeit über das 4G-Netz. Wird er abgezogen, übernimmt der Reserveakku für bis zu 2 Std. Geofencing, Geschwindigkeitsalarm und Vibrationsalarm ermöglichen die Festlegung von Zonen und eine Benachrichtigung beim Verlassen einer Zone oder bei verdächtigen Bewegungen. Kompatibel mit den meisten Fahrzeugen (12–36 V), 1 Jahr Garantie.",
    highlights: [
      "Sofortige Installation über die OBD-Buchse, ohne Verkabelung",
      "4G-Netz, 5 Meter Ortungsgenauigkeit",
      "Geofencing und Geschwindigkeitsalarm",
      "Reserveakku für bis zu 2 Std. bei Trennung",
    ],
    specs: [
      { label: "Typ", value: "Plug-and-Play OBD-GPS-Tracker" },
      { label: "Ortung", value: "GPS, LBS, Beidou" },
      { label: "Netz", value: "4G (LTE-FDD B1/B3/B5/B8, LTE-TDD B34/B38/B39/B40/B41)" },
      { label: "Stromversorgung", value: "Fahrzeug-OBD-Buchse, 12–36 V DC" },
      { label: "Reserveakku", value: "55 mAh — bis zu 2 Std. Laufzeit" },
      { label: "Ortungsgenauigkeit", value: "5 Meter" },
      { label: "Funktionen", value: "Geofencing, Vibrationsalarm, Geschwindigkeitsalarm, Loop-Aufzeichnung, Fernüberwachung" },
      { label: "Ortung", value: "Android/iOS-App, PC" },
      { label: "Betriebstemperatur", value: "-20 °C bis 60 °C" },
      { label: "Abmessungen", value: "48 x 25 x 30 mm" },
      { label: "Gewicht", value: "30,8 g" },
      { label: "Garantie", value: "1 Jahr" },
    ],
    useCases: [
      {
        title: "Autos & Motorräder",
        icon: "car",
        description: "Sofortige Installation über die OBD-Buchse, ohne Werkzeug oder Verkabelung.",
      },
      {
        title: "Fahranfänger",
        icon: "child",
        description: "Einfach zu installieren und zu entfernen — ideal, um ein verliehenes Fahrzeug im Blick zu behalten.",
      },
      {
        title: "Firmenflotten",
        icon: "briefcase",
        description: "Schnelle Ausstattung mehrerer Fahrzeuge dank verkabelungsfreier Installation.",
      },
      {
        title: "Fahrende Angehörige",
        icon: "senior",
        description: "Behalten Sie die Fahrten eines Angehörigen diskret im Blick, ohne technischen Eingriff.",
      },
    ],
    faq: [
      {
        question: "Benötigt dieser Tracker eine SIM-Karte?",
        answer: "Ja, eine 4G-SIM-Karte mit aktivem Datentarif ist erforderlich (nicht im Lieferumfang enthalten) für die Echtzeit-Positionsübertragung.",
      },
      {
        question: "Ist er mit meinem Auto kompatibel?",
        answer: "Ja, er funktioniert mit den meisten Fahrzeugen, die über eine Standard-OBD-Buchse verfügen, Stromversorgung 12–36 V.",
      },
      {
        question: "Was passiert, wenn ihn jemand abzieht?",
        answer: "Der Reserveakku übernimmt für bis zu 2 Std., und ein Trennungsalarm kann eingerichtet werden.",
      },
    ],
  },
  {
    slug: "alarme-sos",
    sku: "SG-SOS253",
    badge: "Neu",
    category: "Persönlicher Alarm",
    name: "SOS GPS-Schlüsselanhänger-Alarm",
    shortName: "SOS-Alarm",
    tagline: "Die Geste, die in einer Sekunde alle alarmiert",
    price: 24.9,
    currency: "EUR",
    image: "/images/products/alarme-porteclef-2.webp",
    shortDescription: "130-dB-Personenalarm mit SOS-Knopf, Positionsfreigabe per SMS und Anruf sowie LED-Taschenlampe — kabellos, ohne App.",
    description:
      "Ein Druck auf den SOS-Knopf löst eine 130-dB-Sirene mit Stroboskoplicht aus, um sofort Aufmerksamkeit zu erregen, während gleichzeitig eine SMS-Benachrichtigung gesendet und voreingestellte Notfallkontakte mit GPS-Position angerufen werden. Die 25-Lux-LED-Taschenlampe rundet das Gerät für dunkle Umgebungen ab. Keine App nötig: Alles funktioniert kabellos, direkt nach dem Auspacken. Kompakt (94 x 30 x 13 mm) und leicht (26 g), wird sie dank integriertem Karabiner an Schlüsselbund, Tasche oder Gürtel befestigt.",
    highlights: [
      "130-dB-Sirene mit SOS-Stroboskoplicht",
      "Automatische SMS-Benachrichtigung und Anruf bei Notfallkontakten mit GPS-Position",
      "Integrierte 25-Lux-LED-Taschenlampe",
      "Kabellos, ohne App — wiederaufladbarer Akku, bis zu 2 Std. Dauerbetrieb",
    ],
    specs: [
      { label: "Typ", value: "Tragbarer persönlicher Sicherheitsalarm" },
      { label: "Schallpegel", value: "130 dB" },
      { label: "Alarmfunktion", value: "Sirene + SOS-Stroboskoplicht + Anruf/SMS + GPS-Position" },
      { label: "Beleuchtung", value: "LED-Taschenlampe, 25 Lux" },
      { label: "Akku", value: "Wiederaufladbar, 200 mAh, 3,7 V — bis zu 2 Std. Dauerbetrieb" },
      { label: "Material", value: "ABS + PC" },
      { label: "Wasserdichtigkeit", value: "Nicht wasserdicht" },
      { label: "Abmessungen", value: "94 x 30 x 13 mm" },
      { label: "Gewicht", value: "26 g" },
      { label: "Normen", value: "CE- / FCC- / RoHS-zertifiziert" },
    ],
    useCases: [
      {
        title: "Alleinlebende Senioren",
        icon: "senior",
        description: "Ein einfacher Knopf, um Angehörige bei einem Sturz oder Hilfebedarf zu alarmieren, egal wo sie sind.",
      },
      {
        title: "Alleinunterwegs",
        icon: "key",
        description: "Am Schlüsselbund befestigt, stets griffbereit bei Wegen allein, tags wie nachts.",
      },
      {
        title: "Solo-Reisen & Wandern",
        icon: "luggage",
        description: "Kompakt und leicht, passt sie in jede Tasche für Ausflüge oder Reisen allein.",
      },
      {
        title: "Jugendliche auf dem Nachhauseweg",
        icon: "child",
        description: "Ein einfacher Reflex, der beruhigt, ohne den Alltag zu verkomplizieren.",
      },
    ],
    faq: [
      {
        question: "Funktioniert der Alarm ohne App oder SIM-Karte?",
        answer: "Ja, alles funktioniert kabellos, direkt nach dem Auspacken: keine App oder SIM-Karte erforderlich.",
      },
      {
        question: "Ist sie wasserdicht?",
        answer: "Nein, sie ist nicht wasserdicht: Regen oder Untertauchen vermeiden.",
      },
      {
        question: "Wie wird sie aufgeladen?",
        answer: "Über ein USB-Kabel, für bis zu 2 Std. Dauerbetrieb bei voller Ladung.",
      },
    ],
  },
];
