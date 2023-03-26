import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import * as postService from '../../services/postsService';
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

  const { values, changeHandler, blurHandler, submitHandler } = useForm({
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

  const validatePlateNum = (event) => {
    blurHandler(event.target.id, validateLicensePlate(event.target.value));
  };

  const isNotEmpty = (event) => {
    blurHandler(event.target.id, event.target.value.trim().length >= 10);
  };

  return (
    <Card className={classes.card}>
      <h2 className={classes.title}>Create post</h2>
      <form className={classes.form} onSubmit={submitHandler}>
        <Input
          className={classes.input}
          label={'Car number'}
          input={{
            id: 'carNumber',
            type: 'text',
            onChange: changeHandler,
            onBlur: validatePlateNum,
            value: values.carNumber,
            autoFocus: true,
            placeholder: 'CB1234MB'
          }}
          error={values.carNumberValid}
        />
        <Input
          className={classes.input}
          label={'Title'}
          input={{
            id: 'title',
            type: 'text',
            onChange: changeHandler,
            onBlur: isNotEmpty,
            value: values.title,
            placeholder: 'Some title'
          }}
          error={values.titleValid}
        />
        <Textarea
          label={'Post'}
          id="post"
          textarea={{
            onChange: changeHandler,
            onBlur: isNotEmpty,
            value: values.post,
            placeholder: 'Some description'
          }}
          error={values.postValid}
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