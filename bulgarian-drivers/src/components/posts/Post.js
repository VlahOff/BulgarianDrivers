import { transformDate } from '../../utils/dateTransformer';
import classes from './Post.module.css';

const Post = (props) => {
  const date = transformDate(props.updatedOn);

  return (
    <li className={classes.post}>
      <p className={classes.number}>{props.carNumber}</p>
      <div className={classes['details-wrapper']}>
        <p>Comments: {props.posts}</p>
        <p>Latest post: {date} <i className="fa-regular fa-clock"></i></p>
      </div>
    </li>
  );
};

export default Post;