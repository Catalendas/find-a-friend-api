import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticate() {
    const prismaUserRepository = new PrismaUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository)

    return authenticateUseCase
}