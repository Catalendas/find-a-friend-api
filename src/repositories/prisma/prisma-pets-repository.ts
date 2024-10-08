import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetRepository implements PetsRepository {
    async register(data: Prisma.PetUncheckedCreateInput) {
        const pet = await prisma.pet.create({
            data
        })

        return pet
    }

    async fetch(user_id: string | undefined, description?: string): Promise<Pet[] | null> {
        const pets = await prisma.pet.findMany({
            where: {
                user_id,
                pet_description: description, 
            }
        })

        if (!pets) {
            return null
        }

        return pets
    }

    async getPet(id: string) {
        const pet = await prisma.pet.findUnique({
            where: {
                pet_id: id
            }
        })

        if (!pet) {
            return null
        }

        return pet
    }
}