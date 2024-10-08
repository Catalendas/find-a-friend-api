import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface RegisterPetUseCaseProps {
    user_id: string
    name: string,
    description: string,
    age: string,
    size: number,
    energy_level: number,
    level_of_independence: number,
    environment: string,
    requirements: string,
}

interface RegisterPetUseCaseResponse {
    pet: Pet
}

export class RegisterPetUseCase {
    constructor(private petsRepository: PetsRepository) {}

    async execute({
        user_id,
        name,
        description,
        age,
        size,
        energy_level,
        level_of_independence,
        environment,
        requirements,
    }: RegisterPetUseCaseProps): Promise<RegisterPetUseCaseResponse> {
        const pet = await this.petsRepository.register({
            user_id,
            pet_name: name,
            pet_description: description,
            age,
            size,
            energy_level,
            level_of_independence,
            environment,
            requirements,
        })

        return {
            pet
        }
    }
}