import { createContext, useState } from 'react';

const ErrorContext = createContext({
  message: '',
  isOpen: false,
  toggle: () => {},
  setErrorMessage: () => {},
});

export const ErrorProvider = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const toggle = () => {
    setIsOpen((s) => !s);
  };

  const setErrorMessage = (error) => {
    let message = '';
    switch (error) {
      case 'SUCCESSFULLY_REGISTERED':
        message = 'We\'ve sent you an email, please verify your account. The email may end up in spam.';
        break;
      case 'ACCOUNT_NOT_VERIFIED':
        message = 'Please verify your account to continue, we\'ve sent you an email.';
        break;
      case 'PASSWORD_CHANGED':
        message = 'Password changed successfully.';
        break;
      case 'ACCOUNT_DELETED_SUCCESSFULLY':
        message = 'Your account has been removed successfully.';
        break;
      case 'EMAIL_PASSWORD_RESET_SENT':
        message = 'Email was sent.';
        break;
      case 'TICKET_EXPIRED':
        message = 'Reset password ticket has expired, send a new request.';
        break;
      case 'EMAIL_TAKEN':
        message = 'This email is taken.';
        break;
      case 'USERNAME_TAKEN':
        message = 'This username is taken.';
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
        message = error.message || 'An error has occurred!';
        break;
    }
    setMessage(message);
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 3000);
  };

  return (
    <ErrorContext.Provider
      value={{
        message,
        isOpen,
        toggle,
        setErrorMessage,
      }}
    >
      {props.children}
    </ErrorContext.Provider>
  );
};

export default ErrorContext;
