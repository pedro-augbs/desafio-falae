import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { prisma } from "../../lib/prisma";

import { paramsSchema, responseSchema } from "../../schemas/products/delete";

export async function deleteProducts(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().route({
		method: "DELETE",
		url: "/api/products/:id",
		schema: {
			summary: "Visualizar um produtos específico",
			tags: ["products"],
			params: paramsSchema,
			response: responseSchema,
		},
		handler: async (req, res) => {
			const { id } = req.params;

			if (!id) {
				return res.status(400).send({ message: "Produto não encontrado" });
			}

			const product = await prisma.product.delete({
				where: {
					id,
				},
			});

			if (!product) {
				return res.status(400).send({ message: "Produto não encontrado" });
			}

			return res.status(200).send({ message: "Produto deletado com sucesso" });
		},
	});
}
