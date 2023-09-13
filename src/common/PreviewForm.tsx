import { Alert, Box, Button } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { ZodError } from 'zod';
import { dataSchema } from '../validation/schema';
import TextInput from './TextInput';

export interface ValueProps {
  name: string;
  description: string;
  subject?: string;
  body?: string;
}

export interface PreviewFormProps {
  defaultValues: ValueProps;
  onSubmit: (values: ValueProps) => void;
  onChange?: (values: ValueProps) => void;
}

function PreviewForm({ defaultValues, onSubmit, onChange }: PreviewFormProps) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState<ValueProps>({
    name: '',
    description: '',
    subject: '',
    body: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValues = { ...values, [name]: value };
    setValues(newValues);

    if (onChange) onChange(newValues);
  };

  const validateForm = () => {
    try {
      // const schema = dataSchema.partial();

      dataSchema.parse(values);

      setErrors({
        name: '',
        description: '',
        subject: '',
        body: '',
      });
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const nameError = error.errors.find((e) => e.path[0] === 'name');
        const descriptionError = error.errors.find(
          (e) => e.path[0] === 'description'
        );
        const subjectError = error.errors.find((e) => e.path[0] === 'subject');
        const bodyError = error.errors.find((e) => e.path[0] === 'body');

        setErrors({
          name: nameError ? nameError.message : '',
          description: descriptionError ? descriptionError.message : '',
          subject: subjectError ? subjectError.message : '',
          body: bodyError ? bodyError.message : '',
        });
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
      {errors.name || errors.description || errors.subject || errors.body ? (
        <Alert severity='error' sx={{ my: 2 }}>
          {errors.name || errors.description || errors.subject || errors.body}
        </Alert>
      ) : null}

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

      {defaultValues.subject !== undefined &&
      defaultValues.body !== undefined ? (
        <TextInput
          label='Subject'
          name='subject'
          defaultValue={defaultValues.subject}
          onChange={handleChange}
        />
      ) : null}

      {defaultValues.subject !== undefined &&
      defaultValues.body !== undefined ? (
        <TextInput
          multiline={true}
          label='Body'
          name='body'
          defaultValue={defaultValues.body}
          onChange={handleChange}
        />
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
