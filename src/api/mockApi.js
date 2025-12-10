// Mock Data Storage (In-memory for session)
let users = [{ username: 'test', password: 'password', id: 1 }];
let contacts = [
    { id: 1, firstName: 'John', lastName: 'Doe', details: [{ type: 'Phone', value: '123-456' }], userId: 1 },
    { id: 2, firstName: 'Jane', lastName: 'Smith', details: [{ type: 'Email', value: 'jane@example.com' }], userId: 1 },
];
let groups = [
    { id: 1, name: 'Work', userId: 1 }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
    auth: {
        login: async (username, password) => {
            await delay(500);
            const user = users.find(u => u.username === username && u.password === password);
            if (user) return { token: 'mock-jwt-token', user: { username } };
            throw new Error('Invalid credentials');
        },
        register: async (username, password) => {
            await delay(500);
            if (users.find(u => u.username === username)) throw new Error('User exists');
            users.push({ username, password, id: users.length + 1 });
            return { message: 'Registered' };
        },
        loginAnonymous: async () => {
            await delay(500);
            return { token: 'mock-anon-token', user: { role: 'Anonymous' } };
        }
    },
    contacts: {
        getAll: async (query) => {
            await delay(300);
            if (!query) return contacts;
            return contacts.filter(c =>
                c.firstName.toLowerCase().includes(query.toLowerCase()) ||
                c.lastName.toLowerCase().includes(query.toLowerCase())
            );
        },
        create: async (data) => {
            await delay(300);
            const newContact = { ...data, id: Date.now() };
            contacts.push(newContact);
            return newContact;
        },
        // Add other methods as needed: update, delete, get, share
        get: async (id) => {
            await delay(200);
            const c = contacts.find(x => x.id == id);
            return c || {};
        },
        update: async (id, data) => {
            await delay(300);
            const idx = contacts.findIndex(x => x.id == id);
            if (idx !== -1) contacts[idx] = { ...contacts[idx], ...data };
            return contacts[idx];
        },
        delete: async (id) => {
            await delay(300);
            contacts = contacts.filter(c => c.id !== id);
            return { message: 'Deleted' };
        },
        share: async (contactId, targetUserId) => {
            await delay(500);
            return { message: 'Shared' };
        }
    },
    groups: {
        getAll: async () => {
            await delay(300);
            return groups;
        },
        create: async (name) => {
            await delay(300);
            const newGroup = { id: Date.now(), name };
            groups.push(newGroup);
            return newGroup;
        },
        delete: async (id) => {
            await delay(300);
            groups = groups.filter(g => g.id !== id);
            return { message: 'Deleted' };
        }
    }
};
