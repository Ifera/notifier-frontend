import { Box, Button, Grid } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ZodError } from 'zod';
import { EventParamProp } from '../../interfaces';
import { formDataSchema } from '../../utils/validation/schema';
import MentionsInput from '../text/input/MentionsInput';
import TextInput from '../text/input/TextInput';

export interface ValueProps {
  name: string;
  description: string;
  template_subject?: string;
  template_body?: string;
}

interface PreviewFormProps {
  defaultValues: ValueProps;
  tags?: string[];
  backBtn?: string;

  onError: (message: string) => void;
  onSubmit: (
    values: ValueProps,
    onSuccess?: (cause: 'Add' | 'Edit') => void
  ) => void;

  onChange?: (values: ValueProps) => void;
}

function PreviewForm({
  defaultValues,
  tags,
  backBtn,

  onError,
  onSubmit,
  onChange,
}: PreviewFormProps) {
  const [values, setValues] = useState(defaultValues);

  const navigate = useNavigate();

  // useEffect(() => {
  //   setValues(defaultValues);
  // }, [defaultValues]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);

    if (onChange) onChange(newValues);
  };

  const handleBodyChange = (event: EventParamProp) => {
    setValues({ ...values, template_body: event.target.value });

    if (onChange) onChange({ ...values, template_body: event.target.value });
  };

  const validateForm = () => {
    try {
      formDataSchema.parse(values);
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

    onSubmit(values, (cause) => {});
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label='Name'
        name='name'
        value={values.name}
        onChange={handleChange}
        required
      />

      <TextInput
        label='Description'
        name='description'
        value={values.description}
        onChange={handleChange}
        rows={3}
        multiline
        required
      />

      {defaultValues.template_subject !== undefined &&
      defaultValues.template_body !== undefined ? (
        <>
          <TextInput
            label='Subject'
            name='template_subject'
            value={values.template_subject}
            onChange={handleChange}
            required
          />

          <MentionsInput
            label='Body'
            value={values.template_body}
            onChange={handleBodyChange}
          />
        </>
      ) : null}

      <Box py={4}>
        <Grid container spacing={2}>
          <Grid item>
            <Button variant='contained' color='primary' type='submit'>
              Submit
            </Button>
          </Grid>

          {backBtn ? (
            <Grid item>
              <Button
                variant='contained'
                color='warning'
                type='button'
                onClick={() => navigate(backBtn)}
              >
                Go Back
              </Button>
            </Grid>
          ) : null}
        </Grid>
      </Box>
    </form>
  );
}

export default PreviewForm;
