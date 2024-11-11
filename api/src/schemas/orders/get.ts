import { z } from "zod";

export const paramsSchema = z.object({
	id: z.string().uuid("Formato inválido"),
});

export const responseSchema = {
	200: z.object({
		id: z.string(),
		totalPrice: z.coerce.number(),
		status: z.string(),
		createdAt: z.date(),
		products: z.array(
			z.object({
				name: z.string(),
				quantity: z.coerce.number(),
				price: z.coerce.number(),
			}),
		),
	}),
	400: z.object({
		message: z.string(),
	}),
};
