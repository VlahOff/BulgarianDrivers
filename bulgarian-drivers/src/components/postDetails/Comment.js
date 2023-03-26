import { transformDate } from '../../utils/dateTransformer';
import Button from '../UI/Button';
import classes from './Comment.module.css';

const Comment = (props) => {
  const post = props.post;
  const date = transformDate(post.updatedOn);

  const selectPost = () => {
    props.editPost(post);
  };

  const deletionConfirm = () => {
    props.deletionConfirm(post);
  };

  return (
    <li className={classes.post}>
      <article>
        <header className={classes['post-header']}>
          <h3>{post.title}</h3>
          <p>{post.username}</p>
        </header>
        <div className={classes['comment-wrapper']}>
          <p>{post.post}</p>
        </div>
        <footer className={classes.footer}>
          <div className={classes.actions}>
            {props.user?.userId === post.owner &&
              <>
                <Button onClick={selectPost}>Edit</Button>
                <Button onClick={deletionConfirm}>Delete</Button>
              </>
            }
          </div>
          <p>{date} <i className="fa-regular fa-clock"></i></p>
        </footer>
      </article>
    </li >
  );
};

export default Comment;