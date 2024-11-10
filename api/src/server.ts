import { fastify } from "fastify";
import fastifyCors from "@fastify/cors";
import {
	type ZodTypeProvider,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

import { initDatabase } from "./lib/prisma";

import { registerUser } from "./handlers/user/register";
import { registerProducts } from "./handlers/products/register";
import { getAllProducts } from "./handlers/products/get-all";

const port = 3333;
const host = "0.0.0.0";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
	origin: "http://localhost:3000",
	methods: ["GET", "POST", "PUT", "DELETE"],
});

app.register(fastifySwagger, {
	swagger: {
		consumes: ["application/json"],
		produces: ["application/json"],
		info: {
			title: "Desafio Falae API",
			description:
				"Especificações da API para o back-end da aplicação de desafio Falae.",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
	routePrefix: "/docs",
});

app.register(registerUser);
app.register(registerProducts);
app.register(getAllProducts);

initDatabase()
	.then(() => {
		console.log("Database connected");
	})
	.catch((err) => {
		console.error("Error connecting to database: ", err);
		process.exit(1);
	});

app
	.listen({ port, host })
	.then(() => {
		console.log(`listening on port ${port}`);
	})
	.catch((err) => {
		console.error("Error starting server: ", err);
		process.exit(1);
	});
