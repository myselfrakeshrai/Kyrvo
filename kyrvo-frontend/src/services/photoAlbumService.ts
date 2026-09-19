import { PhotoAlbum } from 'src/models/PhotoAlbum';
import api from './configs/axiosConfigs';

const serviceUri = '/photoalbum';
export const PhotoAlbumService = {
  getAll: async (): Promise<PhotoAlbum[]> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'GET',
    });
  },
  get: async (id: string): Promise<PhotoAlbum> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'GET',
    });
  },
  edit: async (id: string, data: PhotoAlbum): Promise<PhotoAlbum> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'PUT',
      data: data,
    });
  },
  addNew: async (data: PhotoAlbum): Promise<PhotoAlbum> => {
    return await api.request({
      url: `${serviceUri}`,
      method: 'POST',
      data: data,
    });
  },

  delete: async (id: string): Promise<PhotoAlbum> => {
    return await api.request({
      url: `${serviceUri}/${id}`,
      method: 'Delete',
    });
  },
};
