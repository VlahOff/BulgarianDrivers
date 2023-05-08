import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { createNewPost } from '../../store/posts-actions';
import { validateInput } from '../../utils/inputValidation';
import { validateLicensePlate } from '../../utils/licensePlateValidation';

import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import Textarea from '../UI/Textarea/Textarea';

import classes from './CreatePost.module.css';

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, isFormValid, changeHandler, blurHandler } = useForm({
    carNumber: '',
    carNumberValid: null,
    title: '',
    titleValid: null,
    post: '',
    postValid: null,
  });

  const onPlateNumberBlur = (event) => {
    blurHandler(event, validateLicensePlate);
  };

  const onTitleBlur = (event) => {
    blurHandler(event, validateInput);
  };

  const onPostBlur = (event) => {
    blurHandler(event, validateInput);
  };

  const onCreatePostHandler = (event) => {
    event.preventDefault();
    if (isFormValid) {
      dispatch(createNewPost(values, navigate));
    }
  };

  return (
    <Card className={classes.card}>
      <h2 className={classes.title}>Create post</h2>
      <form className={classes.form} onSubmit={onCreatePostHandler}>
        <Input
          label={'Car number'}
          input={{
            id: 'carNumber',
            type: 'text',
            onChange: changeHandler,
            onBlur: onPlateNumberBlur,
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
            onChange: changeHandler,
            onBlur: onTitleBlur,
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
            onChange: changeHandler,
            onBlur: onPostBlur,
            value: values.post,
            placeholder: 'Some description',
          }}
          error={values.postValid}
          errorMessage="Input must be at least 10 characters long."
        />
        <Button className={classes.button} type="submit">Post</Button>
      </form>
    </Card>
  );
};

export default CreatePost;
