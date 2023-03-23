import styles from './Card.module.css';

const Card = (props) => {
  const classes = `${styles.card} ${props.className}`;

  return (
    <section className={classes}>{props.children}</section>
  );
};

export default Card;