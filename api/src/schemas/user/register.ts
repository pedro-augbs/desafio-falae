import { z } from "zod";

export const bodySchema = z.object({
	name: z
		.string()
		.min(1, "Nome é obrigatório")
		.max(255, "Nome deve ter no máximo 255 caracteres"),
	email: z
		.string()
		.email("Email inválido")
		.min(1, "Email é obrigatório")
		.max(255, "Email deve ter no máximo 255 caracteres"),
	address: z
		.string()
		.min(1, "Endereço é obrigatório")
		.max(255, "Endereço deve ter no máximo 255 caracteres"),
	phone: z
		.string()
		.min(8, "Telefone deve ter no mínimo 8 dígitos")
		.max(11, "Telefone deve ter no máximo 11 dígitos")
		.optional(),
});

export const responseSchema = {
	200: z.object({
		message: z.string(),
	}),
	400: z.object({
		message: z.string(),
	}),
};
