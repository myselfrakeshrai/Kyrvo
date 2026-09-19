import axios, { AxiosInstance } from 'axios';

const env = import.meta.env;
const api: AxiosInstance = axios.create({
  withCredentials: true,
  xsrfCookieName: 'ae_cookie',
  //baseURL: `${env.VITE_API_URL}/${env.VITE_API_VERSION}/api/`,
  baseURL: `${env.VITE_API_URL}/`,
});

api.interceptors.response.use(
  (response) => {
    return response?.data?.data;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('ae_user');
      window.location.href = '/login';
    }

    return Promise.reject(error?.response?.data);
  },
);

export default api;
