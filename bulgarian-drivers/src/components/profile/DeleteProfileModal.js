import { useContext } from 'react';

import AuthContext from '../../contexts/authContext';
import { validatePassword } from '../../utils/passwordValidation';
import { useForm } from '../../hooks/useForm';

import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Modal from '../UI/Modal/Modal';

import classes from './DeleteProfileModal.module.css';

const DeleteProfileModal = (props) => {
  const authCtx = useContext(AuthContext);
  const { values, isFormValid, changeHandler, submitHandler } = useForm({
    password: '',
    passwordValid: null,
  }, deleteAccount);

  const onPasswordChange = (event) => {
    changeHandler(event, validatePassword);
  };

  function deleteAccount() {
    authCtx.onAccountDeletion(values.password);
  };

  return (
    <Modal onClose={props.closeModal} className={classes.modal}>
      <form onSubmit={submitHandler}>
        <div className={classes['title-wrapper']}>
          <h2 className={classes.title}>
            Are you sure you want to delete your profile?
          </h2>
          <p className={classes['sub-title']}>There is no turning back.</p>
        </div>
        <div className={classes.input}>
          <Input
            label={'Password'}
            input={{
              id: 'password',
              type: 'password',
              onChange: onPasswordChange,
              onBlur: onPasswordChange,
              value: values.password,
            }}
            error={values.passwordValid}
          />
        </div>
        <div className={classes.actions}>
          <Button disabled={!isFormValid} type="submit">Yes</Button>
          <Button onClick={props.closeModal}>No</Button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteProfileModal;
