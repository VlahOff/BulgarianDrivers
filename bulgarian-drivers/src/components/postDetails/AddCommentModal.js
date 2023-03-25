import { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';

import * as postServices from '../../services/postsService';

import Button from '../UI/Button';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import Textarea from '../UI/Textarea';
import classes from './AddCommentModal.module.css';

const AddCommentModal = (props) => {
  const { values, changeHandler, blurHandler, submitHandler } = useForm({
    title: '',
    titleValid: null,
    post: '',
    postValid: null
  }, onSubmit);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(values.titleValid && values.postValid);
  }, [values]);

  const isNotEmpty = (event) => {
    blurHandler(event.target.id, event.target.value.trim().length >= 10);
  };

  function onSubmit() {
    postServices.createPost({
      carNumber: props.car.carNumber,
      title: values.title,
      post: values.post,
    })
      .then(res => props.addNewPost(res));
  };

  return (
    <Modal onClose={props.toggleModal}>
      <h2 className={classes.title}>Add post</h2>
      <form className={classes.form} onSubmit={submitHandler}>
        <Input
          label="Title"
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
          label="Post"
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
          disabled={!isFormValid}
          type="submit"
        >Add</Button>
      </form>
    </Modal>
  );
};

export default AddCommentModal;