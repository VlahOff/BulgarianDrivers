import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/UI/button/Button';
import Card from '../../components/UI/card/Card';
import Input from '../../components/UI/input/Input';
import LinkTo from '../../components/UI/links/LinkTo';
import { useForm } from '../../hooks/useForm';
import { onLoginSubmit } from '../../store/auth-actions';
import { validateEmail } from '../../utils/emailValidation';
import { validatePassword } from '../../utils/passwordValidation';

import styles from './Login.module.css';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const { values, isFormValid, changeHandler } = useForm({
		email: '',
		emailValid: null,
		password: '',
		passwordValid: null,
	});

	const loginHandler = event => {
		event.preventDefault();
		if (isFormValid) {
			dispatch(onLoginSubmit(values, navigate));
		}
	};

	return (
		<Card className={styles.card}>
			<h2 className={styles.title}>Login</h2>
			<form
				className={styles.form}
				onSubmit={loginHandler}
			>
				<Input
					className={styles.input}
					label={'E-mail'}
					input={{
						id: 'email',
						type: 'text',
						onChange: e => changeHandler(e, validateEmail),
						value: values?.email,
					}}
					error={values?.emailValid}
					errorMessage="Invalid email."
				/>
				<Input
					className={styles.input}
					label={'Password'}
					input={{
						id: 'password',
						type: 'password',
						onChange: e => changeHandler(e, validatePassword),
						value: values?.password,
					}}
					error={values?.passwordValid}
					errorMessage="Invalid password."
				/>
				<Button type="submit">Login</Button>
			</form>
			<div className={styles['no-account']}>
				<p>Don&apos;t have an account?</p>
				<LinkTo
					to="/register"
					className={styles.button}
				>
					Sign up.
				</LinkTo>
			</div>
		</Card>
	);
};

export default Login;
