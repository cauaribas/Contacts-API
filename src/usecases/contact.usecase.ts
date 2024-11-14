import { Contacts } from "@prisma/client";
import { ContactCreate, ContactsRepository } from "../interfaces/contacts.interface";
import { ContactsPrismaRepository } from "../repositories/contacts.repository";
import { UserPrismaRepository } from "../repositories/user.repository";
import { UserRepository } from "../interfaces/user.interface";

export class ContactUseCase {
    private contactRepository: ContactsRepository;
    private userRepository: UserRepository;
    constructor() {
        this.contactRepository = new ContactsPrismaRepository();
        this.userRepository = new UserPrismaRepository();
    }

    async create({ name, email, phone, userEmail }: ContactCreate): Promise<Contacts> {
        const user = await this.userRepository.findByEmail(userEmail);

        if (!user) {
            throw new Error("User not found");
        }
        
        const verifyIfContactExists = await this.contactRepository.findByEmailOrPhone(email, phone);

        if (verifyIfContactExists) {
            throw new Error("Contact already exists");
        }

        const contact = await this.contactRepository.create({
            name,
            email,
            phone,
            UserId: user.id
        });

        return contact;
    }

    async listAllContacts(userEmail: string): Promise<Contacts[]> {
        const user = await this.userRepository.findByEmail(userEmail);

        if(!user) {
            throw new Error("User not found");
        }

        const contacts = await this.contactRepository.findAllContacts(user.id);

        return contacts;
    }
}