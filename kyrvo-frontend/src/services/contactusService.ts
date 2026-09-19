import api from './configs/axiosConfigs';
import { ContactUs } from 'src/models/ContactUs';

const serviceUri = '/contact';
export const ContactUsService = {
  getAll: async (): Promise<ContactUs[]> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<ContactUs> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: ContactUs): Promise<ContactUs> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: ContactUs): Promise<ContactUs> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<ContactUs> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'Delete',
    });
  },
};
