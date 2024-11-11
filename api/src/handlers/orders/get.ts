import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { prisma } from "../../lib/prisma";

import { paramsSchema, responseSchema } from "../../schemas/orders/get";

export async function getOrders(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().route({
		method: "GET",
		url: "/api/orders/:id",
		schema: {
			summary: "Visualizar um pedido específico",
			tags: ["orders"],
			params: paramsSchema,
			response: responseSchema,
		},
		handler: async (req, res) => {
			const { id } = req.params;

			if (!id) {
				return res.status(400).send({ message: "Produto não encontrado" });
			}

			const order = await prisma.order.findUnique({
				where: {
					id,
				},
				select: {
					id: true,
					totalPrice: true,
					status: true,
					createdAt: true,
					orderItem: true,
				},
			});

			if (!order) {
				return res.status(400).send({ message: "Produto não encontrado" });
			}

			const products = [];

			for (const item of order.orderItem) {
				const product = await prisma.product.findUnique({
					where: {
						id: item.productId,
					},
				});

				products.push({
					name: product.name,
					quantity: item.quantity,
					price: product.price,
				});
			}

			const { orderItem: _, ...rest } = {
				...order,
				products,
			};

			return res.status(200).send(rest);
		},
	});
}
