import { User } from "@prisma/client";
import { UserCreate, UserRepository } from "../interfaces/user.interface";
import { UserPrismaRepository } from "../repositories/user.repository";

export class UserUseCase {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserPrismaRepository();
    }

    async create({ name, email}: UserCreate): Promise<User> {
        const verifyIfUserExistis = await this.userRepository.findByEmail(email);
        
        if(verifyIfUserExistis) {
            throw new Error("User already exists");
        }

        const user = await this.userRepository.create({ name, email });

        return user;
    }
}