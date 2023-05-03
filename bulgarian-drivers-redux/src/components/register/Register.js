import { useContext } from 'react';

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
  const { values, changeHandler, blurHandler, doPasswordMatch, submitHandler } = useForm({
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

  const onEmailBlur = (event) => {
    blurHandler(event, validateEmail);
  };

  const onUsernameBlur = (event) => {
    blurHandler(event, validateUsername);
  };

  const onPasswordBlur = (event) => {
    blurHandler(event, validatePassword);
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
            onChange: changeHandler,
            onBlur: onEmailBlur,
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
            onChange: changeHandler,
            onBlur: onUsernameBlur,
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
            onChange: changeHandler,
            onBlur: onPasswordBlur,
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
            onChange: changeHandler,
            onBlur: doPasswordMatch,
            value: values.rePassword,
          }}
          error={values.rePasswordValid}
          errorMessage="Passwords don`t match."
        />
        <Button type="submit">Register</Button>
      </form>
      <div className={styles['already-user']}>
        <p>Already have an account?</p>
        <LinkTo to="/login" className={styles.button}>Sign in</LinkTo>
      </div>
    </Card>
  );
};

export default Register;
