import { useEffect, useState } from 'react';

export const useForm = (initialValues, onSubmitHandler) => {
  const [values, setValues] = useState(initialValues);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isValidValues = Object.entries(values)
        .filter(v => v[0].includes('Valid'))
        .map(v => v[1])
        .every(v => v === true);

      setIsFormValid(isValidValues);
    }, 200);

    return () => clearTimeout(timer);
  }, [values]);

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
    isFormValid,
    changeHandler,
    submitHandler,
  };
};
