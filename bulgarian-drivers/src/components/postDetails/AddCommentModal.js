import { useContext, useEffect, useState } from 'react';

import PostsContext from '../../contexts/postsContext';
import { useForm } from '../../hooks/useForm';
import { validateInput } from '../../utils/inputValidation';

import Button from '../UI/Button';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import Textarea from '../UI/Textarea';

import classes from './AddCommentModal.module.css';

const AddCommentModal = (props) => {
  const postsCtx = useContext(PostsContext);

  const { values, changeHandler, submitHandler } = useForm(
    {
      title: '',
      titleValid: null,
      post: '',
      postValid: null,
    },
    postsCtx.addNewPost
  );

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(values.titleValid && values.postValid);
  }, [values]);

  const onTitleInput = (event) => {
    changeHandler(event, validateInput);
  };

  const onCommentInput = (event) => {
    changeHandler(event, validateInput);
  };

  return (
    <Modal onClose={postsCtx.toggleAddModal} className={classes.modal}>
      <header className={classes.header}>
        <div className={classes.cross}></div>
        <h2 className={classes.title}>Add comment</h2>
        <i
          className={`${classes.cross} fa-solid fa-xmark`}
          onClick={postsCtx.toggleAddModal}
        ></i>
      </header>
      <form className={classes.form} onSubmit={submitHandler}>
        <Input
          label="Title"
          input={{
            id: 'title',
            type: 'text',
            onChange: onTitleInput,
            onBlur: onTitleInput,
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
            onChange: onCommentInput,
            onBlur: onCommentInput,
            value: values.post,
            placeholder: 'Some description',
          }}
          error={values.postValid}
          errorMessage="Input must be at least 10 characters long."
        />
        <Button disabled={!isFormValid} type="submit">
          Add
        </Button>
      </form>
    </Modal>
  );
};

export default AddCommentModal;
