import { Log } from 'src/models';
import api from './configs/axiosConfigs';

export const LogsService = {
  get: async (id: string): Promise<Log> => {
    return await api.request({
      url: `/logs/dataId/${id}`,
      method: 'GET',
    });
  },
  getByDatId: async (dataId: string): Promise<Log[]> => {
    return await api.request({
      url: `/logs/dataId/${dataId}`,
      method: 'GET',
    });
  },
};
