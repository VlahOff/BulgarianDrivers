import Card from '../UI/Card';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import classes from './PostDetails.module.css';
import * as postService from '../../services/postsService';
import AuthContext from '../../contexts/authContext';

const PostDetails = (props) => {
  const { id } = useParams();
  const authCtx = useContext(AuthContext);

  const [car, setCar] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    Promise.all([
      postService.getCar(id),
      postService.getPosts(id)
    ])
      .then(([car, comments]) => {
        setCar(car);
        setComments(comments);
      });

  }, [id]);

  return (
    <Card className={classes.card}>
      <header className={classes.header}>
        <h1 className={classes.title}>Comments about:
          <span className={classes.number}> {car.carNumber}</span>
        </h1>
      </header>
      <ul className={classes['posts-list']}>
        {comments.map(c => {
          return <Comment
            key={c._id}
            {...c}
            user={authCtx.user}
          />;
        })}
      </ul>
    </Card>
  );
};

export default PostDetails;