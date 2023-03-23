import { useContext, useEffect, useState } from 'react';
import PostsContext from '../../contexts/postsContext';
import { useForm } from '../../hooks/useForm';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Input from '../UI/Input';
import Textarea from '../UI/Textarea';
import classes from './CreatePost.module.css';

const CreatePost = (props) => {
  const postsCtx = useContext(PostsContext);
  const { values, changeHandler, blurHandler, submitHandler } = useForm({
    carNumber: '',
    carNumberValid: null,
    title: '',
    titleValid: null,
    post: '',
    postValid: null,
  }, postsCtx.onCreatePostHandler);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(values.carNumberValid && values.titleValid && values.postValid);
  }, [values]);

  const validatePlateNum = (event) => {
    const licensePlateReg = /^[A-Z]{1,2} [0-9]{4} [A-Z]{2}$/;
    blurHandler(event.target.id, licensePlateReg.test(event.target.value.trim()));
  };

  const isNotEmpty = (event) => {
    blurHandler(event.target.id, event.target.value.trim().length > 1);
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
            placeholder: 'CB 1234 MB'
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