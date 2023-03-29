import { useContext } from 'react';

import PostsContext from '../../contexts/postsContext';
import { transformDate } from '../../utils/dateTransformer';

import Button from '../UI/Button';
import classes from './Comment.module.css';

const Comment = (props) => {
  const postsCtx = useContext(PostsContext);
  const post = props.post;
  const date = transformDate(post.updatedOn);

  return (
    <li className={classes.post}>
      <article>
        <header className={classes['post-header']}>
          <h3 className={classes.title}>{post.title}</h3>
          <p>{post.username}</p>
        </header>
        <div className={classes['comment-wrapper']}>
          <p>{post.post}</p>
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
