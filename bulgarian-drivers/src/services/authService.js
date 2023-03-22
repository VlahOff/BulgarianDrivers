import { fetchApi } from './fetchApi';

const BASE_URL = 'http://localhost:3131/auth';

export const login = (data) => {
  return fetchApi.post(`${BASE_URL}/login`, data);
};

export const register = async (data) => {
  return fetchApi.post(`${BASE_URL}/register`, data);
};

export const logout = async () => {
  fetchApi.get(`${BASE_URL}/logout`);
};