import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/UI/button/Button';
import Card from '../../components/UI/card/Card';
import LinkTo from '../../components/UI/links/LinkTo';
import DeleteProfileModal from '../../components/deleteProfileModal/DeleteProfileModal';
import { authActions } from '../../store/auth';

import classes from './Profile.module.css';

const Profile = () => {
	const dispatch = useDispatch();
	const isProfileDeleteModalOpen = useSelector(
		state => state.auth.isProfileDeleteModalOpen
	);
	const user = useSelector(state => state.auth.user);

	const toggleDeleteModal = () => {
		dispatch(authActions.toggleProfileDeleteModal());
	};

	return (
		<>
			{isProfileDeleteModalOpen && (
				<DeleteProfileModal closeModal={toggleDeleteModal} />
			)}
			<Card className={classes.card}>
				<div className={classes['user-data']}>
					<h2 className={classes.username}>Welcome {user?.username}!</h2>
					<p className={classes.email}>{user?.email}</p>
				</div>
				<div className={classes['actions-bg']}>
					<div className={classes.actions}>
						<LinkTo to="/user-posts">Your posts</LinkTo>
						<Button onClick={toggleDeleteModal}>Delete account</Button>
					</div>
				</div>
			</Card>
		</>
	);
};

export default Profile;
