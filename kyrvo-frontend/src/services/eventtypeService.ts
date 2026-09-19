import { EventTicketTypes } from 'src/models/EventType';
import api from './configs/axiosConfigs';

const serviceUri = '/eventtickettype';
export const EventTypeService = {
  getAll: async (): Promise<EventTicketTypes[]> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<EventTicketTypes> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'GET',
    });
  },
  getType: async (id: string): Promise<EventTicketTypes> => {
    return await api.request({
      url: `${serviceUri}/type/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: EventTicketTypes): Promise<EventTicketTypes> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: EventTicketTypes): Promise<EventTicketTypes> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'POST',
      data: data,
    });
  },

    delete: async (id: string): Promise<EventTicketTypes> => {
      return await api.request({
        url: `${serviceUri}/${id}`,
        method: 'Delete',
      });
    },
};
