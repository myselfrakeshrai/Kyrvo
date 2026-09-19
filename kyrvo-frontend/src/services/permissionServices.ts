import { Permission } from 'src/models';
import api from './configs/axiosConfigs';

export const PermissionServices = {
  getAll: async (): Promise<Permission[]> => {
    return await api.request({
      url: `/permissions`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<Permission> => {
    return await api.request({
      url: `/permissions/${id}`,
      method: 'GET',
    });
  },
  getByRoleId: async (roleId: string): Promise<Permission> => {
    return await api.request({
      url: `/permissions/role/${roleId}`,
      method: 'GET',
    });
  },
  edit: async (permissionId: string, data: Permission): Promise<Permission> => {
    return await api.request({
      url: `/permissions/${permissionId}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: Permission): Promise<Permission> => {
    return await api.request({
      url: '/permissions',
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<Permission> => {
    return await api.request({
      url: `/permissions/${id}`,
      method: 'Delete',
    });
  },
};
