import { useState } from 'react';

import * as authService from '../../services/authService';
import { validatePassword } from '../../utils/passwordValidation';

import Button from '../UI/Button';
import Input from '../UI/Input';
import Modal from '../UI/Modal';

import classes from './DeleteProfileModal.module.css';

const DeleteProfileModal = (props) => {
  const [password, setPassword] = useState({
    password: '',
    passwordValid: null
  });

  const onChangeHandler = (event) => {
    setPassword(state => {
      return { ...state, [event.target.id]: event.target.value };
    });
  };

  const passwordValidation = (event) => {
    setPassword(state => {
      return { ...state, [event.target.id + 'Valid']: validatePassword(event.target.value) };
    });
  };

  const deleteAccount = () => {
    if (password.passwordValid) {
      authService.deleteAccount({ password: password });
      return;
    }
  };

  return (
    <Modal
      onClose={props.closeModal}
      className={classes.modal}
    >
      <div className={classes['title-wrapper']}>
        <h2 className={classes.title}>Are you sure you want to delete your profile?</h2>
        <p className={classes['sub-title']}>There is no turning back.</p>
      </div>
      <div className={classes.input}>
        <Input
          label={'Password'}
          input={{
            id: 'password',
            type: 'password',
            onChange: onChangeHandler,
            onBlur: passwordValidation,
            value: password.password
          }}
          error={password.passwordValid}
        />
      </div>
      <div className={classes.actions}>
        <Button onClick={deleteAccount}>Yes</Button>
        <Button onClick={props.closeModal}>No</Button>
      </div>
    </Modal>
  );
};

export default DeleteProfileModal;