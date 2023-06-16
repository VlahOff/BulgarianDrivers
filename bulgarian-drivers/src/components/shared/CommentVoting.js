import { useContext } from 'react';

import { useAuthContext } from '../../contexts/authContext';
import VotesContext from '../../contexts/votesContext';

import classes from './CommentVoting.module.css';

const CommentVoting = props => {
	const { getVotesForComment, upvoteComment, downvoteComment } =
		useContext(VotesContext);
	const authCtx = useAuthContext();

	const vote = getVotesForComment(props.commentId);

	const onUpVote = () => {
		upvoteComment(props.commentId);
	};

	const onDownVote = () => {
		downvoteComment(props.commentId);
	};

	const hasUserVotedUp = vote?.usersVotedUp?.includes(authCtx.user?.userId);
	const stylesUp = `${classes.arrow} ${hasUserVotedUp ? classes.active : ''}`;

	const hasUserVotedDown = vote?.usersVotedDown?.includes(authCtx.user?.userId);
	const stylesDown = `${classes.arrow} ${
		hasUserVotedDown ? classes.active : ''
	}`;

	return (
		<div className={classes['vote-wrapper']}>
			<button onClick={onUpVote}>
				<i className={`${stylesUp} fa-solid fa-arrow-up`}></i>
			</button>
			<p className={classes.votes}>{vote?.votes || 0}</p>
			<button onClick={onDownVote}>
				<i className={`${stylesDown} fa-solid fa-arrow-down`}></i>
			</button>
		</div>
	);
};

export default CommentVoting;
