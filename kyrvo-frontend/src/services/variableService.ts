import { Variable } from 'src/models';
import api from './configs/axiosConfigs';

export const VariableService = {
  getAll: async (): Promise<Variable[]> => {
    return await api.request({
      url: `/variables`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<Variable> => {
    return await api.request({
      url: `/variables/${id}`,
      method: 'GET',
    });
  },
  getByGroup: async (group: string): Promise<Variable[]> => {
    return await api.request({
      url: `/variables/VarGroup/${group}`,
      method: 'GET',
    });
  },

  edit: async (id: string, data: Variable): Promise<Variable> => {
    return await api.request({
      url: `/variables/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: Variable): Promise<Variable> => {
    return await api.request({
      url: '/variables',
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<Variable> => {
    return await api.request({
      url: `/variables/${id}`,
      method: 'Delete',
    });
  },
};
