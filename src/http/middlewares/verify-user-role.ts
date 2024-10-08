import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(userRole: 'USER' | 'ONG') {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const { role } = request.user

        if (role !== userRole) {
            return reply.status(401).send({ message: 'Unauthorized.' })
        }
    }
}