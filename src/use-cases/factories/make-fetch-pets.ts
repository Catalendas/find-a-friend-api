import { PrismaPetRepository } from "@/repositories/prisma/prisma-pets-repository";
import { RegisterPetUseCase } from "../register-pet";
import { FetchPetsUseCase } from "../fetch-pets";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeFatchPet() {
    const prismaPetRepository = new PrismaPetRepository()
    const prismaUserRepository = new PrismaUserRepository()
    const registerPet = new FetchPetsUseCase(prismaPetRepository, prismaUserRepository)
    
    return registerPet
}