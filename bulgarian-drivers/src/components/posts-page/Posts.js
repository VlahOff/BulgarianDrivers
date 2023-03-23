import LinkTo from '../UI/LinkTo';
import classes from './Posts.module.css';

const Posts = () => {
  return (
    <section className={classes.section}>
      <header className={classes.header}>
        <h2 className={classes.title}>Recent posts</h2>
        <LinkTo to="/create-post">Create a post</LinkTo>
      </header>
      <ul className={classes.posts}>
        <li className={classes.post}>
          <p className={classes.number}>CB 4206 MT</p>
          <p>Comments: 4</p>
        </li>
        <li className={classes.post}>
          <p className={classes.number}>E 4206 MT</p>
          <p>Comments: 4</p>
        </li>
        <li className={classes.post}>
          <p className={classes.number}>CB 4206 MT</p>
          <p>Comments: 4</p>
        </li>
      </ul>
    </section>
  );
};

export default Posts;