import { useContext, useEffect, useState } from 'react';

import AuthContext from '../../contexts/authContext';
import { useForm } from '../../hooks/useForm';
import { validateEmail } from '../../utils/emailValidation';

import Button from '../UI/Button';
import Card from '../UI/Card';
import Input from '../UI/Input';

import styles from './Register.module.css';

const Register = () => {
  const authCtx = useContext(AuthContext);
  const { values, changeHandler, blurHandler, submitHandler } = useForm({
    email: '',
    emailValid: null,
    username: '',
    usernameValid: null,
    password: '',
    passwordValid: null,
    rePassword: '',
    rePasswordValid: null,
  }, authCtx.onRegisterSubmit);

  const [isFormValid, setIsFormValid] = useState(false);
  const passwordsMatch = values.passwordValid === values.rePasswordValid;

  useEffect(() => {
    setIsFormValid(values.emailValid && values.passwordValid && passwordsMatch);
  }, [values, passwordsMatch]);

  const emailValidation = (event) => {
    blurHandler(event.target.id, validateEmail(event.target.value));
  };

  const usernameValidation = (event) => {
    const username = event.target.value;
    blurHandler(event.target.id, username.trim().length >= 3 && username.trim().length <= 30);
  };

  const passwordValidation = (event) => {
    //TODO: Add password validation
    blurHandler(event.target.id, event.target.value.trim().length >= 3);
  };

  return (
    <Card className={styles.card}>
      <h2 className={styles.title}>Register</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <Input
          error={values.emailValid}
          label={'E-mail'}
          input={{
            id: 'email',
            type: 'text',
            onChange: changeHandler,
            onBlur: emailValidation,
            value: values.email
          }}
        />
        <Input
          error={values.usernameValid}
          label={'Username'}
          input={{
            id: 'username',
            type: 'text',
            onChange: changeHandler,
            onBlur: usernameValidation,
            value: values.username
          }}
        />
        <Input
          error={values.passwordValid}
          label={'Password'}
          input={{
            id: 'password',
            type: 'password',
            onChange: changeHandler,
            onBlur: passwordValidation,
            value: values.password
          }}
        />
        <Input
          error={passwordsMatch}
          label={'Repeat Password'}
          input={{
            id: 'rePassword',
            type: 'password',
            onChange: changeHandler,
            onBlur: passwordValidation,
            value: values.rePassword
          }}
        />
        <Button type="submit" disabled={!isFormValid}>Register</Button>
      </form>
    </Card>
  );
};

export default Register;