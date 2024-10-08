import { FastifyInstance } from "fastify";
import { createUser } from "./createUser.controller";
import { authenticate } from "./authenticate.controller";

export async function usersRoutes(app: FastifyInstance) {
    app.post("/users", createUser)
    app.post("/sessions", authenticate)
}