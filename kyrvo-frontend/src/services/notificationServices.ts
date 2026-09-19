import { Notification } from 'src/models';
import api from './configs/axiosConfigs';

export const NotificationServices = {
  getReservations: async (): Promise<Notification[]> => {
    return (await api.request({
      url: `/notifications/reservations`,
      method: 'GET',
    })) as Notification[];
  },
};
