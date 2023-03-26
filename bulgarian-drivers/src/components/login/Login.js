import { useContext, useEffect, useState } from 'react';

import AuthContext from '../../contexts/authContext';
import { useForm } from '../../hooks/useForm';
import { validateEmail } from '../../utils/emailValidation';
import { validatePassword } from '../../utils/passwordValidation';

import Button from '../UI/Button';
import Card from '../UI/Card';
import Input from '../UI/Input';

import styles from './Login.module.css';

const Login = () => {
  const authCtx = useContext(AuthContext);
  const { values, changeHandler, blurHandler, submitHandler } = useForm({
    email: '',
    emailValid: null,
    password: '',
    passwordValid: null
  }, authCtx.onLoginSubmit);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(values.emailValid && values.passwordValid);
  }, [values]);


  const emailValidation = (event) => {
    blurHandler(event.target.id, validateEmail(event.target.value));
  };

  const passwordValidation = (event) => {
    blurHandler(event.target.id, validatePassword(event.target.value));
  };

  return (
    <Card className={styles.card}>
      <h2 className={styles.title}>Login</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <Input
          className={styles.input}
          label={'E-mail'}
          input={{
            id: 'email',
            type: 'text',
            onChange: changeHandler,
            onBlur: emailValidation,
            value: values.email
          }}
          error={values.emailValid}
        />
        <Input
          className={styles.input}
          label={'Password'}
          input={{
            id: 'password',
            type: 'password',
            onChange: changeHandler,
            onBlur: passwordValidation,
            value: values.password
          }}
          error={values.passwordValid}
        />
        <Button type="submit" disabled={!isFormValid}>Login</Button>
      </form>
    </Card >
  );
};

export default Login;