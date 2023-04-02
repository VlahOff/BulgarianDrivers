import { createContext, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as voteService from '../services/votesService';
import { useAuthContext } from './authContext';
import ErrorContext from './errorContext';

const VotesContext = createContext({
  votes: [],
  getVotesForDriversComments: (carId) => { },
  getVotesForComment: (commentId) => { },
  upvoteComment: (commentId) => { },
  downvoteComment: (commentId) => { }
});

export const VotesProvider = (props) => {
  const navigate = useNavigate();

  const { setErrorMessage } = useContext(ErrorContext);
  const { user } = useAuthContext();

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
    if (!user) {
      return navigate('/login');
    }

    voteService.upVoteComment(commentId)
      .then(vote => {
        setVotes(state => {
          return [...state.filter(v => v._id !== vote._id), vote];
        });
      })
      .catch(setErrorMessage);
  };

  const downvoteComment = (commentId) => {
    if (!user) {
      return navigate('/login');
    }

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
