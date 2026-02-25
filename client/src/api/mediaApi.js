import api from './axios';

export const fetchMedia = () => api.get('/media');
export const uploadMedia = (formData) =>
  api.post('/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteMedia = (id) => api.delete(`/media/${id}`);
export const likeMedia = (id) => api.post(`/media/${id}/like`);