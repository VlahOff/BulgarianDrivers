import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import * as postService from '../../services/postsService';
import { validateInput } from '../../utils/inputValidation';
import { validateLicensePlate } from '../../utils/licensePlateValidation';

import Button from '../UI/Button';
import Card from '../UI/Card';
import Input from '../UI/Input';
import Textarea from '../UI/Textarea';

import classes from './CreatePost.module.css';

const CreatePost = (props) => {
  const navigate = useNavigate();

  const onCreatePostHandler = async (data) => {
    await postService.createPost(data);
    navigate('/drivers');
  };

  const { values, changeHandler, submitHandler } = useForm({
    carNumber: '',
    carNumberValid: null,
    title: '',
    titleValid: null,
    post: '',
    postValid: null,
  }, onCreatePostHandler);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(values.carNumberValid && values.titleValid && values.postValid);
  }, [values]);

  const onPlateNumberInput = (event) => {
    changeHandler(event, validateLicensePlate);
  };

  const onTitleInput = (event) => {
    changeHandler(event, validateInput);
  };

  const onPostInput = (event) => {
    changeHandler(event, validateInput);
  };

  return (
    <Card className={classes.card}>
      <h2 className={classes.title}>Create post</h2>
      <form className={classes.form} onSubmit={submitHandler}>
        <Input
          label={'Car number'}
          input={{
            id: 'carNumber',
            type: 'text',
            onChange: onPlateNumberInput,
            onBlur: onPlateNumberInput,
            value: values.carNumber,
            autoFocus: true,
            placeholder: 'CB1234MB'
          }}
          error={values.carNumberValid}
          errorMessage="Invalid car number"
        />
        <Input
          label={'Title'}
          input={{
            id: 'title',
            type: 'text',
            onChange: onTitleInput,
            onBlur: onTitleInput,
            value: values.title,
            placeholder: 'Some title'
          }}
          error={values.titleValid}
          errorMessage="Input must be at least 10 characters long."
        />
        <Textarea
          label={'Post'}
          id="post"
          textarea={{
            onChange: onPostInput,
            onBlur: onPostInput,
            value: values.post,
            placeholder: 'Some description'
          }}
          error={values.postValid}
          errorMessage="Input must be at least 10 characters long."
        />
        <Button
          className={classes.button}
          disabled={!isFormValid}
          type="submit"
        >Post it!</Button>
      </form>
    </Card>
  );
};

export default CreatePost;