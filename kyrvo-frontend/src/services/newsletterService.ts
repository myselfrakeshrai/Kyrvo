import api from './configs/axiosConfigs';
import { NewsLetters } from 'src/models/NewsLetter';

const serviceUri = '/newsletter';
export const NewsLetterService = {
  getAll: async (): Promise<NewsLetters[]> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<NewsLetters> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: NewsLetters): Promise<NewsLetters> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: NewsLetters): Promise<NewsLetters> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<NewsLetters> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'Delete',
    });
  },
  
};
