import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUserUseCase } from './create-user'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository' 
import { UserEmailAlreadyExistsError } from './errors/userEmailAlredyExistsError'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create user use Case', () => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        sut = new CreateUserUseCase(inMemoryUsersRepository)
    })

    it('Shold be able to create a user', async () => {
        const { user } = await sut.execute({
            name: 'Jhon Doe',
            email: 'johndoe@email.com',
            password: '12345',
            addres: 'any',
            cep: '11111-111',
            phone: '(19)9999999',
            role: 'USER',
        })

        expect(user.user_id).toEqual(expect.any(String))
    })

    it('Shold be able to create a ong', async () => {
        const { user } = await sut.execute({
            name: 'Jhon Doe',
            email: 'johndoe@email.com',
            password: '12345',
            addres: 'any',
            cep: '11111-111',
            phone: '(19)9999999',
            role: 'ONG',
        })

        expect(user.role).toEqual('ONG')
    })

    it('Should not be possible to create a user with a registered email', async () => {
        await sut.execute({
            name: 'Jhon Doe',
            email: 'johndoe@email.com',
            password: '12345',
            addres: 'any',
            cep: '11111-111',
            phone: '(19)9999999',
            role: 'USER',
        })

        expect(async () => 
            await sut.execute({
                name: 'Jhon',
                email: 'johndoe@email.com',
                password: '12345',
                addres: 'any',
                cep: '11111-111',
                phone: '(19)9999999',
                role: 'USER',
            })
        ).rejects.toBeInstanceOf(UserEmailAlreadyExistsError)
    })
})