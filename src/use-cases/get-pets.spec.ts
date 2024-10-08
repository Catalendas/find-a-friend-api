import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetPetUseCase } from "./get-pets";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryPetsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get pet use case', () => {
    beforeEach(() => {
        inMemoryPetsRepository = new InMemoryPetsRepository()
        inMemoryUsersRepository = new InMemoryUsersRepository()
        sut = new GetPetUseCase(inMemoryPetsRepository)
    })


    it('Shold be able get a pet', async () => {
        const ong = await inMemoryUsersRepository.create({
            user_name: 'Jhon Doe',
            user_email: 'johndoe@email.com',
            user_password: '12345',
            addres: 'any',
            cep: '11111-111',
            phone: '(19)9999999',
            role: 'ONG',
        })

        const { pet_id } = await inMemoryPetsRepository.register({
            pet_name: 'dog',
            pet_description:'Large dog',
            age: '',
            size: 2,
            energy_level: 3,
            level_of_independence: 3,
            environment: 'Open',
            requirements: 'Large space',
            user_id: ong.user_id
        })

        const { pet } = await sut.execute({
            id: pet_id
        })

        expect(pet?.pet_id).toEqual(expect.any(String))
    })
})