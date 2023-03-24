import classes from './Comment.module.css';
import Button from '../UI/Button';
import { transformDate } from '../../utils/dateTransformer';

const Comment = (props) => {
  const date = transformDate(props.updatedOn);

  return (
    <li className={classes.post}>
      <article>
        <header className={classes['post-header']}>
          <h3>{props.title}</h3>
          <p>{props.username}</p>
        </header>
        <div className={classes['comment-wrapper']}>
          <p>{props.post}</p>
        </div>
        <footer className={classes.footer}>
          <div className={classes.actions}>
            {props.user.userId === props.owner &&
              <>
                <Button>Edit</Button>
                <Button>Delete</Button>
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