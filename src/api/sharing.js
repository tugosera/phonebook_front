import apiClient from './client';

export const shareResource = async (targetUsername, resourceId, resourceType = 'Contact') => {
    const response = await apiClient.post('/sharing', {
        targetUsername,
        resourceId,
        resourceType
    });
    return response.data;
};
