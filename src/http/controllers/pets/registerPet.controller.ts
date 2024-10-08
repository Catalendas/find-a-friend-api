import { makeRegisterPet } from "@/use-cases/factories/make-register-pet";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerPet(request: FastifyRequest, reply: FastifyReply) {
    const registerPetSchema = z.object({
        name: z.string(),
        description: z.string(),
        age: z.string(),
        size: z.number(),
        energy_level: z.number(),
        level_of_independence: z.number(),
        environment: z.string(),
        requirements: z.string(),
    })

    const {
        name,
        description,
        age,
        size,
        energy_level,
        level_of_independence,
        environment,
        requirements,
    } = registerPetSchema.parse(request.body)

    const sub = request.user.sub

    const registerPet = makeRegisterPet()

    const pet = await registerPet.execute({
        age,
        description,
        energy_level,
        environment,
        level_of_independence,
        name,
        requirements,
        size,
        user_id: sub
    })

    return reply.status(201).send(pet)
}