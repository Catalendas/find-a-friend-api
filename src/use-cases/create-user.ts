import { Role, User } from "@prisma/client";
import { UsersRepository } from "../repositories/users-repository";
import bcryptjs from "bcryptjs"
import { UserEmailAlreadyExistsError } from "./errors/userEmailAlredyExistsError";

interface CreateUserUseCaseProps {
    name: string
    email: string,
    password: string,
    addres: string,
    cep: string,
    phone: string,
    role: Role | undefined,
}

interface CreateUserUseCaseResponse {
    user: User
}

export class CreateUserUseCase {
    constructor (private usersRepository: UsersRepository) {}

    async execute({
        name,
        email,
        password,
        addres,
        cep,
        phone,
        role,
    }: CreateUserUseCaseProps): Promise<CreateUserUseCaseResponse> {
        const user_password = await bcryptjs.hash(password, 6)
        
        const userWithSomeEmail = await this.usersRepository.findByEmail(email)

        if (userWithSomeEmail) {
            throw new UserEmailAlreadyExistsError()
        }

        const user = await this.usersRepository.create({
            user_name: name,
            user_email: email,
            user_password,
            addres,
            cep,
            phone,
            role,
        })

        return {
            user
        }

    }
}