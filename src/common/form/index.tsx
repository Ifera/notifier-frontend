import { useBetween } from 'use-between';
import { snackbarState } from '../../utils/SnackbarState';
import Snackbar from '../snackbar';
import BaseForm, { BaseFormProps, FormData } from './BaseForm';

export interface FormSubmitOptions {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export interface FormProps {
  formData: Pick<BaseFormProps, 'formData'>['formData'];
  backBtn?: Pick<BaseFormProps, 'backBtn'>['backBtn'];

  onSubmit: (data: FormData, options: FormSubmitOptions) => void;
  onChange?: Pick<BaseFormProps, 'onChange'>['onChange'];
}

function Form({ formData, backBtn, onSubmit, onChange }: FormProps) {
  const { errorMessage, handleErrorMessage, handleSuccessMessage } =
    useBetween(snackbarState);

  const handleSubmit = (data: FormData) => {
    onSubmit(data, {
      onSuccess: (message: string) => handleSuccessMessage(message),
      onError: (message: string) => handleErrorMessage(message),
    });
  };

  return (
    <>
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
