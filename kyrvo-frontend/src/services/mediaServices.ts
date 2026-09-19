import { Media } from 'src/models';
import api from './configs/axiosConfigs';

export const MediaServices = {
  getAll: async (): Promise<Media[]> => {
    return (await api.request({
      url: `/media`,
      method: 'GET',
    })) as Media[];
  },
  get: async (id: string): Promise<Media> => {
    return await api.request({
      url: `/media/${id}`,
      method: 'GET',
    });
  },
  addNew: async (data: FormData): Promise<Media> => {
    return await api.request({
      url: '/media',
      method: 'POST',
      data: data,
    });
  },
  delete: async (id: string): Promise<Media> => {
    return await api.request({
      url: `/media/${id}`,
      method: 'Delete',
    });
  },
};
