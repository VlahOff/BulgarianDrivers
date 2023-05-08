import { useDispatch } from 'react-redux';

import { postsActions } from '../../store/posts';
import { deletePost } from '../../store/posts-actions';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';

import classes from './DeleteCommentModal.module.css';

const DeleteCommentModal = (props) => {
  const dispatch = useDispatch();

  const onCommentDeletion = () => {
    dispatch(deletePost());
  };

  const closeModalHandler = () => {
    dispatch(postsActions.toggleDeleteModal());
  };

  return (
    <Modal onClose={closeModalHandler} className={classes.modal}>
      <h2 className={classes.title}>
        Are you sure you want to delete your comment?
      </h2>
      <div className={classes.actions}>
        <Button onClick={onCommentDeletion}>Yes</Button>
        <Button onClick={closeModalHandler}>No</Button>
      </div>
    </Modal>
  );
};

export default DeleteCommentModal;
