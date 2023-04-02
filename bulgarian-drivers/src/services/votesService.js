import { fetchApi } from './fetchApi';

const BASE_URL = process.env.REACT_APP_APP_BACKEND_VOTES;

export const getVotes = async (carId) => {
  const response = await fetchApi.get(`${BASE_URL}/?carId=${carId}`);

  return response;
};

export const upVoteComment = async (commentId) => {
  const response = await fetchApi.get(`${BASE_URL}/upVote?commentId=${commentId}`);

  return response;
};

export const downVoteComment = async (commentId) => {
  const response = await fetchApi.get(`${BASE_URL}/downVote?commentId=${commentId}`);

  return response;
};