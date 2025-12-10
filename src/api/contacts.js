import apiClient from './client';
import { mockApi } from './mockApi';

const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true';

export const getContacts = async (query = '') => {
    if (USE_MOCK) return mockApi.contacts.getAll(query);
    const response = await apiClient.get('/contacts', { params: { q: query } });
    return response.data;
};

export const getContact = async (id) => {
    if (USE_MOCK) return mockApi.contacts.get(id);
    const response = await apiClient.get(`/contacts/${id}`);
    return response.data;
};

export const createContact = async (contactData) => {
    if (USE_MOCK) return mockApi.contacts.create(contactData);
    const response = await apiClient.post('/contacts', contactData);
    return response.data;
};

export const updateContact = async (id, contactData) => {
    if (USE_MOCK) return mockApi.contacts.update(id, contactData);
    const response = await apiClient.put(`/contacts/${id}`, contactData);
    return response.data;
};

export const deleteContact = async (id) => {
    if (USE_MOCK) return mockApi.contacts.delete(id);
    const response = await apiClient.delete(`/contacts/${id}`);
    return response.data;
};

export const shareContact = async (contactId, targetUserId) => {
    if (USE_MOCK) return mockApi.contacts.share(contactId, targetUserId);
    const response = await apiClient.post('/contacts/share', { contactId, targetUserId });
    return response.data;
};
