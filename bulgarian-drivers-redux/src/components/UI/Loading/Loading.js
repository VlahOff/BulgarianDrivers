import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import classes from './Loading.module.css';

const Backdrop = () => {
  return <div className={classes.backdrop}></div>;
};

const Loader = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes['custom-loader']}></div>
    </div>
  );
};

const portal = document.getElementById('overlays');

const Loading = (props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  });

  return (
    <>
      {createPortal(<Backdrop />, portal)}
      {createPortal(<Loader />, portal)}
    </>
  );
};

export default Loading;
