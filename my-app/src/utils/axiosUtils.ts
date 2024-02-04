import axios, { AxiosInstance } from 'axios';

const baseURL = process.env.REACT_APP_SERVER_PATH;

const axiosAuthInstance: AxiosInstance = axios.create({
  baseURL
});

axiosAuthInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && error.response?.data === 'TokenExpiredError' && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.get(`${baseURL}/auth/refreshToken`, {withCredentials : true});
        return axiosAuthInstance(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAuthInstance;