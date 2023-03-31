import { useContext, useEffect, useState } from 'react';

import AuthContext from '../../contexts/authContext';
import { useForm } from '../../hooks/useForm';
import { validateEmail } from '../../utils/emailValidation';
import { validatePassword } from '../../utils/passwordValidation';

import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import LinkTo from '../UI/Links/LinkTo';
import PasswordErrorMessage from '../UI/PasswordError/PasswordErrorMessage';

import styles from './Register.module.css';

const validateUsername = (username) => {
  return username.trim().length >= 3 && username.trim().length <= 30;
};

const Register = () => {
  const authCtx = useContext(AuthContext);
  const { values, changeHandler, submitHandler } = useForm(
    {
      email: '',
      emailValid: null,
      username: '',
      usernameValid: null,
      password: '',
      passwordValid: null,
      rePassword: '',
      rePasswordValid: null,
    },
    authCtx.onRegisterSubmit
  );

  const [isFormValid, setIsFormValid] = useState(false);
  const passwordsMatch = values.passwordValid === values.rePasswordValid;

  useEffect(() => {
    setIsFormValid(
      values.emailValid &&
        values.username &&
        values.passwordValid &&
        passwordsMatch
    );
  }, [values, passwordsMatch]);

  const onEmailInput = (event) => {
    changeHandler(event, validateEmail);
  };

  const onUsernameInput = (event) => {
    changeHandler(event, validateUsername);
  };

  const onPasswordInput = (event) => {
    changeHandler(event, validatePassword);
  };

  return (
    <Card className={styles.card}>
      <h2 className={styles.title}>Register</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <Input
          label={'E-mail'}
          input={{
            id: 'email',
            type: 'text',
            onChange: onEmailInput,
            onBlur: onEmailInput,
            value: values.email,
          }}
          error={values.emailValid}
          errorMessage={<p>Invalid email.</p>}
        />
        <Input
          label={'Username'}
          input={{
            id: 'username',
            type: 'text',
            onChange: onUsernameInput,
            onBlur: onUsernameInput,
            value: values.username,
          }}
          error={values.usernameValid}
          errorMessage={<p>Invalid username.</p>}
        />
        <Input
          label={'Password'}
          input={{
            id: 'password',
            type: 'password',
            onChange: onPasswordInput,
            onBlur: onPasswordInput,
            value: values.password,
          }}
          error={values.passwordValid}
          errorMessage={<PasswordErrorMessage />}
        />
        <Input
          label={'Repeat Password'}
          input={{
            id: 'rePassword',
            type: 'password',
            onChange: onPasswordInput,
            onBlur: onPasswordInput,
            value: values.rePassword,
          }}
          error={passwordsMatch}
        />
        <Button type="submit" disabled={!isFormValid}>
          Register
        </Button>
      </form>
      <p>
        Already have an account?{' '}
        <LinkTo to="/login" className={styles.button}>
          Sign in.
        </LinkTo>
      </p>
    </Card>
  );
};

export default Register;
