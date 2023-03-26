import { useContext, useEffect, useState } from 'react';

import { useForm } from '../../hooks/useForm';
import PostsContext from '../../contexts/postsContext';

import Button from '../UI/Button';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import Textarea from '../UI/Textarea';

import classes from './EditCommentModal.module.css';

const EditCommentModal = (props) => {
  const postsCtx = useContext(PostsContext);
  const { values, changeHandler, blurHandler, submitHandler } = useForm({
    title: postsCtx.selectedPost.title,
    titleValid: true,
    post: postsCtx.selectedPost.post,
    postValid: true
  }, postsCtx.editPost);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(values.titleValid && values.postValid);
  }, [values]);

  const isNotEmpty = (event) => {
    blurHandler(event.target.id, event.target.value.trim().length >= 10);
  };

  return (
    <Modal onClose={postsCtx.toggleEditModal}>
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