import axios from 'axios';
import { API_SERVER } from '../constants/apiRoutes';

const api = axios.create({
  baseURL: API_SERVER,
});

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
