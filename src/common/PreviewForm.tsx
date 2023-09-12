import { Box, Button } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import TextInput from './TextInput';

export interface ValueProps {
  name: string;
  description: string;
  subject?: string;
  body?: string;
}

export interface PreviewFormProps {
  defaultValues: ValueProps;
  setDefaultValues?: (values: ValueProps) => void;
  onSubmit: (values: ValueProps) => void;
  onChange?: (values: ValueProps) => void;
}

function PreviewForm({
  defaultValues,
  setDefaultValues,
  onSubmit,
  onChange,
}: PreviewFormProps) {
  const [values, setValues] = useState(defaultValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValues = { ...values, [name]: value };

    setDefaultValues && setDefaultValues(newValues);
    setValues(newValues);

    if (onChange) onChange(newValues);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
