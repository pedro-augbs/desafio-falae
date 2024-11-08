import { z } from "zod";

export const bodySchema = z.object({
	name: z
		.string()
		.min(1, "Nome é obrigatório")
		.max(255, "Nome deve ter no máximo 255 caracteres"),
	category: z
		.string()
		.min(1, "Categoria é obrigatória")
		.max(255, "Categoria deve ter no máximo 255 caracteres"),
	price: z.coerce.number().min(0.01, "Preço deve ser maior que 0.01"),
	description: z
		.string()
		.min(1, "Descrição é obrigatória")
		.max(255, "Descrição deve ter no máximo 255 caracteres"),
	imageUrl: z.string().url("URL inválida").optional(),
});

export const responseSchema = {
	200: z.object({
		message: z.string(),
	}),
};
