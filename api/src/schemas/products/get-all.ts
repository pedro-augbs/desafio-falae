import { z } from "zod";

export const querystringSchema = z.object({
	search: z.string().optional(),
});

export const responseSchema = {
	200: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			price: z.number(),
			category: z.string(),
			description: z.string().optional(),
			imageUrl: z.string().optional(),
		}),
	),
};
