import { VehicleTypes } from 'src/models';
import api from './configs/axiosConfigs';

export const VehicleTypesServices = {
  getAll: async (): Promise<VehicleTypes[]> => {
    return await api.request({
      url: `/vehicletypes`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<VehicleTypes> => {
    return await api.request({
      url: `/vehicletypes/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: VehicleTypes): Promise<VehicleTypes> => {
    return await api.request({
      url: `/vehicletypes/${id}`,
      method: 'Put',
      data: data,
    });
  },
  addNew: async (data: VehicleTypes): Promise<VehicleTypes> => {
    return await api.request({
      url: '/vehicletypes',
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<VehicleTypes> => {
    return await api.request({
      url: `/vehicletypes/${id}`,
      method: 'Delete',
    });
  },
};
