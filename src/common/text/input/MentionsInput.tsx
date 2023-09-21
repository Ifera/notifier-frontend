import { Alert, Box } from '@mui/material';
import { forwardRef } from 'react';
import { Mention, MentionsInput, MentionsInputProps } from 'react-mentions';
import useTags from '../../../hooks/useTags';
import Loading from '../../loading';
import ErrorText from '../ErrorText';
import LabelText from '../LabelText';

export type StyledMentionsInputProps = Omit<MentionsInputProps, 'children'> & {
  label: string;

  errorMessage?: string | null;
  asterisk?: boolean;

  // onChange?: (event: EventParamProp) => void;
};

const StyledMentionsInput = forwardRef<
  HTMLTextAreaElement,
  StyledMentionsInputProps
>(({ label, errorMessage, asterisk = true, ...props }, ref) => {
  const inputId = `${label}-mentions-input`;

  const { data: tags, isLoading, error } = useTags();

  // function handleBodyChange(event: EventParamProp) {
  //   if (onChange) onChange(event);
  // }

  if (error) {
    return (
      <Alert severity='error' sx={{ marginTop: 2 }}>
        An error occurred while loading the tags
      </Alert>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  // console.log(ref);

  return (
    <Box>
      <label htmlFor={inputId}>
        <LabelText label={label} asterisk={asterisk} />
      </label>

      <MentionsInput
        inputRef={ref}
        readOnly={false}
        placeholder={props.placeholder || `Enter ${label.toLowerCase()}`}
        style={{
          width: '100%',
          background: '#F5FAFF',
          resize: 'vertical',

          control: {
            backgroundColor: '#F5FAFF',
            lineHeight: '20px',
            color: '#071B2F',
            padding: '8px 12px',
            borderRadius: '5px',
            border: '1px solid #98CDFF',
            boxShadow: 'none',
            '&:hover': {
              borderColor: '#98CDFF',
            },
            minHeight: '12rem',
          },
          highlighter: {
            overflow: 'auto',
          },
          marginTop: '10px',

          '&multiLine': {
            highlighter: {
              padding: 9,
            },
            input: {
              padding: 9,
              minHeight: 63,
              outline: 0,
              border: 0,
            },
          },

          suggestions: {
            list: {
              backgroundColor: 'white',
              border: '1px solid rgba(0,0,0,0.15)',
              fontSize: '15px',
              fontWeight: 400,
              lineHeight: '20px',
              color: '#071B2F',
              overflow: 'auto',
              maxHeight: 200,
              position: 'absolute',
              zIndex: 1,
            },
            item: {
              padding: '5px 15px',
              borderBottom: '1px solid rgba(0,0,0,0.15)',
              '&focused': {
                backgroundColor: '#cee4e5',
              },
            },
          },
        }}
        {...props}
      >
        <Mention
          trigger='{'
          data={tags.map((tag) => ({ id: tag, display: tag }))}
          renderSuggestion={(suggestion, search, highlightedDisplay) => (
            <div style={{ maxHeight: '50px', overflowY: 'auto' }}>
              {highlightedDisplay}
            </div>
          )}
          displayTransform={(id, display) => `{${display}}`}
          markup='{__display__}'
        />
      </MentionsInput>

      {errorMessage && <ErrorText text={errorMessage} />}
    </Box>
  );
});

export default StyledMentionsInput;
