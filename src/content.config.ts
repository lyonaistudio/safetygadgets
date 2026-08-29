import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const actualites = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/actualites" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    category: z.string(),
    // Slug produit (voir src/data/products.ts) mis en avant en fin d'article.
    relatedProduct: z.string().optional(),
    sources: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
  }),
});

export const collections = { actualites };
