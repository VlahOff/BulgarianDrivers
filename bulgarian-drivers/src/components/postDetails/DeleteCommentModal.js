import Button from '../UI/Button';
import Modal from '../UI/Modal';
import classes from './DeleteCommentModal.module.css';

const DeleteCommentModal = (props) => {
  const deletePost = () => {
    props.removePost();
  };

  const cancelDeletion = () => {
    props.closeDeleteModal();
  };

  return (
    <Modal
      onClose={cancelDeletion}
      className={classes.modal}
    >
      <h2 className={classes.title}>Are you sure you want to delete your comment?</h2>
      <div className={classes.actions}>
        <Button
          onClick={deletePost}
          className={classes.button}
        >Yes</Button>
        <Button
          onClick={cancelDeletion}
          className={classes.button}
        >No</Button>
      </div>
    </Modal>
  );
};

export default DeleteCommentModal;