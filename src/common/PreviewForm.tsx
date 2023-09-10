import { Box, Button } from '@mui/material';
import { ChangeEvent } from 'react';
import TextInput from './TextInput';

interface PreviewFormProps {
  values: {
    name: string;
    description: string;
    subject?: string;
    body?: string;
  };
  onSubmit: (values: any) => void;
}

function PreviewForm({ values, onSubmit }: PreviewFormProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onSubmit({ ...values, [name]: value });
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
        defaultValue={values.name}
        onChange={handleChange}
      />

      <TextInput
        label='Description'
        name='description'
        defaultValue={values.description}
        onChange={handleChange}
      />

      {values.subject !== undefined && values.body !== undefined ? (
        <TextInput
          label='Subject'
          name='subject'
          defaultValue={values.subject}
          onChange={handleChange}
        />
      ) : null}

      {values.subject !== undefined && values.body !== undefined ? (
        <TextInput
          multiline={true}
          label='Body'
          name='body'
          defaultValue={values.body}
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
