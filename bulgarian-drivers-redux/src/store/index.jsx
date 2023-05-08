import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth';
import postsSlice from './posts';
import uiSlice from './ui';
import votesSlice from './votes';


const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    posts: postsSlice.reducer,
    votes: votesSlice.reducer
  }
});

export default store;