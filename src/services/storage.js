import { TOKEN } from '../constants/config';

export const getToken = () => {
  return localStorage.getItem(TOKEN);
};

export const setToken = token => {
  localStorage.setItem(TOKEN, token);
};
