import { useState } from 'react';

export const useForm = (initialValues, onSubmitHandler) => {
  const [values, setValues] = useState(initialValues);

  const changeHandler = (event, validator) => {
    setValues((state) => {
      return {
        ...state,
        [event.target.id]: event.target.value,
        [event.target.id + 'Valid']: validator(event.target.value),
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    onSubmitHandler(values);
    setValues(initialValues);
  };

  return {
    values,
    changeHandler,
    submitHandler,
  };
};
