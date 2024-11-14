import { FastifyReply, FastifyRequest } from "fastify";

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
    const apiEmail = request.headers["email"];

    if(!apiEmail) {
        reply.code(401).send({ message: "Unauthorized" });
    }
}