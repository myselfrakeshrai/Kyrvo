import { Agent } from 'src/models';
import api from './configs/axiosConfigs';

export const AgentServices = {
  getAll: async (): Promise<Agent[]> => {
    return await api.request({
      url: `/agents`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<Agent> => {
    return await api.request({
      url: `/agents/${id}`,
      method: 'GET',
    });
  },
  getByAgency: async (id: string): Promise<Agent[]> => {
    return await api.request({
      url: `/agents/agencyId/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: Agent): Promise<Agent> => {
    return await api.request({
      url: `/agents/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: Agent): Promise<Agent> => {
    return await api.request({
      url: '/agents',
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<Agent> => {
    return await api.request({
      url: `/agents/${id}`,
      method: 'Delete',
    });
  },
};
