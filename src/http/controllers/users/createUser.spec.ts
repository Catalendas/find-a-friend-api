import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"

describe('Create user (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it('Should be able to create a user', async () => {
        const response = await request(app.server)
            .post('/users')
            .send({
                name: 'Jhon Doe',
                email: 'johndoe@email.com',
                password: '12345',
                addres: 'any',
                cep: '11111111',
                phone: '(19)9999999',
                role: 'USER',
            })
        
        expect(response.status).toEqual(201)
    })
})