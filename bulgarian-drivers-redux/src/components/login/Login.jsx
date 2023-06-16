import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { onLoginSubmit } from '../../store/auth-actions';
import { validateEmail } from '../../utils/emailValidation';
import { validatePassword } from '../../utils/passwordValidation';

import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import LinkTo from '../UI/Links/LinkTo';

import styles from './Login.module.css';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { values, isFormValid, changeHandler, blurHandler } = useForm({
		email: '',
		emailValid: null,
		password: '',
		passwordValid: null,
	});

	const onEmailBlur = event => {
		blurHandler(event, validateEmail);
	};

	const onPasswordBlur = event => {
		blurHandler(event, validatePassword);
	};

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
						onChange: changeHandler,
						onBlur: onEmailBlur,
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
						onChange: changeHandler,
						onBlur: onPasswordBlur,
						value: values.password,
					}}
					error={values.passwordValid}
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
