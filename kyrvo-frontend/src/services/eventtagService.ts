import api from './configs/axiosConfigs';
import { EventTag } from 'src/models/EventTag';

const serviceUri = '/eventtag';
export const EventTagService = {
  getAll: async (): Promise<EventTag[]> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<EventTag> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: EventTag): Promise<EventTag> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: EventTag): Promise<EventTag> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<EventTag> => {
    return await api.request({
      url: `{serviceUri}/${id}`,
      method: 'Delete',
    });
  },
};
