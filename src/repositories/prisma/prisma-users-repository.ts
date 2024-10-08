import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUserRepository implements UsersRepository {

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        })

        return user
    }
    
    async findByEmail(email: string) {
        const user = await prisma.user.findFirst({
            where: {
                user_email: email
            }
        })

        if (!user) {
            return null
        }

        return user
    }

    async findByCep(cep: string) {
        const user = await prisma.user.findFirst({
            where: {
                cep
            }
        })

        if (!user) {
            return null
        }

        return user
    }

}