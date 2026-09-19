import { EventCategory } from 'src/models/EventCategory';
import api from './configs/axiosConfigs';

const serviceUri = '/eventcategory';
export const EventCategoryService = {
  getAll: async (): Promise<EventCategory[]> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<EventCategory> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: EventCategory): Promise<EventCategory> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: EventCategory): Promise<EventCategory> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<EventCategory> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'Delete',
    });
  },
};
