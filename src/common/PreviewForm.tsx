import { Box, Button } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { ZodError } from 'zod';
import { dataSchema } from '../validation/schema';
import TextInput from './TextInput';

export interface ValueProps {
  name: string;
  description: string;
  template_subject?: string;
  template_body?: string;
}

export interface PreviewFormProps {
  defaultValues: ValueProps;
  onError: (message: string) => void;
  onSubmit: (values: ValueProps) => void;
  onChange?: (values: ValueProps) => void;
}

function PreviewForm({
  defaultValues,
  onError,
  onSubmit,
  onChange,
}: PreviewFormProps) {
  const [values, setValues] = useState(defaultValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);
    if (onChange) onChange(newValues);
  };

  const validateForm = () => {
    try {
      dataSchema.parse(values);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const nameError = error.errors.find((e) => e.path[0] === 'name');
        const descriptionError = error.errors.find(
          (e) => e.path[0] === 'description'
        );
        const subjectError = error.errors.find(
          (e) => e.path[0] === 'template_subject'
        );
        const bodyError = error.errors.find(
          (e) => e.path[0] === 'template_body'
        );

        const errorMessage =
          nameError?.message ||
          descriptionError?.message ||
          subjectError?.message ||
          bodyError?.message ||
          "Couldn't validate form";

        onError(errorMessage);

        return false;
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label='Name'
        name='name'
        defaultValue={defaultValues.name}
        onChange={handleChange}
      />

      <TextInput
        label='Description'
        name='description'
        defaultValue={defaultValues.description}
        onChange={handleChange}
      />

      {defaultValues.template_subject !== undefined &&
      defaultValues.template_body !== undefined ? (
        <>
          <TextInput
            label='Subject'
            name='template_subject'
            defaultValue={defaultValues.template_subject}
            onChange={handleChange}
          />
          <TextInput
            multiline={true}
            label='Body'
            name='template_body'
            defaultValue={defaultValues.template_body}
            onChange={handleChange}
          />
        </>
      ) : null}

      <Box py={4}>
        <Button variant='contained' color='primary' type='submit'>
          Submit
        </Button>
      </Box>
    </form>
  );
}

export default PreviewForm;
