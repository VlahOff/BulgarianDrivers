import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/UI/button/Button';
import Card from '../../components/UI/card/Card';
import Input from '../../components/UI/input/Input';
import Textarea from '../../components/UI/textarea/Textarea';
import { useForm } from '../../hooks/useForm';
import { createNewPost } from '../../store/posts-actions';
import { validateInput } from '../../utils/inputValidation';
import { validateLicensePlate } from '../../utils/licensePlateValidation';

import classes from './CreatePost.module.css';

const CreatePost = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { values, isFormValid, changeHandler } = useForm({
		carNumber: '',
		carNumberValid: null,
		title: '',
		titleValid: null,
		post: '',
		postValid: null,
	});

	const onCreatePostHandler = event => {
		event.preventDefault();
		if (isFormValid) {
			dispatch(createNewPost(values, navigate));
		}
	};

	return (
		<Card className={classes.card}>
			<h2 className={classes.title}>Create post</h2>
			<form
				className={classes.form}
				onSubmit={onCreatePostHandler}
			>
				<Input
					label={'Car number'}
					input={{
						id: 'carNumber',
						type: 'text',
						onChange: e => changeHandler(e, validateLicensePlate),
						value: values.carNumber,
						autoFocus: true,
						placeholder: 'CB1234MB',
					}}
					error={values.carNumberValid}
					errorMessage="Invalid car number"
				/>
				<Input
					label={'Title'}
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
					label={'Post'}
					id="post"
					textarea={{
						onChange: e => changeHandler(e, validateInput),
						value: values.post,
						placeholder: 'Some description',
					}}
					error={values.postValid}
					errorMessage="Input must be at least 10 characters long."
				/>
				<Button
					className={classes.button}
					type="submit"
				>
					Post
				</Button>
			</form>
		</Card>
	);
};

export default CreatePost;
