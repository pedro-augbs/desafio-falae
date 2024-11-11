import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { prisma } from "../../lib/prisma";

import { bodySchema, responseSchema } from "../../schemas/orders/register";

export async function registerOrders(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().route({
		method: "POST",
		url: "/api/orders",
		schema: {
			summary: "Registrar novo produto",
			tags: ["orders"],
			body: bodySchema,
			response: responseSchema,
		},
		handler: async (req, res) => {
			const { userId, products } = req.body;

			const user = await prisma.user.findUnique({
				where: {
					id: userId,
				},
			});

			if (!user) {
				return res.status(400).send({ message: "Usuário não encontrado" });
			}

			let totalPrice = 0;

			for (const item of products) {
				const product = await prisma.product.findUnique({
					where: {
						id: item.productId,
					},
				});

				if (!product) {
					return res.status(400).send({ message: "Produto não encontrado" });
				}

				totalPrice += item.quantity * product.price;
			}

			const order = await prisma.order.create({
				data: {
					userId,
					totalPrice,
					orderItem: {
						createMany: {
							data: products.map((item) => ({
								productId: item.productId,
								quantity: item.quantity,
							})),
						},
					},
				},
			});

			return res.status(200).send({ id: order.id });
		},
	});
}
