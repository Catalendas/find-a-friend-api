import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements UsersRepository {
    public users: User[] = []

    async create(data: Prisma.UserCreateInput) {
        const user = {
            user_id: data.user_id ?? randomUUID(),
            user_name: data.user_name,
            user_email: data.user_email,
            user_password: data.user_password,
            addres: data.addres,
            cep: data.cep,
            phone: data.phone,
            role: data.role!,
            created_at: new Date(),
            updated_at: new Date()
        }

        this.users.push(user)

        return user
    }

    async findByEmail(email: string) {
        const user = this.users.find((item) => item.user_email === email)

        if (!user) {
            return null
        }

        return user
    }

    async findByCep(cep: string) {
        const users = await this.users.find((item) => item.cep === cep)

        if (!users) {
            return null
        }

        return users
    }

}