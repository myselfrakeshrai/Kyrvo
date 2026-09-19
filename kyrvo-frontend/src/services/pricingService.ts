import { Pricing } from 'src/models';
import api from './configs/axiosConfigs';

export const PricingServices = {
  getAll: async (): Promise<Pricing[]> => {
    return await api.request({
      url: `/pricings`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<Pricing> => {
    return await api.request({
      url: `/pricings/${id}`,
      method: 'GET',
    });
  },
  getCurrentRate: async (): Promise<Pricing> => {
    return await api.request({
      url: `/pricings/current`,
      method: 'GET',
    });
  },
  getPricingById: async (roleId: string): Promise<Pricing> => {
    return await api.request({
      url: `/pricings/role/${roleId}`,
      method: 'GET',
    });
  },
  edit: async (data: Pricing, id: string): Promise<Pricing> => {
    return await api.request({
      url: `/pricings/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: Pricing): Promise<Pricing> => {
    return await api.request({
      url: '/pricings',
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<Pricing> => {
    return await api.request({
      url: `/pricings/${id}`,
      method: 'Delete',
    });
  },
};
