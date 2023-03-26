import { createContext, useState } from 'react';

export const ErrorContext = createContext({
  message: '',
  isOpen: false,
  toggle: () => { },
  setErrorMessage: () => { }
});

const ErrorProvider = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const toggle = () => {
    setIsOpen(s => !s);
  };

  const setErrorMessage = (error) => {
    let message = '';
    switch (error) {
      case 'EMAIL_TAKEN':
        message = 'This email is taken.';
        break;
      case 'USERNAME_TAKEN':
        message = 'This username is taken.';
        break;
      case 'INVALID_EMAIL':
        message = 'This emails is invalid';
        break;
      case 'USERNAME_INVALID_LENGTH':
        message = 'Username length must be between 3 and 30 characters long.';
        break;
      case 'INVALID_CREDENTIALS':
        message = 'Invalid email or password.';
        break;
      case 'INVALID_LICENSE_PLATE_NUMBER':
        message = 'Enter valid license plate number (Example: CB1111MK).';
        break;
      case 'TITLE_TOO_SHORT':
        message = 'The title must be at least 10 characters long.';
        break;
      case 'POST_TOO_SHORT':
        message = 'The post must be at least 10 characters long.';
        break;
      case 'NO_POST_ID':
        message = 'Post must have ID.';
        break;
      case 'NO_USER':
        message = 'You have to be logged in!';
        break;
      case 'INVALID_TOKEN':
        message = 'User token is invalid!';
        break;

      default:
        message = 'An error has occurred!';
        break;
    }
    setMessage(message);
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 3000);
  };

  return <ErrorContext.Provider
    value={{
      message,
      isOpen,
      toggle,
      setErrorMessage
    }}
  >
    {props.children}
  </ErrorContext.Provider>;
};

export default ErrorProvider;