import ms from 'ms';
import { useState } from 'react';

export const snackbarState = () => {
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

  return {
    successMessage,
    errorMessage,
    handleErrorMessage,
    handleSuccessMessage,
  };
};
