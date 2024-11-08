import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { prisma } from "../../lib/prisma";

import { bodySchema, responseSchema } from "../../schemas/products/register";

export async function registerProducts(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().route({
		method: "POST",
		url: "/api/products",
		schema: {
			summary: "Registrar novo produto",
			tags: ["products"],
			body: bodySchema,
			response: responseSchema,
		},
		handler: async (req, res) => {
			const { name, category, description, price, imageUrl } = req.body;

			await prisma.product.create({
				data: {
					name,
					category,
					price,
					description,
					imageUrl,
				},
			});

			return res
				.status(200)
				.send({ message: "Produto cadastrado com sucesso" });
		},
	});
}
