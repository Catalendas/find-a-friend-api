import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { InvalidCredentials } from "./errors/invalidCredentials";
import bcrypt from "bcryptjs"

interface AuthenticateUseCaseProps {
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        email,
        password
    }: AuthenticateUseCaseProps): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentials()
        }

        const doesPasswordMatch = await bcrypt.compare(password, user.user_password)

        if (!doesPasswordMatch) {
            throw new InvalidCredentials()
        }

        return {
            user
        }
    }
}