import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { postsActions } from '../../store/posts';
import { editPost } from '../../store/posts-actions';
import { validateInput } from '../../utils/inputValidation';

import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Modal from '../UI/Modal/Modal';
import Textarea from '../UI/Textarea/Textarea';

import classes from './EditCommentModal.module.css';

const EditCommentModal = props => {
	const dispatch = useDispatch();
	const selectedPost = useSelector(state => state.posts.selectedPost);

	const { values, isFormValid, changeHandler, blurHandler } = useForm({
		title: selectedPost.title,
		titleValid: true,
		post: selectedPost.post,
		postValid: true,
	});

	const onTitleBlur = event => {
		blurHandler(event, validateInput);
	};

	const onCommentBlur = event => {
		blurHandler(event, validateInput);
	};

	const toggleEditModal = () => {
		dispatch(postsActions.toggleEditModal());
	};

	const onEditHandler = event => {
		event.preventDefault();
		if (isFormValid) {
			dispatch(editPost(values));
		}
	};

	return (
		<Modal
			onClose={toggleEditModal}
			className={classes.modal}
		>
			<header className={classes.header}>
				<div className={classes.cross}></div>
				<h2 className={classes.title}>Edit comment</h2>
				<i
					className={`${classes.cross} fa-solid fa-xmark`}
					onClick={toggleEditModal}
				></i>
			</header>
			<form
				className={classes.form}
				onSubmit={onEditHandler}
			>
				<Input
					label="Title"
					input={{
						id: 'title',
						type: 'text',
						onChange: changeHandler,
						onBlur: onTitleBlur,
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
						onChange: changeHandler,
						onBlur: onCommentBlur,
						value: values.post,
						placeholder: 'Some description',
					}}
					error={values.postValid}
					errorMessage="Input must be at least 10 characters long."
				/>
				<Button type="submit">Edit</Button>
			</form>
		</Modal>
	);
};

export default EditCommentModal;
