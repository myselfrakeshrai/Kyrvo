import { Web } from 'src/models';
import api from './configs/axiosConfigs';

export const WebServices = {
  getAll: async (): Promise<Web[]> => {
    return await api.request({
      url: `/webs`,
      method: 'GET',
    });
  },
  getConfig: async (): Promise<Web> => {
    return await api.request({
      url: '/webs/config',
      method: 'GET',
    });
  },
  get: async (id: string): Promise<Web> => {
    return await api.request({
      url: `/webs/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: Web): Promise<Web> => {
    return await api.request({
      url: `/webs/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: Web): Promise<Web> => {
    return await api.request({
      url: '/webs',
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<Web> => {
    return await api.request({
      url: `/webs/${id}`,
      method: 'Delete',
    });
  },
};
