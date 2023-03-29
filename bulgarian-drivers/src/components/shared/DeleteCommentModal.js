import { useContext } from 'react';

import PostsContext from '../../contexts/postsContext';
import Button from '../UI/Button';
import Modal from '../UI/Modal';

import classes from './DeleteCommentModal.module.css';

const DeleteCommentModal = (props) => {
  const postsCtx = useContext(PostsContext);

  return (
    <Modal onClose={postsCtx.toggleDeleteModal}>
      <h2 className={classes.title}>
        Are you sure you want to delete your comment?
      </h2>
      <div className={classes.actions}>
        <Button onClick={postsCtx.removePost}>Yes</Button>
        <Button onClick={postsCtx.toggleDeleteModal}>No</Button>
      </div>
    </Modal>
  );
};

export default DeleteCommentModal;
