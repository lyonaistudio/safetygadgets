import { SITE } from "./site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    sameAs: SITE.sameAs,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.url}`,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function articleSchema(options: {
  title: string;
  description: string;
  slug: string;
  publishDate: Date;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: options.title,
    description: options.description,
    datePublished: options.publishDate.toISOString(),
    url: `${SITE.url}/actualites/${options.slug}/`,
    author: {
      "@type": "Organization",
      name: SITE.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
    },
  };
}

export function productSchema(options: {
  name: string;
  description: string;
  image: string;
  slug: string;
  price: number;
  currency: string;
  sku: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: options.name,
    description: options.description,
    image: `${SITE.url}${options.image}`,
    sku: options.sku,
    brand: {
      "@type": "Brand",
      name: SITE.name,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/traceurs-gps/${options.slug}/`,
      priceCurrency: options.currency,
      price: options.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: SITE.name,
      },
    },
  };
}
