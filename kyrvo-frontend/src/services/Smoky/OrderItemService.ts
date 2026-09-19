import { OrderItem } from 'src/models/Smoky/OrderItem';
import api from '../configs/axiosConfigs';

const serviceUri = '/orderitem';
export const OrderItemService = {
  getAll: async (): Promise<OrderItem[]> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<OrderItem> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: OrderItem): Promise<OrderItem> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: OrderItem): Promise<OrderItem> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<OrderItem> => {
    return await api.request({
      url: `{serviceUri}/${id}`,
      method: 'Delete',
    });
  },
};
