import { useContext, useEffect, useState } from 'react';
import PostsContext from '../../contexts/postsContext';
import { useForm } from '../../hooks/useForm';

import Button from '../UI/Button';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import Textarea from '../UI/Textarea';

import classes from './AddCommentModal.module.css';

const AddCommentModal = (props) => {
  const postsCtx = useContext(PostsContext);

  const { values, changeHandler, blurHandler, submitHandler } = useForm({
    title: '',
    titleValid: null,
    post: '',
    postValid: null
  }, postsCtx.addNewPost);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(values.titleValid && values.postValid);
  }, [values]);

  const isNotEmpty = (event) => {
    blurHandler(event.target.id, event.target.value.trim().length >= 10);
  };

  return (
    <Modal onClose={postsCtx.toggleAddModal}>
      <header className={classes.header}>
        <div className={classes.cross}></div>
        <h2 className={classes.title}>Add comment</h2>
        <i className={`${classes.cross} fa-solid fa-xmark`}
          onClick={postsCtx.toggleAddModal}
        ></i>
      </header>
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