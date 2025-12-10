import apiClient from './client';
import { mockApi } from './mockApi';

const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true';

export const login = async (username, password) => {
    if (USE_MOCK) return mockApi.auth.login(username, password);
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data; // Expected: { token, user: { ... } }
};

export const register = async (username, password) => {
    if (USE_MOCK) return mockApi.auth.register(username, password);
    const response = await apiClient.post('/auth/register', { username, password });
    return response.data;
};

export const loginAnonymous = async () => {
    if (USE_MOCK) return mockApi.auth.loginAnonymous();
    const response = await apiClient.post('/auth/login-anonymous');
    return response.data; // Expected: { token, user: { role: 'Anonymous', ... } }
};
