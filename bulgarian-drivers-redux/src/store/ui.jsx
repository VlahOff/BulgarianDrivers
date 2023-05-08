import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errorMessage: null,
  isErrorShown: false,
  isLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    }
  }
});

export const uiActions = uiSlice.actions;

export default uiSlice;