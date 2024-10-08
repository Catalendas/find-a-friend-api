import { PetsRepository } from "@/repositories/pets-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { RequiredCepToFetchPets } from "./errors/RequiredCepToFetchPets";

interface FetchPetsUseCaseProps {
    cep: string
    description?: string
}

export class FetchPetsUseCase {
    constructor(
        private petsRepository: PetsRepository,
        private userRepository: UsersRepository
    ) {}

    async execute({
        cep,
        description
    }: FetchPetsUseCaseProps) {

        if (!cep) {
            throw new RequiredCepToFetchPets()
        }

        const userByCep = await this.userRepository.findByCep(cep)

        const pets = await this.petsRepository.fetch(userByCep?.user_id, description)

        return { pets }
    }
}