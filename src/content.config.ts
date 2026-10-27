import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';
const posts = defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/posts'}),schema:z.object({title:z.string(),description:z.string(),date:z.coerce.date(),updated:z.coerce.date().optional(),category:z.enum(['工程','單車','旅行']),tags:z.array(z.string()).default([]),project:z.enum(['okinawa','iron-camel','kagawa']).optional(),draft:z.boolean().default(true)})});
export const collections = {posts};
