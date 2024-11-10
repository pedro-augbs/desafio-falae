import { z } from "zod";

export const bodySchema = z.object({
	userId: z.string().uuid("Formato inválido"),
	products: z.array(
		z.object({
			productId: z.string().uuid("Formato inválido"),
			quantity: z.coerce.number().min(1, "Quantidade deve ser maior que 0"),
		}),
	),
});

export const responseSchema = {
	200: z.object({
		id: z.string(),
	}),
	400: z.object({
		message: z.string(),
	}),
};
