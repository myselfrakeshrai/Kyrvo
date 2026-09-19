import { Vehicle } from 'src/models';
import api from './configs/axiosConfigs';

export const VehicleServices = {
  getAll: async (): Promise<Vehicle[]> => {
    return await api.request({
      url: `/vehicles`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<Vehicle> => {
    return await api.request({
      url: `/vehicles/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: Vehicle): Promise<Vehicle> => {
    return await api.request({
      url: `/vehicles/${id}`,
      method: 'Put',
      data: data,
    });
  },
  addNew: async (data: Vehicle): Promise<Vehicle> => {
    return await api.request({
      url: '/vehicles',
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<Vehicle> => {
    return await api.request({
      url: `/vehicles/${id}`,
      method: 'Delete',
    });
  },
};
