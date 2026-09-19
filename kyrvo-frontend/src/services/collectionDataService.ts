import api from './configs/axiosConfigs';
import { CollectionData } from 'src/models/CollectionData';

const serviceUri = '/cdata';
export const CollectionDataService = {
  getAll: async (): Promise<CollectionData[]> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<CollectionData> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: CollectionData): Promise<CollectionData> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: CollectionData): Promise<CollectionData> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<CollectionData> => {
    return await api.request({
      url: `{serviceUri}/${id}`,
      method: 'Delete',
    });
  },
};
