import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentials } from "./errors/invalidCredentials";

let userRpository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
    beforeEach(() => {
        userRpository = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(userRpository)
    })

    it('Shold be able to authenticate', async () => {
        await userRpository.create({
            user_name: 'Jhon Doe',
            user_email: 'johndoe@email.com',
            user_password: await hash('12345', 6),
            addres: 'any',
            cep: '11111-111',
            phone: '(19)9999999',
            role: 'ONG',
        })

        const { user } = await sut.execute({
            email: 'johndoe@email.com',
            password: '12345',
        })

        expect(user.user_id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        await expect(() => sut.execute({
            email: 'johndoe@email.com',
            password: '12345',
        })).rejects.toBeInstanceOf(InvalidCredentials)
    })

    it('should not be able to authenticate with wrong password', async () => {
        await userRpository.create({
            user_name: 'Jhon Doe',
            user_email: 'johndoe@email.com',
            user_password: await hash('12345', 6),
            addres: 'any',
            cep: '11111-111',
            phone: '(19)9999999',
            role: 'ONG',
        })

        await expect(() => sut.execute({
            email: 'johndoe@email.com',
            password: '123467',
        })).rejects.toBeInstanceOf(InvalidCredentials)
    })


})