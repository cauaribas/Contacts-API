import { FastifyInstance } from "fastify";
import { ContactCreate } from "../interfaces/contacts.interface";
import { ContactUseCase } from "../usecases/contact.usecase";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function contactsRoutes(fastify: FastifyInstance) {
    const contactUseCase = new ContactUseCase();
    
    fastify.addHook("preHandler", authMiddleware);

    fastify.post<{ Body: ContactCreate }>("/", async (request, reply) => {
        const { name, email, phone } = request.body;
        
        const userEmail = request.headers["email"];

        try {
            const data = await contactUseCase.create({
                name,
                email,
                phone,
                userEmail: userEmail
            });

            reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.get("/", async (request, reply) => {
        const userEmail = request.headers["email"];
        
        try {
            const contacts = await contactUseCase.listAllContacts(userEmail);

            reply.send(contacts);
        } catch (error) {
            reply.send(error);
        }
    });
}