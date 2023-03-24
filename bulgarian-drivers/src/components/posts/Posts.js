import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as postService from '../../services/postsService';

import Post from './Post';

import Card from '../UI/Card';
import LinkTo from '../UI/LinkTo';
import classes from './Posts.module.css';

const Posts = () => {
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    postService.getCarList()
      .then(setCarList)
      .catch(err => console.log(err));
      
  }, []);

  return (
    <Card className={classes.card}>
      <header className={classes.header}>
        <h2 className={classes.title}>Recent posts</h2>
        <LinkTo to="/create-post">Create a post</LinkTo>
      </header>
      <ul className={classes.posts}>
        {carList.map(p => {
          return <Link
            key={p._id}
            to={`/posts/${p._id}`}
            className={classes.link}
          >
            <Post
              className={classes.post}
              carNumber={p.carNumber}
              updatedOn={p.updatedOn}
              posts={p.posts.length}
            />
          </Link>;
        })}
      </ul>
    </Card>
  );
};

export default Posts;