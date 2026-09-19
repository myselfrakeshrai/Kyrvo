import api from '../configs/axiosConfigs';
import { Orders } from 'src/models/Smoky/Order';

const serviceUri = '/orders';
export const OrderService = {
  getAll: async (): Promise<Orders[]> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<Orders> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: Orders): Promise<Orders> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: Orders): Promise<Orders> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<Orders> => {
    return await api.request({
      url: `{serviceUri}/${id}`,
      method: 'Delete',
    });
  },
};
