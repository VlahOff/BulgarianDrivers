import { useContext } from 'react';

import PostsContext from '../../contexts/postsContext';
import { transformDate } from '../../utils/dateTransformer';

import CommentVoting from './CommentVoting';
import Button from '../UI/Button/Button';

import classes from './Comment.module.css';

const Comment = (props) => {
  const postsCtx = useContext(PostsContext);

  const post = props.post;
  const date = transformDate(post.updatedOn);

  return (
    <li className={classes['post-item']}>

      <CommentVoting
        carId={post.carId}
        commentId={post._id}
      />

      <article className={classes.post}>

        <header className={classes['post-header']}>
          <h3 className={classes.title}>{post.title}</h3>
          <p>u/{post.username}</p>
        </header>

        <div className={classes['comment-wrapper']}>
          <p className={classes.comment}>{post.post}</p>
        </div>

        <footer className={classes.footer}>
          <div className={classes.actions}>
            {props.user?.userId === post.owner && (
              <>
                <Button onClick={() => postsCtx.toggleEditModal(post)}>
                  Edit
                </Button>
                <Button onClick={() => postsCtx.toggleDeleteModal(post)}>
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
