import { Role } from 'src/models';
import api from './configs/axiosConfigs';

export const RoleServices = {
  getAll: async (): Promise<Role[]> => {
    return await api.request({
      url: `/roles`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<Role> => {
    return await api.request({
      url: `/roles/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: Role): Promise<Role> => {
    return await api.request({
      url: `/roles/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: Role): Promise<Role> => {
    return await api.request({
      url: '/roles',
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<Role> => {
    return await api.request({
      url: `/roles/${id}`,
      method: 'Delete',
    });
  },
};
