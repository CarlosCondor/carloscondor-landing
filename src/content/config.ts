import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    coverImage: z.string().nullable().optional(),
    coverAlt: z.string().default(''),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(true),
  }),
});

export const collections = { blog };
