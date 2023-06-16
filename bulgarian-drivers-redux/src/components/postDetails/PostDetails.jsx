import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { postsActions } from '../../store/posts';
import { getCommentsForCar } from '../../store/posts-actions';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import LinkTo from '../UI/Links/LinkTo';
import Comment from '../shared/Comment';
import DeleteCommentModal from '../shared/DeleteCommentModal';
import EditCommentModal from '../shared/EditCommentModal';
import AddCommentModal from './AddCommentModal';

import classes from './PostDetails.module.css';

const PostDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth.user);
	const {
		car,
		comments,
		isAddModalShown,
		isEditModalShown,
		isDeleteModalShown,
	} = useSelector(state => state.posts);

	useEffect(() => {
		dispatch(getCommentsForCar(id));
	}, [dispatch, id]);

	const onNewCommentHandler = () => {
		dispatch(postsActions.toggleAddModal());
	};

	return (
		<>
			{isAddModalShown && <AddCommentModal />}
			{isEditModalShown && <EditCommentModal />}
			{isDeleteModalShown && <DeleteCommentModal />}

			<Card className={classes.card}>
				<header className={classes.header}>
					<LinkTo
						to=".."
						relative="path"
					>
						<i className="fa-solid fa-chevron-left"></i> Back
					</LinkTo>

					<h1 className={classes.title}>
						Comments about:
						<span className={classes.number}> {car?.carNumber}</span>
					</h1>

					<Button onClick={onNewCommentHandler}>New comment</Button>
				</header>

				<ul className={classes['posts-list']}>
					{comments.map(c => {
						return (
							<Comment
								key={c._id}
								user={user}
								post={c}
							/>
						);
					})}
					{comments.length === 0 && (
						<p className={classes['alert-message']}>
							No comments about this driver.
						</p>
					)}
				</ul>
			</Card>
		</>
	);
};

export default PostDetails;
