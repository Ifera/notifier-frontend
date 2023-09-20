import React, { ChangeEvent, useState } from 'react';
import { dataSchema } from '../../validation/schema';

export interface NotificationData {
  template_subject: string;
  template_body: string;
}

export interface FormData {
  name: string;
  description: string;

  notification?: NotificationData;
}

export interface BaseFormProps {
  type: 'Add' | 'Edit';
  formData: FormData;

  onError: (error: Error) => void;
  onSubmit: (data: FormData) => void;

  onChange?: (data: FormData) => void;
}

function BaseForm({
  type,
  formData,

  onError,
  onSubmit,
  onChange,
}: BaseFormProps) {
  const [data, setData] = useState(formData);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newData = {
      ...data,
      [name]: value,
    };

    setData(newData);

    if (onChange) onChange(newData);
  };

  const validateForm = (): boolean => {
    try {
      dataSchema.parse(data);
      return true;
    } catch (error) {
      onError(error as Error);
    }

    return false;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    onSubmit(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit}></form>
    </>
  );
}

export default BaseForm;
