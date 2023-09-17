import {
  Box,
  Button,
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [suggestionText, setSuggestionText] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionAnchor, setSuggestionAnchor] = useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);

    if (onChange) onChange(newValues);
  };

  const handleBodyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Check for '{' character to open the suggestion box
    if (value.includes('{')) {
      const suggestion = value.substring(
        value.lastIndexOf('{') + 1,
        value.length
      );
      setSuggestionText(suggestion);
      setSuggestionAnchor(event.target);

      updateSuggestions(suggestion);
    } else {
      setSuggestionAnchor(null);
    }

    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);

    if (onChange) onChange(newValues);
  };

  const handleCloseSuggestion = () => {
    setSuggestionAnchor(null);
  };

  const updateSuggestions = (text: string) => {
    // Filter tags based on the entered text
    const filteredTags = tags ? tags.filter((tag) => tag.includes(text)) : [];

    setSuggestions(filteredTags);
  };

  const handleSuggestionSelect = (tag: string) => {
    const bodyValue = values.template_body || '';
    const openBraceIndex = bodyValue.lastIndexOf('{');
    if (openBraceIndex !== -1) {
      const updatedValue =
        bodyValue.substring(0, openBraceIndex) +
        '{' +
        tag +
        '}' +
        bodyValue.substring(openBraceIndex + suggestionText.length + 1);
      setSuggestionAnchor(null);

      const newValues = {
        ...values,
        template_body: updatedValue,
      };

      setValues(newValues);

      if (onChange) onChange(newValues);
    }
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

    onSubmit(values, (cause) => {
      if (cause === 'Edit') return;

      const data = Object.assign(defaultValues);

      for (const key in data) {
        data[key] = '';
      }

      setValues(data);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label='Name'
        name='name'
        value={values.name}
        onChange={handleChange}
      />

      <TextInput
        label='Description'
        name='description'
        value={values.description}
        onChange={handleChange}
        multiline
      />

      {defaultValues.template_subject !== undefined &&
      defaultValues.template_body !== undefined ? (
        <>
          <TextInput
            label='Subject'
            name='template_subject'
            value={values.template_subject}
            onChange={handleChange}
          />

          <TextInput
            multiline
            label='Body'
            name='template_body'
            value={values.template_body}
            onChange={handleBodyChange}
          ></TextInput>
          {/* Suggestion Box for Tags */}
          <ClickAwayListener onClickAway={handleCloseSuggestion}>
            <div style={{ position: 'relative' }}>
              {values.template_body && values.template_body.includes('{') ? (
                <Popper
                  open={Boolean(suggestionAnchor)}
                  anchorEl={suggestionAnchor}
                  placement='bottom-start' // Adjust placement
                  modifiers={[
                    {
                      name: 'offset',
                      options: {
                        offset: [0, 10], // Adjust the offset as needed
                      },
                    },
                  ]}
                >
                  <Paper elevation={3}>
                    {/* Add a div with a fixed max height to enable scrolling */}
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {suggestions.map((tag, index) => (
                        <Box
                          key={tag}
                          sx={{
                            p: 1,
                            cursor: 'pointer',
                            '&:hover': {
                              background: '#F5FAFF',
                            },
                          }}
                          onClick={() => handleSuggestionSelect(tag)}
                        >
                          {tag}
                        </Box>
                      ))}
                    </div>
                  </Paper>
                </Popper>
              ) : null}
            </div>
          </ClickAwayListener>
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
