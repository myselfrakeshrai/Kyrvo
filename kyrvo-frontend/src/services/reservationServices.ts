import { Reservation } from 'src/models';
import api from './configs/axiosConfigs';

export const ReservationServices = {
  getAll: async (): Promise<Reservation[]> => {
    return await api.request({
      url: `/reservations`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<Reservation> => {
    return await api.request({
      url: `/reservations/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: Reservation): Promise<Reservation> => {
    return await api.request({
      url: `/reservations/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: Reservation): Promise<Reservation> => {
    return await api.request({
      url: '/reservations',
      method: 'POST',
      data: data,
    });
  },
  assignAgency: async (reservationId: string, agencyId: string) => {
    return await api.request({
      url: `/reservations/assignAgency/${reservationId}`,
      method: 'POST',
      data: { AgencyId: agencyId },
    });
  },
  assignAgent: async (reservationId: string, agentId: string) => {
    return await api.request({
      url: `/reservations/assignAgent/${reservationId}`,
      method: 'POST',
      data: { AgentId: agentId },
    });
  },

  delete: async (id: string): Promise<Reservation> => {
    return await api.request({
      url: `/reservations/${id}`,
      method: 'Delete',
    });
  },
};
