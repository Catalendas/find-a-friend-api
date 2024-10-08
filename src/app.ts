import fastify from "fastify";
import { usersRoutes } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { petsRoutes } from "./http/controllers/pets/routes";

export const app = fastify()

app.register(fastifyJwt, {
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: '10m'
    }
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            messag: 'Validation Error',
            issues: error.format(),
        });
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    } else {
        // TODO Here we should log to on external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: 'Internal server error.' });
});
