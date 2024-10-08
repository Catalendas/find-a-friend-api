import { InvalidCredentials } from "@/use-cases/errors/invalidCredentials";
import { makeAuthenticate } from "@/use-cases/factories/make-authenticate";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateSchema = z.object({
        email: z.string().email(),
        password: z.string()
    })

    const {
        email,
        password
    } = authenticateSchema.parse(request.body)

    try {
        const authenticateUseCase = makeAuthenticate()

        const { user } = await authenticateUseCase.execute({
            email,
            password
        })

        const token = await reply.jwtSign(
            {
                role: user.role
            },
            {
                sign: {
                    sub: user.user_id
                }
            }
        )

        const refresh = await reply.jwtSign(
            {
                role: user.role
            },
            {
                sign: {
                    sub: user.user_id,
                    expiresIn: '7d'
                }
            }
        )

        return reply
            .setCookie('refreshToken', refresh, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true
            })
            .status(200)
            .send({
                token
            })

    } catch (err) {
        if (err instanceof InvalidCredentials) {
            return reply.status(409).send({
                message: err.message
            })
        }

        throw err
    }
}