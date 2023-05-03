import styles from './Step.module.css';

const Step = (props) => {
  return (
    <li className={styles.step}>
      <img src={props.img} alt={props.alt} className={styles.img} />
      <p className={styles.description}>{props.description}</p>
    </li>
  );
};

export default Step;
