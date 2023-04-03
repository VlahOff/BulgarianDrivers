import { useContext } from 'react';

import AuthContext from '../../contexts/authContext';
import { useForm } from '../../hooks/useForm';
import { validateEmail } from '../../utils/emailValidation';
import { validatePassword } from '../../utils/passwordValidation';

import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import LinkTo from '../UI/Links/LinkTo';

import styles from './Login.module.css';

const Login = () => {
  const authCtx = useContext(AuthContext);
  const { values, isFormValid, changeHandler, submitHandler } = useForm({
      email: '',
      emailValid: null,
      password: '',
      passwordValid: null,
    },
    authCtx.onLoginSubmit
  );

  const onEmailInput = (event) => {
    changeHandler(event, validateEmail);
  };

  const onPasswordInput = (event) => {
    changeHandler(event, validatePassword);
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
            onChange: onEmailInput,
            onBlur: onEmailInput,
            value: values.email,
          }}
          error={values.emailValid}
          errorMessage="Invalid email."
        />
        <Input
          className={styles.input}
          label={'Password'}
          input={{
            id: 'password',
            type: 'password',
            onChange: onPasswordInput,
            onBlur: onPasswordInput,
            value: values.password,
          }}
          error={values.passwordValid}
          errorMessage="Invalid password."
        />
        <Button type="submit" disabled={!isFormValid}>
          Login
        </Button>
      </form>
      <p>
        Don't have an account?{' '}
        <LinkTo to="/register" className={styles.button}>
          Sign up.
        </LinkTo>
      </p>
    </Card>
  );
};

export default Login;
