import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
    register(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    fetch(user_id: string | undefined, description?: string): Promise<Pet[] | null>
    getPet(id: string): Promise<Pet | null>
}