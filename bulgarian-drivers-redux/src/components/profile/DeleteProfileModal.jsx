import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { onAccountDeletion } from '../../store/auth-actions';
import { validatePassword } from '../../utils/passwordValidation';

import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Modal from '../UI/Modal/Modal';

import classes from './DeleteProfileModal.module.css';

const DeleteProfileModal = props => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { values, isFormValid, changeHandler, blurHandler } = useForm({
		password: '',
		passwordValid: null,
	});

	const onPasswordBlur = event => {
		blurHandler(event, validatePassword);
	};

	const onAccountDeletionSubmitHandler = event => {
		event.preventDefault();
		if (isFormValid) {
			dispatch(onAccountDeletion(values.password, navigate));
		}
	};

	return (
		<Modal
			onClose={props.closeModal}
			className={classes.modal}
		>
			<form onSubmit={onAccountDeletionSubmitHandler}>
				<div className={classes['title-wrapper']}>
					<h2 className={classes.title}>
						Are you sure you want to delete your profile?
					</h2>
					<p className={classes['sub-title']}>There is no turning back.</p>
				</div>
				<div className={classes.input}>
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
					/>
				</div>
				<div className={classes.actions}>
					<Button
						type="submit"
						disabled={!values.passwordValid}
					>
						Yes
					</Button>
					<Button onClick={props.closeModal}>No</Button>
				</div>
			</form>
		</Modal>
	);
};

export default DeleteProfileModal;
