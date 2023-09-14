// PreviewForm.tsx
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { ZodError } from 'zod';
import { dataSchema } from '../validation/schema';
import TextInput from './TextInput';

export interface ValueProps {
  name: string;
  description: string;
  template_subject?: string;
  template_body?: string;
}

interface PreviewFormProps {
  defaultValues: ValueProps;
  tags?: string[];

  onError: (message: string) => void;
  onSubmit: (values: ValueProps) => void;
  onChange?: (values: ValueProps) => void;
}

function PreviewForm({
  defaultValues,
  tags,

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

  const handleTagsChange = (event: SelectChangeEvent<string[]>) => {
    const newValues = {
      ...defaultValues,
      template_body: `${defaultValues.template_body}{${event.target.value}}`,
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
        const errorMessage =
          error.errors[0]?.message || "Couldn't validate the form";
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
            value={defaultValues.template_body}
            onChange={handleChange}
          />
          <Box py={1} />
          <Typography
            sx={{ fontSize: 15, textAlign: 'left', mb: 1 }}
            variant='body2'
          >
            Add Tags
          </Typography>

          <Select
            sx={{
              backgroundColor: '#F5FAFF',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#98CDFF',
              },
              width: '100%',
            }}
            multiple
            value={[]}
            onChange={handleTagsChange}
          >
            {tags &&
              tags.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
          </Select>
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
