import { useContext } from 'react';

import PostsContext from '../../contexts/postsContext';
import { useForm } from '../../hooks/useForm';
import { validateInput } from '../../utils/inputValidation';

import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Modal from '../UI/Modal/Modal';
import Textarea from '../UI/Textarea/Textarea';

import classes from './EditCommentModal.module.css';

const EditCommentModal = (props) => {
  const postsCtx = useContext(PostsContext);
  const { values, isFormValid, changeHandler, submitHandler } = useForm({
      title: postsCtx.selectedPost.title,
      titleValid: true,
      post: postsCtx.selectedPost.post,
      postValid: true,
    },
    postsCtx.editPost
  );

  const onTitleInput = (event) => {
    changeHandler(event, validateInput);
  };

  const onCommentInput = (event) => {
    changeHandler(event, validateInput);
  };

  return (
    <Modal onClose={postsCtx.toggleEditModal} className={classes.modal}>
      <header className={classes.header}>
        <div className={classes.cross}></div>
        <h2 className={classes.title}>Edit comment</h2>
        <i
          className={`${classes.cross} fa-solid fa-xmark`}
          onClick={postsCtx.toggleEditModal}
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
          Edit
        </Button>
      </form>
    </Modal>
  );
};

export default EditCommentModal;
