import { useState } from "react";

const useForm = (objeto = {}) => {

  const [form, setForm] = useState(objeto);

  const changeSetForm = ({target}) => {
    setForm(
      {
        ...form,
        [target.name] : target.value
      }
    );
  } 

  return {
    form, changeSetForm
  }

}

export default useForm;