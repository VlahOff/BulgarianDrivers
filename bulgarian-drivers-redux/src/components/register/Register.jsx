import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { onRegisterSubmit } from '../../store/auth-actions';
import { validateEmail } from '../../utils/emailValidation';
import { validatePassword } from '../../utils/passwordValidation';
import { validateUsername } from '../../utils/usernameValidation';

import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import LinkTo from '../UI/Links/LinkTo';
import PasswordErrorMessage from '../UI/PasswordError/PasswordErrorMessage';

import styles from './Register.module.css';

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { values, isFormValid, changeHandler, blurHandler, doPasswordMatch } =
		useForm({
			email: '',
			emailValid: null,
			username: '',
			usernameValid: null,
			password: '',
			passwordValid: null,
			rePassword: '',
			rePasswordValid: null,
		});

	const onEmailBlur = event => {
		blurHandler(event, validateEmail);
	};

	const onUsernameBlur = event => {
		blurHandler(event, validateUsername);
	};

	const onPasswordBlur = event => {
		blurHandler(event, validatePassword);
	};

	const registerHandler = event => {
		event.preventDefault();
		if (isFormValid) {
			dispatch(onRegisterSubmit(values, navigate));
		}
	};

	return (
		<Card className={styles.card}>
			<h2 className={styles.title}>Register</h2>
			<form
				className={styles.form}
				onSubmit={registerHandler}
			>
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
				<LinkTo
					to="/login"
					className={styles.button}
				>
					Sign in
				</LinkTo>
			</div>
		</Card>
	);
};

export default Register;
