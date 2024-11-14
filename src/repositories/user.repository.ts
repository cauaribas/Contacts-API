import { prisma } from "../database/prisma-client";
import { User, UserCreate, UserRepository } from "../interfaces/user.interface";

export class UserPrismaRepository implements UserRepository {
    async create(data: UserCreate): Promise<User> {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
            }
        });

        return user;
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                email: email
            }
        });

        return user || null;
    }
}
