import { useState } from 'react';
import BaseForm, { BaseFormProps, FormData } from './BaseForm';

interface FormProps {
  formData: Pick<BaseFormProps, 'formData'>['formData'];
}

function Form({ formData }: FormProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleErrorMessage = (message: string | null) => {
    setSuccessMessage(null);
    setErrorMessage(message);
  };

  const handleSuccessMessage = (message: string | null) => {
    setSuccessMessage(message);
    setErrorMessage(null);
  };

  const handleSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <>
      <BaseForm formData={formData} onSubmit={handleSubmit} />
    </>
  );
}

export default Form;
