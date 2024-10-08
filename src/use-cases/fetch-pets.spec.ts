import { beforeEach, describe, expect, it } from "vitest";
import { FetchPetsUseCase } from "./fetch-pets";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryUserRepository: InMemoryUsersRepository
let sut: FetchPetsUseCase

describe('Fetch pets use case', () => {
    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUsersRepository()
        inMemoryPetsRepository = new InMemoryPetsRepository()
        sut = new FetchPetsUseCase(inMemoryPetsRepository, inMemoryUserRepository)
    })

    it('Shoult be able to fetch avalale pets in city', async () => {
        const ong = await inMemoryUserRepository.create({
            user_name: 'Jhon Doe',
            user_email: 'johndoe@email.com',
            user_password: '12345',
            addres: 'any',
            cep: '11111-111',
            phone: '(19)9999999',
            role: 'ONG',
        })

        await inMemoryPetsRepository.register({
            pet_name: 'dog',
            pet_description:'Small dog',
            age: '',
            size: 2,
            energy_level: 3,
            level_of_independence: 3,
            environment: 'Open',
            requirements: 'Large space',
            user_id: ong.user_id
        })

        await inMemoryPetsRepository.register({
            pet_name: 'cat',
            pet_description:'Small cat',
            age: '',
            size: 1,
            energy_level: 4,
            level_of_independence: 3,
            environment: 'Open',
            requirements: 'Large space',
            user_id: ong.user_id
        })

        const { pets } = await sut.execute({ cep: '11111-111'})

        expect(pets).toHaveLength(2)
    })

    it('Deve ser capaz de filtrar animais de estimação por suas características', async () => {
        const ong = await inMemoryUserRepository.create({
            user_name: 'Jhon Doe',
            user_email: 'johndoe@email.com',
            user_password: '12345',
            addres: 'any',
            cep: '11111-111',
            phone: '(19)9999999',
            role: 'ONG',
        })

        await inMemoryPetsRepository.register({
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

        await inMemoryPetsRepository.register({
            pet_name: 'cat',
            pet_description:'Small cat',
            age: '',
            size: 1,
            energy_level: 4,
            level_of_independence: 3,
            environment: 'Open',
            requirements: 'Large space',
            user_id: ong.user_id
        })

        const { pets } = await sut.execute({
            cep: '11111-111',
            description: 'small'
        })

        expect(pets).toHaveLength(1)
    })
})
