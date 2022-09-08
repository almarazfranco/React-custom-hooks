import { useState } from 'react';

// CustomHook
const useForm = (initialValue = {}, urlPost) => {

  // Data form
  const [formState, setForm] = useState(initialValue);

  // Validation form
  let caractEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  let confirmName = false;
  let confirmEmail = false;


  // Validation name
  const [validationName, setValidationName] = useState( {name: 'initial'} );

  const validationNameF = () => {

    if ( formState.name === '') {
      confirmName = false;
      setValidationName( {name: 'incorrect'} );
    } else {
      confirmName = true;
      setValidationName( {name: 'correct'} );
    };

  };

  // Validation email
  const [validationEmail, setValidationEmail] = useState( {email: 'initial'} );

  const validationEmailF = () => {

    if ( caractEmail.test(formState.email) === false) {   
      confirmEmail = false;
      setValidationEmail( {email: 'incorrect'} );
    } else {
      confirmEmail = true;
      setValidationEmail( {email: 'correct'} );
    };

  };


  // Post form
  const [respStatus, setRespStatus] = useState(false);

  const postForm = async () => {

    try {

      let config = {
        method: 'POST',
        headers: {
          'Acept': 'aplication/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      };

      let res = await fetch(urlPost, config);

      let json = await res.json();
      console.log('Form',json.message)

      if (res.ok) {
        setRespStatus(true)
      } else {
        setRespStatus(false)
      }

    } catch (error) {

      console.warn(error);

    };

  };

  // Reset form
  const resetForm = () => {
    setRespStatus(false);
  }

  // Function change input value
  const onChangeForm = ({target}) => {
    const {name, value} = target;

    setForm(
      {
        ...formState,
        [ name ] : value
      }
    )

  };

  // Submit form
  const onSubmitForm = (e) => {

    e.preventDefault();

    validationNameF();
    validationEmailF();

    if (confirmName === false || confirmEmail === false ) return;

    postForm();

    setForm(initialValue);

  }

  return {
    ...formState,
    formState,
    onChangeForm,
    onSubmitForm,
    validationName,
    validationEmail,
    respStatus,
    resetForm
  }

};

export { useForm };