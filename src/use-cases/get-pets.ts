import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface GetPetUseCaseProps {
    id: string
}

interface GetPetUseCaseResponse {
    pet: Pet | null
}

export class GetPetUseCase {

    constructor(private petRepository: PetsRepository) { }

    async execute({
        id
    }: GetPetUseCaseProps): Promise<GetPetUseCaseResponse> {
        const pet = await this.petRepository.getPet(id)

        return {
            pet
        }
    }
}