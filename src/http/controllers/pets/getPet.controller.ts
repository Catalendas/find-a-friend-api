import { makeGetPet } from "@/use-cases/factories/make-get-pet";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
    const getPetSchema = z.object({
        id: z.string()
    })

    const {
        id
    } = getPetSchema.parse(request.params)

    const getPetUseCase = makeGetPet()

    const { pet } = await getPetUseCase.execute({ id })
    
    return reply.status(200).send(pet)
}