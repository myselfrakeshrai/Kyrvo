import { BlogPost } from 'src/models';
import api from './configs/axiosConfigs';

const serviceUri = '/blog';
export const BlogService = {
  getAll: async (): Promise<BlogPost[]> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<BlogPost> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: BlogPost): Promise<BlogPost> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: BlogPost): Promise<BlogPost> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<BlogPost> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'Delete',
    });
  },
};
