import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"
import { app } from "@/app";

describe("Fetch pets (e2e)", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("Shold be able to fetch pets", async () => {
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


        await request(app.server)
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

        await request(app.server)
            .post('/pets')
            .set('Authorization', `Bearer ${auth.body.token}`)
            .send({
                user_id: user.body.user_id,
                name: 'cat',
                description:'Small cat',
                age: '1',
                size: 2,
                energy_level: 3,
                level_of_independence: 3,
                environment: 'Open',
                requirements: 'Large space',
            })

        const response = await request(app.server)
            .get('/pets')
            .query({
                cep: '11111111'
            })
            .set('Authorization', `Bearer ${auth.body.token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toHaveLength(2)

        })
})