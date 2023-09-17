import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { onAccountDeletion } from '../../store/auth-actions';
import { validatePassword } from '../../utils/passwordValidation';
import Button from '../UI/button/Button';
import Input from '../UI/input/Input';
import Modal from '../UI/modal/Modal';

import classes from './DeleteProfileModal.module.css';

const DeleteProfileModal = props => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { values, isFormValid, changeHandler } = useForm({
		password: '',
		passwordValid: null,
	});

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
							onChange: e => changeHandler(e, validatePassword),
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
