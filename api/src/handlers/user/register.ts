import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { prisma } from "../../lib/prisma";

import { bodySchema, responseSchema } from "../../schemas/user/register";

export async function registerUser(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().route({
		method: "POST",
		url: "/api/auth/register",
		schema: {
			summary: "Registrar novo usuário",
			tags: ["auth"],
			body: bodySchema,
			response: responseSchema,
		},
		handler: async (req, res) => {
			const { email, name, address, phone } = req.body;

			const user = await prisma.user.findUnique({
				where: {
					email,
				},
			});

			if (user) {
				return res.status(400).send({ message: "Usuário já cadastrado" });
			}

			await prisma.user.create({
				data: {
					email,
					name,
					address,
					phone,
				},
			});

			return res
				.status(200)
				.send({ message: "Usuário cadastrado com sucesso" });
		},
	});
}
