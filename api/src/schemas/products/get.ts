import { z } from "zod";

export const paramsSchema = z.object({
	id: z.string().uuid("Formato inválido"),
});

export const responseSchema = {
	200: z.object({
		id: z.string(),
		name: z.string(),
		price: z.number(),
		category: z.string(),
		description: z.string().optional(),
		imageUrl: z.string().optional(),
	}),
	400: z.object({
		message: z.string(),
	}),
};
