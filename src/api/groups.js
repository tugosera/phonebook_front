import apiClient from './client';
import { mockApi } from './mockApi';

const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true';

export const getGroups = async () => {
    if (USE_MOCK) return mockApi.groups.getAll();
    const response = await apiClient.get('/groups');
    return response.data;
};

export const createGroup = async (name) => {
    if (USE_MOCK) return mockApi.groups.create(name);
    const response = await apiClient.post('/groups', { name });
    return response.data;
};

export const deleteGroup = async (id) => {
    if (USE_MOCK) return mockApi.groups.delete(id);
    const response = await apiClient.delete(`/groups/${id}`);
    return response.data;
};
