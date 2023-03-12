import Button from '../UI/Button';
import Card from '../UI/Card';
import Input from '../UI/Input';

import styles from './Register.module.css';

const Register = () => {
  return (
    <Card className={styles.card}>
      <h2 className={styles.title}>Register</h2>
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
        <Input
          className={styles.input}
          label={'Repeat Password'}
          input={{
            id: 'rePassword',
            type: 'password'
          }}
        />
        <Button>Register</Button>
      </form>
    </Card>
  );
};

export default Register;