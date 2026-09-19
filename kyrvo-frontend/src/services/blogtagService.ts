import api from './configs/axiosConfigs';
import { BlogTag } from 'src/models/BlogTag';

const serviceUri = '/blogtag';
export const BlogTagService = {
  getAll: async (): Promise<BlogTag[]> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<BlogTag> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: BlogTag): Promise<BlogTag> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: BlogTag): Promise<BlogTag> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<BlogTag> => {
    return await api.request({
      url: `{serviceUri}/${id}`,
      method: 'Delete',
    });
  },
};
