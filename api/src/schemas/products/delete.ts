import { z } from "zod";

export const paramsSchema = z.object({
	id: z.string().uuid("Formato inválido"),
});

export const responseSchema = {
	200: z.object({
		message: z.string(),
	}),
	400: z.object({
		message: z.string(),
	}),
};
