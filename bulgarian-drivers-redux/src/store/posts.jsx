import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	car: null,
	carList: [],
	comments: [],
	searchResults: [],
	searchErrorMessage: '',
	selectedPost: {},
	isAddModalShown: false,
	isEditModalShown: false,
	isDeleteModalShown: false,
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		setCar(state, action) {
			state.car = action.payload;
		},
		setCarList(state, action) {
			state.carList = action.payload;
		},
		setComments(state, action) {
			state.comments = action.payload;
		},
		selectComment(state, action) {
			state.selectedPost = action.payload;
		},
		addNewComment(state, action) {
			state.comments = [action.payload, ...state.comments];
		},
		addEditedComment(state, action) {
			state.comments = state.comments.filter(c => c._id !== action.payload._id);
			state.comments = [action.payload, ...state.comments];
		},
		removeComment(state, action) {
			state.comments = state.comments.filter(c => c._id !== action.payload);
		},
		toggleAddModal(state) {
			state.isAddModalShown = !state.isAddModalShown;
		},
		toggleEditModal(state) {
			state.isEditModalShown = !state.isEditModalShown;
		},
		toggleDeleteModal(state) {
			state.isDeleteModalShown = !state.isDeleteModalShown;
		},
		setSearchResults(state, action) {
			state.searchResults = action.payload;
		},
		setSearchError(state, action) {
			state.searchErrorMessage = action.payload;
		},
	},
});

export const postsActions = postsSlice.actions;

export default postsSlice;
