import { PrismaPetRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetUseCase } from "../get-pets";

export function makeGetPet() {
    const prismaPetRepository = new PrismaPetRepository()
    const getPetUseCase = new GetPetUseCase(prismaPetRepository)

    return getPetUseCase
}