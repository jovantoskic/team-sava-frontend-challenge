import { getToken } from '../services/storage';

export const isLoggedIn = () => {
  const token = getToken('jwt_token');
  if (token) {
    return true;
  }
  return false;
};
