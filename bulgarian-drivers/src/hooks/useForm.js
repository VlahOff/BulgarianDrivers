import { useState } from 'react';

export const useForm = (initialValues, onSubmitHandler) => {
  const [values, setValues] = useState(initialValues);

  const changeHandler = (event) => {
    setValues(state => {
      return { ...state, [event.target.id]: event.target.value };
    });
  };

  const blurHandler = (id, value) => {
    setValues(state => {
      return { ...state, [id + 'Valid']: value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    onSubmitHandler(values);
  };

  return {
    values,
    changeHandler,
    blurHandler,
    submitHandler
  };
};