import { fetchApi } from './fetchApi';

const BASE_URL = import.meta.env.VITE_AUTH_BACKEND;

export const login = async (data) => {
  return fetchApi.post(`${BASE_URL}/login`, data);
};

export const register = async (data) => {
  return fetchApi.post(`${BASE_URL}/register`, data);
};

export const logout = async () => {
  return fetchApi.get(`${BASE_URL}/logout`);
};

export const deleteAccount = async (data) => {
  return fetchApi.post(`${BASE_URL}/deleteAccount`, data);
};
