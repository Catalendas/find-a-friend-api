import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository"
import { CreateUserUseCase } from "../create-user"

export function makeCreateUser() {
    const prismaUserRepository = new PrismaUserRepository()
    const createUserUseCase = new CreateUserUseCase(prismaUserRepository)

    return createUserUseCase
}