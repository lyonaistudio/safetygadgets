import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "../../lib/site";

export const GET: APIRoute = async (context) => {
  const articles = await getCollection("actualites");
  return rss({
    title: `${SITE.name} — Actualités & conseils`,
    description: "Vols, cambriolages, suivi non consenti : nos articles de fond sur la sécurité.",
    site: context.site ?? SITE.url,
    items: articles
      .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())
      .map((article) => ({
        title: article.data.title,
        description: article.data.description,
        pubDate: article.data.publishDate,
        link: `/actualites/${article.id}/`,
      })),
  });
};
