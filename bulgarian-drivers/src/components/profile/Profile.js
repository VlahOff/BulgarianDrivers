import { useState } from 'react';

import Button from '../UI/Button';
import Card from '../UI/Card';
import LinkTo from '../UI/LinkTo';
import DeleteProfileModal from './DeleteProfileModal';

import classes from './Profile.module.css';

const Profile = (props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
          <h2 className={classes.username}>Welcome kurcho!</h2>
          <p className={classes.email}>dimitarvlahov24@icloud.com</p>
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
