import { createContext, useCallback, useContext, useState } from 'react';

import * as voteService from '../services/votesService';
import ErrorContext from './errorContext';

const VotesContext = createContext({
  votes: [],
  getVotesForDriversComments: (carId) => { },
  getVotesForComment: (commentId) => { },
  upvoteComment: (commentId) => { },
  downvoteComment: (commentId) => { }
});

export const VotesProvider = (props) => {
  const { setErrorMessage } = useContext(ErrorContext);
  const [votes, setVotes] = useState([]);

  const getVotesForDriversComments = useCallback((carId) => {
    voteService.getVotes(carId)
      .then(setVotes)
      .catch(setErrorMessage);
  }, [setErrorMessage]);

  const getVotesForComment = (commentId) => {
    return votes.find(c => c.commentId === commentId);
  };

  const upvoteComment = (commentId) => {
    voteService.upVoteComment(commentId)
      .then(vote => {
        setVotes(state => {
          return [...state.filter(v => v._id !== vote._id), vote];
        });
      })
      .catch(setErrorMessage);
  };

  const downvoteComment = (commentId) => {
    voteService.downVoteComment(commentId)
      .then(vote => {
        setVotes(state => {
          return [...state.filter(v => v._id !== vote._id), vote];
        });
      })
      .catch(setErrorMessage);
  };

  return (
    <VotesContext.Provider
      value={{
        votes,
        getVotesForDriversComments,
        getVotesForComment,
        upvoteComment,
        downvoteComment
      }}
    >{props.children}</VotesContext.Provider>
  );
};

export default VotesContext;
