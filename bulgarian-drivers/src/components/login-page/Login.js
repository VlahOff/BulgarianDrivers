import Card from '../UI/Card';
import Input from '../UI/Input';
import Button from '../UI/Button';

import styles from './Login.module.css';

const Login = () => {
  return (
    <Card className={styles.card}>
      <h2 className={styles.title}>Login</h2>
      <form className={styles.form}>
        <Input
          className={styles.input}
          label={'E-mail'}
          input={{
            id: 'email',
            type: 'email'
          }}
        />
        <Input
          className={styles.input}
          label={'Password'}
          input={{
            id: 'password',
            type: 'password'
          }}
        />
        <Button>Login</Button>
      </form>
    </Card>
  );
};

export default Login;