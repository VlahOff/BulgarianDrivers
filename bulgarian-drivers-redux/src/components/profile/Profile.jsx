import { useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import LinkTo from '../UI/Links/LinkTo';
import DeleteProfileModal from './DeleteProfileModal';

import classes from './Profile.module.css';

const Profile = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const user = useSelector(state => state.auth.user);

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen((s) => !s);
  };

  return (
    <>
      {isDeleteModalOpen && (
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
