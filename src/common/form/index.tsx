import { useState } from 'react';
import { ZodError } from 'zod';
import BaseForm, { BaseFormProps, FormData } from './BaseForm';

interface FormProps {
  type: Pick<BaseFormProps, 'type'>['type'];
  formData: Pick<BaseFormProps, 'formData'>['formData'];
}

function Form({ type, formData }: FormProps) {
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

  const resetMessages = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const handleError = (error: Error) => {
    if (error instanceof ZodError) {
      handleErrorMessage(error.errors[0]?.message || 'Form validation failed');

      return false;
    }

    handleErrorMessage((error as Error).message);
  };

  const handleSubmit = (data: FormData) => {};

  return (
    <>
      <BaseForm
        type={type}
        formData={formData}
        onError={handleError}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default Form;
