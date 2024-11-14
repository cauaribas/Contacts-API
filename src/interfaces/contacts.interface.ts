export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
}

export interface ContactCreate {
    name: string;
    email: string;
    phone: string;
    userEmail: string;
}

export interface ContactCreateData {
    name: string;
    email: string;
    phone: string;
    UserId: string;
}

export interface ContactsRepository {
    create(data: ContactCreateData): Promise<Contact>;
    findByEmailOrPhone(email: string, phone: string): Promise<Contact | null>;
    findAllContacts(userId: string): Promise<Contact[]>;
    updateContact(data: Contact): Promise<Contact>;
    deleteContact(id: string): Promise<boolean>;
}
