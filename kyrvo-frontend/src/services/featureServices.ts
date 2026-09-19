import { Feature } from 'src/models';
import api from './configs/axiosConfigs';

export const FeatureServices = {
  getAll: async (): Promise<Feature[]> => {
    return await api.request({
      url: `/features`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<Feature> => {
    return await api.request({
      url: `/features/${id}`,
      method: 'GET',
    });
  },
  getModules: async (): Promise<string[]> => {
    const response = (await api.get('/static/config.json')) as any;
    console.log(response);
    return response['MODULES'] as string[];
  },
  edit: async (id: string, data: Feature): Promise<Feature> => {
    return await api.request({
      url: `/features/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: Feature): Promise<Feature> => {
    return await api.request({
      url: '/features',
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<Feature> => {
    return await api.request({
      url: `/features/${id}`,
      method: 'Delete',
    });
  },
};
