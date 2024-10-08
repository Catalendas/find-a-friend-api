import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"

describe('Register pet (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able to register a pet.', async () => {
        const user = await request(app.server)
            .post('/users')
            .send({
                name: 'Jhon Doe',
                email: 'jhondoe@email.com',
                password: '12345',
                addres: 'any',
                cep: '11111111',
                phone: '(19)9999999',
                role: 'ONG',
            })
        
        const auth = await request(app.server)
            .post('/sessions')
            .send({
                email: 'jhondoe@email.com',
                password: '12345'
            })


        const respose = await request(app.server)
            .post('/pets')
            .set('Authorization', `Bearer ${auth.body.token}`)
            .send({
                user_id: user.body.user_id,
                name: 'dog',
                description:'Small dog',
                age: '4',
                size: 2,
                energy_level: 3,
                level_of_independence: 3,
                environment: 'Open',
                requirements: 'Large space',
            })

        expect(respose.statusCode).toEqual(201)
    })
})