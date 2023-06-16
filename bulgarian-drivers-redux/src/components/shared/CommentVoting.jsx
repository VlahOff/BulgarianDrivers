import { useDispatch, useSelector } from 'react-redux';
import { downvoteComment, upvoteComment } from '../../store/votes-actions';

import classes from './CommentVoting.module.css';

const CommentVoting = props => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth.user);
	const vote = useSelector(state => state.votes.votes).find(
		v => v.commentId === props.commentId
	);

	const onUpVote = () => {
		dispatch(upvoteComment(props.commentId));
	};

	const onDownVote = () => {
		dispatch(downvoteComment(props.commentId));
	};

	const hasUserVotedUp = vote?.usersVotedUp?.includes(user?.userId);
	const stylesUp = `${classes.arrow} ${hasUserVotedUp ? classes.active : ''}`;

	const hasUserVotedDown = vote?.usersVotedDown?.includes(user?.userId);
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
