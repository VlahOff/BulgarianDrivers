import { fetchApi } from './fetchApi';

const BASE_URL = process.env.REACT_APP_APP_BACKEND;

export const getCar = async carId => {
	const response = await fetchApi.get(`${BASE_URL}/car?carId=${carId}`);

	return response;
};

export const getCarList = async () => {
	const response = await fetchApi.get(`${BASE_URL}/carList`);

	return response;
};

export const searchCarList = async query => {
	const response = await fetchApi.get(
		`${BASE_URL}/searchCarList?search=${query}`
	);

	return response;
};

export const getUserPosts = async () => {
	const response = await fetchApi.get(`${BASE_URL}/userPosts`);

	return response;
};

export const getPosts = async carId => {
	const response = await fetchApi.get(`${BASE_URL}/posts?carId=${carId}`);

	return response;
};

export const createPost = async data => {
	const response = await fetchApi.post(`${BASE_URL}/posts`, {
		carNumber: data.carNumber,
		title: data.title,
		post: data.post,
	});

	return response;
};

export const editPost = async (data, carNumber, postId) => {
	const response = await fetchApi.put(`${BASE_URL}/posts?postId=${postId}`, {
		carNumber: carNumber,
		title: data.title,
		post: data.post,
	});

	return response;
};

export const deletePost = async postId => {
	const response = await fetchApi.delete(`${BASE_URL}/posts?postId=${postId}`);

	return response;
};
