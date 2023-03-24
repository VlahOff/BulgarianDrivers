import { fetchApi } from './fetchApi';

const BASE_URL = 'http://localhost:3030/api/';

export const getCar = async (carId) => {
  const response = await fetchApi.get(`${BASE_URL}/car?carId=${carId}`);

  return response;
};

export const getCarList = async () => {
  const response = await fetchApi.get(`${BASE_URL}/carList`);

  return response;
};

export const getPosts = async (carId) => {
  const response = await fetchApi.get(`${BASE_URL}/posts?carId=${carId}`);

  return response;
};

export const createPost = async (data) => {
  const response = await fetchApi.post(`${BASE_URL}/posts`, {
    carNumber: data.carNumber,
    title: data.title,
    post: data.post,
  });

  return response;
};
