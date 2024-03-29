import { useDispatch } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { postsActions } from '../../store/posts';
import { createNewPostForDriver } from '../../store/posts-actions';
import { validateInput } from '../../utils/inputValidation';
import Button from '../UI/button/Button';
import Input from '../UI/input/Input';
import Modal from '../UI/modal/Modal';
import Textarea from '../UI/textarea/Textarea';

import classes from './AddCommentModal.module.css';

const AddCommentModal = props => {
	const dispatch = useDispatch();

	const { values, isFormValid, changeHandler } = useForm({
		title: '',
		titleValid: null,
		post: '',
		postValid: null,
	});

	const toggleModalHandler = () => {
		dispatch(postsActions.toggleAddModal());
	};

	const commentSubmitHandler = event => {
		event.preventDefault();
		if (isFormValid) {
			dispatch(createNewPostForDriver(values));
		}
	};

	return (
		<Modal
			onClose={toggleModalHandler}
			className={classes.modal}
		>
			<header className={classes.header}>
				<div className={classes.cross}></div>
				<h2 className={classes.title}>Add comment</h2>
				<i
					className={`${classes.cross} fa-solid fa-xmark`}
					onClick={toggleModalHandler}
				></i>
			</header>
			<form
				className={classes.form}
				onSubmit={commentSubmitHandler}
			>
				<Input
					label="Title"
					input={{
						id: 'title',
						type: 'text',
						onChange: e => changeHandler(e, validateInput),
						value: values.title,
						placeholder: 'Some title',
					}}
					error={values.titleValid}
					errorMessage="Input must be at least 10 characters long."
				/>
				<Textarea
					label="Post"
					id="post"
					textarea={{
						onChange: e => changeHandler(e, validateInput),
						value: values.post,
						placeholder: 'Some description',
					}}
					error={values.postValid}
					errorMessage="Input must be at least 10 characters long."
				/>
				<Button type="submit">Post</Button>
			</form>
		</Modal>
	);
};

export default AddCommentModal;
