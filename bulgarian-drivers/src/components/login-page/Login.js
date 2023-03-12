import { useEffect, useReducer, useState } from 'react';

import Button from '../UI/Button';
import Card from '../UI/Card';
import Input from '../UI/Input';

import styles from './Login.module.css';

const defaultState = {
  email: '',
  emailValid: null,
  password: '',
  passwordValid: null
};

const formReducer = (state, action) => {
  if (action.type === 'EMAIL_INPUT') {
    return { ...state, email: action.val, emailValid: action.val.trim().includes('@') };
  }
  if (action.type === 'EMAIL_VALIDATE') {
    return { ...state, email: state.email, emailValid: state.email.trim().includes('@') };
  }
  if (action.type === 'PASSWORD_INPUT') {
    return { ...state, password: action.val, passwordValid: action.val.trim().length >= 6 };
  }
  if (action.type === 'PASSWORD_VALIDATE') {
    return { ...state, password: state.password, passwordValid: state.password.trim().length >= 6 };
  }

  return defaultState;
};

const Login = () => {
  const [formState, dispatchForm] = useReducer(formReducer, defaultState);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(formState.emailValid && formState.passwordValid);
  }, [formState]);

  const emailChangeHandler = (event) => {
    dispatchForm({ type: 'EMAIL_INPUT', val: event.target.value });
  };

  const emailValidationHandler = () => {
    dispatchForm({ type: 'EMAIL_VALIDATE' });
  };

  const passwordChangeHandler = (event) => {
    dispatchForm({ type: 'PASSWORD_INPUT', val: event.target.value });
  };

  const passwordValidationHandler = () => {
    dispatchForm({ type: 'PASSWORD_VALIDATE' });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    console.log(formState);
  };

  return (
    <Card className={styles.card}>
      <h2 className={styles.title}>Login</h2>
      <form className={styles.form} onSubmit={formSubmitHandler}>
        <Input
          className={styles.input}
          label={'E-mail'}
          input={{
            id: 'email',
            type: 'email',
            onChange: emailChangeHandler,
            onBlur: emailValidationHandler,
            value: formState.email
          }}
          error={formState.emailValid}
        />
        <Input
          className={styles.input}
          label={'Password'}
          input={{
            id: 'password',
            type: 'password',
            onChange: passwordChangeHandler,
            onBlur: passwordValidationHandler,
            value: formState.password
          }}
          error={formState.passwordValid}
        />
        <Button type="submit" disabled={!isFormValid}>Login</Button>
      </form>
    </Card >
  );
};

export default Login;