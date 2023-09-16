import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from '../../components/UI/button/Button';
import Card from '../../components/UI/card/Card';
import LinkTo from '../../components/UI/links/LinkTo';
import AddCommentModal from '../../components/addCommentModal/AddCommentModal';
import DeleteCommentModal from '../../components/deleteCommentModal/DeleteCommentModal';
import DriverComment from '../../components/driverComment/DriverComment';
import EditCommentModal from '../../components/editCommentModal/EditCommentModal';
import { postsActions } from '../../store/posts';
import { getCommentsForCar } from '../../store/posts-actions';

import classes from './DriverDetails.module.css';

const DriverDetails = () => {
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
							<DriverComment
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

export default DriverDetails;
