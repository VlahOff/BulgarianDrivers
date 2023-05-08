import * as voteService from '../services/votesService';
import { uiActions } from './ui';
import { setErrorMessage } from './ui-actions';
import { voteActions } from './votes';

export const getVotesForDriversComments = (carId) => {
  return (dispatch) => {
    dispatch(uiActions.startLoading());
    voteService.getVotes(carId)
      .then(res => {
        dispatch(voteActions.setVotes(res));
      })
      .catch(err => dispatch(setErrorMessage(err)))
      .finally(() => dispatch(uiActions.stopLoading()));
  };
};

export const upvoteComment = (commentId) => {
  return (dispatch) => {
    dispatch(uiActions.startLoading());
    voteService.upVoteComment(commentId)
      .then(res => dispatch(voteActions.updateVotes(res)))
      .catch(err => dispatch(setErrorMessage(err)))
      .finally(() => dispatch(uiActions.stopLoading()));
  };
};

export const downvoteComment = (commentId) => {
  return (dispatch) => {
    dispatch(uiActions.startLoading());
    voteService.downVoteComment(commentId)
      .then(res => dispatch(voteActions.updateVotes(res)))
      .catch(err => dispatch(setErrorMessage(err)))
      .finally(() => dispatch(uiActions.stopLoading()));
  };
};