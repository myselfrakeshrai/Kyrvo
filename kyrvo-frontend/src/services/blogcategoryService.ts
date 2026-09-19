 import { BlogCategory } from 'src/models/BlogCategory';
import api from './configs/axiosConfigs';

const serviceUri = '/blogcategory';
export const BlogCategoryService = {
  getAll: async (): Promise<BlogCategory[]> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<BlogCategory> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: BlogCategory): Promise<BlogCategory> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: BlogCategory): Promise<BlogCategory> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'POST',
      data: data,
    });
  },

    delete: async (id: string): Promise<BlogCategory> => {
      return await api.request({
        url: `${serviceUri}/${id}`,
        method: 'Delete',
      });
    },
};
