import { createPortal } from 'react-dom';

import Card from './Card';
import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const portal = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <>
      {createPortal(<Backdrop onClose={props.onClose} />, portal)}
      {createPortal(<Card className={classes.modal}>{props.children}</Card>, portal)}
    </>
  );
};

export default Modal;