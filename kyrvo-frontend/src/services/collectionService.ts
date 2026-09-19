import api from './configs/axiosConfigs';
import { Collection } from 'src/models/Collection';

const serviceUri = '/collection';
export const CollectionService = {
  getAll: async (): Promise<Collection[]> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<Collection> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: Collection): Promise<Collection> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: Collection): Promise<Collection> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<Collection> => {
    return await api.request({
      url: `{serviceUri}/${id}`,
      method: 'Delete',
    });
  },
};
