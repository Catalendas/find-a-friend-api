import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { FastifyInstance } from "fastify";
import { registerPet } from "./registerPet.controller";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { fetchPets } from "./fetchPets.controller";
import { getPet } from "./getPet.controller";

export async function petsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.post('/pets', {
        onRequest: [verifyUserRole('ONG')]
    }, registerPet)

    app.get('/pets', fetchPets)
    app.get('/pets/:id', getPet)
}