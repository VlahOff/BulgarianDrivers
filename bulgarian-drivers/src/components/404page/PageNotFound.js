import classes from './PageNotFound.module.css';
import pageNotFound from '../../assets/page-not-found.png';

const PageNotFound = () => {
  return (
    <div className={classes['error-wrapper']}>
      <h1 className={classes.title}>404 Page Not Found</h1>
      <img src={pageNotFound} alt="404 page not found" className={classes.img} />
    </div>
  );
};

export default PageNotFound;