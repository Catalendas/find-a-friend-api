import { UserEmailAlreadyExistsError } from "@/use-cases/errors/userEmailAlredyExistsError";
import { makeCreateUser } from "@/use-cases/factories/make-create-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    const createUserSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        addres: z.string(),
        cep: z.string().max(8),
        phone: z.string(),
        role: z.enum(['USER', 'ONG']).default('USER'),
    })
    const {
        addres,
        cep,
        email,
        name,
        password,
        phone,
        role
    } = createUserSchema.parse(request.body)
    

    try {
        const userUseCase = makeCreateUser()

        await userUseCase.execute({
            addres,
            cep,
            email,
            name,
            password,
            phone,
            role
        })
    } catch(error) {
        if (error instanceof UserEmailAlreadyExistsError) {
            return reply.status(409).send({
                message: error.message,
            })
        }

        throw error
    }

    return reply.status(201).send()
}