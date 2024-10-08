import { PrismaPetRepository } from "@/repositories/prisma/prisma-pets-repository";
import { RegisterPetUseCase } from "../register-pet";

export function makeRegisterPet() {
    const prismaPetRepository = new PrismaPetRepository()
    const registerPet = new RegisterPetUseCase(prismaPetRepository)
    return registerPet
}