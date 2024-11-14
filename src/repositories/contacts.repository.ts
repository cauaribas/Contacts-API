import { prisma } from "../database/prisma-client";
import { Contact, ContactCreate, ContactCreateData, ContactsRepository } from "../interfaces/contacts.interface";

export class ContactsPrismaRepository implements ContactsRepository{
    async create(data: ContactCreateData): Promise<Contact> {
        const contact = await prisma.contacts.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                userId: data.UserId
            }
        });

        return contact;
    }

    async findByEmailOrPhone(email: string, phone: string): Promise<Contact | null> {
        const result = await prisma.contacts.findFirst({
            where: {
                OR: [
                    {
                        email
                    },
                    {
                        phone
                    }
                ]
            }
        });

        return result || null;
    }

    async findAllContacts(userId: string): Promise<Contact[]> {
        const contacts = await prisma.contacts.findMany({
            where: {
                userId
            }
        });

        return contacts;
    }
}