import { fetchApi } from './fetchApi';

const BASE_URL = process.env.REACT_APP_APP_BACKEND;

export const getVotes = async (carId) => {
  const response = await fetchApi.get(`${BASE_URL}/votes/?carId=${carId}`);

  return response;
};

export const getUserVotes = async () => {
  const response = await fetchApi.get(`${BASE_URL}/votes/userVotes`);

  return response;
};

export const upVoteComment = async (commentId) => {
  const response = await fetchApi.get(`${BASE_URL}/votes/upVote?commentId=${commentId}`);

  return response;
};

export const downVoteComment = async (commentId) => {
  const response = await fetchApi.get(`${BASE_URL}/votes/downVote?commentId=${commentId}`);

  return response;
};