import ms from 'ms';
import { useState } from 'react';
import Snackbar from '../snackbar';
import BaseForm, { BaseFormProps, FormData } from './BaseForm';

interface FormProps {
  formData: Pick<BaseFormProps, 'formData'>['formData'];
  backBtn?: Pick<BaseFormProps, 'backBtn'>['backBtn'];

  onSubmit: (
    data: FormData,
    options: {
      onSuccess: (message: string) => void;
      onError: (message: string) => void;
    }
  ) => void;

  onChange?: Pick<BaseFormProps, 'onChange'>['onChange'];
}

function Form({ formData, backBtn, onSubmit, onChange }: FormProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleErrorMessage = (message: string | null) => {
    setSuccessMessage(null);
    setErrorMessage(message);

    setTimeout(() => setErrorMessage(null), ms('3s'));
  };

  const handleSuccessMessage = (message: string | null) => {
    setErrorMessage(null);
    setSuccessMessage(message);

    setTimeout(() => setSuccessMessage(null), ms('3s'));
  };

  const handleSubmit = (data: FormData) => {
    onSubmit(data, {
      onSuccess: (message: string) => handleSuccessMessage(message),
      onError: (message: string) => handleErrorMessage(message),
    });
  };

  return (
    <>
      <Snackbar
        open={!!successMessage}
        message={successMessage || ''}
        severity='success'
      />

      <Snackbar
        open={!!errorMessage}
        message={errorMessage || ''}
        severity='error'
      />

      <BaseForm
        formData={formData}
        backBtn={backBtn}
        onSubmit={handleSubmit}
        onChange={onChange}
      />
    </>
  );
}

export default Form;
