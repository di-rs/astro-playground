import { file, glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const products = defineCollection({
  type: "data",
  schema: z.object({
    product_id: z.number(),
    product_name: z.string(),
    price: z.number(),
    in_stock: z.boolean(),
    colors: z.array(z.string()),
    details: z.object({
      brand: z.string(),
      model: z.string(),
      screen_size: z.number().optional(),
      wireless: z.boolean().optional(),
      features: z.array(z.string()),
    }),
  }),
});

export const collections = {
  products,
  posts: defineCollection({
    loader: glob({
      pattern: "src/data/posts/**/*.md",
    }),
    schema: ({ image }) =>
      z.object({
        title: z.string().max(32),
        tags: z.array(z.string()),
        pubDate: z.coerce.date(),
        isDraft: z.boolean(),
        canonicalURL: z.string().url().optional(),
        cover: image(),
        coverAlt: z.string(),
        author: reference("team"),
        slug: z.string(),
      }),
  }),
  team: defineCollection({
    loader: file("src/data/team.json"),
    schema: z.object({
      name: z.string(),
      role: z.string(),
      email: z.string().email(),
      department: z.enum([
        "Engineering",
        "Software Development",
        "Product Design",
      ]),
    }),
  }),
};
