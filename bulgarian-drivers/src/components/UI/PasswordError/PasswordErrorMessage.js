import classes from './PasswordErrorMessage.module.css';

const PasswordErrorMessage = () => {
  return (
    <div className={classes.errMsg}>
      <h4>Password must contain</h4>
      <ul>
        <li>one uppercase letter</li>
        <li>one lowercase letter</li>
        <li>one number and also</li>
        <li>must be at least 8 characters long!</li>
      </ul>
    </div>
  );
};

export default PasswordErrorMessage;
