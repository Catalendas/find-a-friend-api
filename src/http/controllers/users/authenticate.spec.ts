import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"

describe('Authenticate (e2e', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Shold be able to authenticate', async () => {
        await request(app.server)
            .post('/users')
            .send({
                name: 'Jhon Doe',
                email: 'jhondoe@email.com',
                password: '12345',
                addres: 'any',
                cep: '11111111',
                phone: '(19)9999999',
                role: 'USER',
            })

        const response = await request(app.server)
            .post('/sessions')
            .send({
                email: 'jhondoe@email.com',
                password: '12345'
            })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    })
})