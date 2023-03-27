import styles from './Textarea.module.css';

const Textarea = (props) => {
  const input = `${styles.input} ${props.error === false ? styles.error : ''}`;

  return (
    <div className={styles.wrapper}>
      <label htmlFor={props.id}>{props.label}</label>
      <textarea
        className={input}
        {...props.textarea}
        id={props.id}
        cols={props.cols || 30}
        rows={props.rows || 10}
      ></textarea>
    </div>
  );
};

export default Textarea;