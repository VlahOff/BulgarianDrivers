import { useEffect, useReducer, useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Input from '../UI/Input';

import styles from './Register.module.css';

const defaultState = {
  email: '',
  emailValid: null,
  password: '',
  passwordValid: null,
  rePassword: '',
  passMatch: null
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
  if (action.type === 'REPASS_INPUT') {
    return { ...state, rePassword: action.val, passMatch: action.val.trim() === state.rePassword };
  }
  if (action.type === 'REPASS_VALIDATE') {
    return { ...state, rePassword: state.rePassword, passMatch: state.password === state.rePassword };
  }

  return defaultState;
};

const Register = () => {
  const [formState, dispatchForm] = useReducer(formReducer, defaultState);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(formState.emailValid && formState.passwordValid && formState.passMatch);
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

  const rePassChangeHandler = (event) => {
    dispatchForm({ type: 'REPASS_INPUT', val: event.target.value });
  };

  const rePassValidationHandler = () => {
    dispatchForm({ type: 'REPASS_VALIDATE' });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    console.log(formState);
  };

  return (
    <Card className={styles.card}>
      <h2 className={styles.title}>Register</h2>
      <form className={styles.form} onSubmit={formSubmitHandler}>
        <Input
          error={formState.emailValid}
          label={'E-mail'}
          input={{
            id: 'email',
            type: 'email',
            onChange: emailChangeHandler,
            onBlur: emailValidationHandler,
            value: formState.email
          }}
        />
        <Input
          error={formState.passwordValid}
          label={'Password'}
          input={{
            id: 'password',
            type: 'password',
            onChange: passwordChangeHandler,
            onBlur: passwordValidationHandler,
            value: formState.password
          }}
        />
        <Input
          error={formState.passMatch}
          label={'Repeat Password'}
          input={{
            id: 'rePassword',
            type: 'password',
            onChange: rePassChangeHandler,
            onBlur: rePassValidationHandler,
            value: formState.rePassword
          }}
        />
        <Button type="submit" disabled={!isFormValid}>Register</Button>
      </form>
    </Card>
  );
};

export default Register;