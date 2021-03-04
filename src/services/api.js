import axios from 'axios';
import { API_SERVER } from '../constants/apiRoutes';
// import { getToken } from '../services/storage';

const api = axios.create({
  baseURL: API_SERVER,
});

// api.interceptors.request.use(config => {
// if (token) {
//     config.params.token = token;
// } else {
//     delete config.params.token;
// }
// return config;
// });

export const login = data => {
  return api.post('/login', data);
};

export const register = data => {
  return api.post('/register', data);
};

export const createConfig = (token, data) => {
  return api.post('/config', data, { headers: { Authorization: `${token}` } });
};

export default api;
