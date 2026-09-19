import { FeedBack } from 'src/models';
import api from './configs/axiosConfigs';

export const FeedBackServices = {
  getAll: async (): Promise<FeedBack[]> => {
    return await api.request({
      url: `/feedback`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<FeedBack> => {
    return await api.request({
      url: `/feedback/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: FeedBack): Promise<FeedBack> => {
    return await api.request({
      url: `/feedback/${id}`,
      method: 'Put',
      data: data,
    });
  },
  addNew: async (data: FeedBack): Promise<FeedBack> => {
    return await api.request({
      url: '/feedback',
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<FeedBack> => {
    return await api.request({
      url: `/feedback/${id}`,
      method: 'Delete',
    });
  },
};
