import { useDispatch } from 'react-redux';

import { postsActions } from '../../store/posts';
import { transformDate } from '../../utils/dateTransformer';

import Button from '../UI/Button/Button';
import CommentVoting from './CommentVoting';

import classes from './Comment.module.css';

const Comment = (props) => {
  const dispatch = useDispatch();
  const comment = props.post;
  const date = transformDate(comment.updatedOn);

  const onEditClick = () => {
    dispatch(postsActions.selectComment(comment));
    dispatch(postsActions.toggleEditModal());
  };

  const onDeleteClick = () => {
    dispatch(postsActions.selectComment(comment));
    dispatch(postsActions.toggleDeleteModal());
  };

  return (
    <li className={classes['post-item']}>

      <CommentVoting
        carId={comment.carId}
        commentId={comment._id}
      />

      <article className={classes.post}>

        <header className={classes['post-header']}>
          <h3 className={classes.title}>{comment.title}</h3>
          <p>u/{comment.username}</p>
        </header>

        <div className={classes['comment-wrapper']}>
          <p className={classes.comment}>{comment.post}</p>
        </div>

        <footer className={classes.footer}>
          <div className={classes.actions}>
            {props.user?.userId === comment.owner && (
              <>
                <Button onClick={onEditClick}>
                  Edit
                </Button>
                <Button onClick={onDeleteClick}>
                  Delete
                </Button>
              </>
            )}
          </div>
          <p>
            {date} <i className="fa-regular fa-clock"></i>
          </p>
        </footer>

      </article>
    </li>
  );
};

export default Comment;
