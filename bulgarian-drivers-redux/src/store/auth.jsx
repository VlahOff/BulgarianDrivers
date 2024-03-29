import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: undefined,
	isProfileDeleteModalOpen: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
		},
		toggleProfileDeleteModal(state) {
			state.isProfileDeleteModalOpen = !state.isProfileDeleteModalOpen;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice;
