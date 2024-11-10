import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { prisma } from "../../lib/prisma";

import {
	querystringSchema,
	responseSchema,
} from "../../schemas/products/get-all";

export async function getAllProducts(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().route({
		method: "GET",
		url: "/api/products",
		schema: {
			summary: "Visualizar todos os produtos",
			tags: ["products"],
			querystring: querystringSchema,
			response: responseSchema,
		},
		handler: async (req, res) => {
			const { search } = req.query;

			const products = await prisma.product.findMany({
				where: {
					name: {
						contains: search || "",
					},
				},
				orderBy: {
					name: "asc",
				},
			});

			return res.status(200).send(products);
		},
	});
}
