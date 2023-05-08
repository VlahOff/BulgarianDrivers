import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  votes: []
};

const votesSlice = createSlice({
  name: 'votes',
  initialState,
  reducers: {
    setVotes(state, action) {
      state.votes = action.payload;
    },
    updateVotes(state, action) {
      const oldVotes = state.votes.filter(v => v._id !== action.payload._id);
      state.votes = [...oldVotes, action.payload];
    }
  }
});

export const voteActions = votesSlice.actions;

export default votesSlice;