import Button from '../UI/Button';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import classes from './EditCommentModal.module.css';
import { useForm } from '../../hooks/useForm';
import Textarea from '../UI/Textarea';
import { useEffect, useState } from 'react';
import * as postService from '../../services/postsService';

const EditCommentModal = (props) => {
  const { values, changeHandler, blurHandler, submitHandler } = useForm({
    title: props.postForEdit.title,
    titleValid: true,
    post: props.postForEdit.post,
    postValid: true
  }, onSubmit);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(values.titleValid && values.postValid);
  }, [values]);

  const isNotEmpty = (event) => {
    blurHandler(event.target.id, event.target.value.trim().length >= 10);
  };

  function onSubmit(data) {
    postService.editPost(data, props.postForEdit.carNumber, props.postForEdit._id)
      .then(data => props.addEditedPost(data));
  };

  return (
    <Modal onClose={props.toggleModal}>
      <h2 className={classes.title}>Edit post</h2>
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
        >Edit</Button>
      </form>
    </Modal>
  );
};

export default EditCommentModal;