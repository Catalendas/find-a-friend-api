import { makeFatchPet } from "@/use-cases/factories/make-fetch-pets";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchPets(request: FastifyRequest, reply: FastifyReply) {
    const fetchPetsSchema = z.object({
        cep: z.string()
    })

    const {
        cep
    } = fetchPetsSchema.parse(request.query)

    const fetchPetsuseCase = makeFatchPet()

    const { pets } = await fetchPetsuseCase.execute({
        cep
    })

    return reply.status(200).send(pets)
}