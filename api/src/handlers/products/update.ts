import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { prisma } from "../../lib/prisma";

import {
	paramsSchema,
	bodySchema,
	responseSchema,
} from "../../schemas/products/update";

export async function updateProducts(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().route({
		method: "PUT",
		url: "/api/products/:id",
		schema: {
			summary: "Atualizar um produtos específico",
			tags: ["products"],
			params: paramsSchema,
			body: bodySchema,
			response: responseSchema,
		},
		handler: async (req, res) => {
			const { id } = req.params;
			const { name, category, price, description, imageUrl } = req.body;

			if (!id) {
				return res.status(400).send({ message: "Produto não encontrado" });
			}

			const product = await prisma.product.update({
				where: {
					id,
				},
				data: {
					name,
					category,
					price,
					description,
					imageUrl,
				},
			});

			if (!product) {
				return res.status(400).send({ message: "Produto não encontrado" });
			}

			return res.status(200).send(product);
		},
	});
}
