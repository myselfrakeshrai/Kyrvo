import { Agency } from 'src/models';
import api from './configs/axiosConfigs';

export const AgencyServices = {
  getAll: async (): Promise<Agency[]> => {
    return await api.request({
      url: `/agencies`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<Agency> => {
    return await api.request({
      url: `/agencies/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: Agency): Promise<Agency> => {
    return await api.request({
      url: `/agencies/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: Agency): Promise<Agency> => {
    return await api.request({
      url: '/agencies',
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<Agency> => {
    return await api.request({
      url: `/agencies/${id}`,
      method: 'Delete',
    });
  },
};
