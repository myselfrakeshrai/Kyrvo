import { MenuItems } from 'src/models/MenuItems';
import api from './configs/axiosConfigs';

const serviceUri = '/menuitem';
export const MenuItemService = {
  getAll: async (): Promise<MenuItems[]> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<MenuItems> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: MenuItems): Promise<MenuItems> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: MenuItems): Promise<MenuItems> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<MenuItems> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'delete',
    });
  },
};
