import { beforeEach, describe, expect, it } from "vitest";
import { RegisterPetUseCase } from "./register-pet";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryPetsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Pet use case', () => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        inMemoryPetsRepository = new InMemoryPetsRepository()
        sut = new RegisterPetUseCase(inMemoryPetsRepository)
    })

    it('Shold be able to register a pet', async () => {
        const user = await inMemoryUsersRepository.create({
            user_name: 'Jhon Doe',
            user_email: 'johndoe@email.com',
            user_password: '12345',
            addres: 'any',
            cep: '11111-111',
            phone: '(19)9999999',
            role: 'ONG',
        })
        
        const { pet } = await sut.execute({
            name: 'dog',
            description:'Small dog',
            age: '',
            size: 2,
            energy_level: 3,
            level_of_independence: 3,
            environment: 'Open',
            requirements: 'Large space',
            user_id: user.user_id
        })

        expect(pet.pet_id).toEqual(expect.any(String))
    })
})