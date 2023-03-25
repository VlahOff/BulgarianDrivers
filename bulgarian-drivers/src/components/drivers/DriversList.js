import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as postService from '../../services/postsService';

import Driver from './Driver';
import Card from '../UI/Card';
import LinkTo from '../UI/LinkTo';

import classes from './DriversList.module.css';

const DriversList = () => {
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    postService.getCarList()
      .then(setCarList)
      .catch(err => console.log(err));
      
  }, []);

  return (
    <Card className={classes.card}>
      <header className={classes.header}>
        <h2 className={classes.title}>Recent</h2>
        <LinkTo to="/create-post">Create a post</LinkTo>
      </header>
      <ul className={classes.posts}>
        {carList.map(p => {
          return <Link
            key={p._id}
            to={`/drivers/${p._id}`}
            className={classes.link}
          >
            <Driver
              className={classes.post}
              carNumber={p.carNumber}
              updatedOn={p.updatedOn}
              comments={p.posts.length}
            />
          </Link>;
        })}
      </ul>
    </Card>
  );
};

export default DriversList;