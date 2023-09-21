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
};

const StyledMentionsInput = forwardRef<HTMLTextAreaElement, StyledMentionsInputProps>(
  ({ label, errorMessage, asterisk = true, ...props }, ref) => {
    const inputId = `${label}-mentions-input`;

    const { data: tags, isLoading, error } = useTags();

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

    return (
      <Box>
        <label htmlFor={inputId}>
          <LabelText label={label} asterisk={asterisk} />
        </label>

        <MentionsInput
          inputRef={ref}
          readOnly={false}
          placeholder={props.placeholder || `Enter ${label.toLowerCase()}`}
          // forceSuggestionsAboveCursor
          style={{
            width: '100%',
            background: '#F5FAFF',
            marginTop: '10px',

            control: {
              backgroundColor: '#F5FAFF',
              lineHeight: '20px',
              color: '#071B2F',
              padding: '8px 12px',
              borderRadius: '5px',
              border: '1px solid #98CDFF',
              boxShadow: 'none',
              height: '12rem',
              '&:hover': {
                borderColor: '#98CDFF',
              },
            },

            // highlighter: {
            //   overflow: 'auto',
            // },

            '&multiLine': {
              highlighter: {
                // padding: 9,
                whiteSpace: 'nowrap',
                overflowY: 'auto',
                overflowX: 'hidden',
              },
              input: {
                padding: 9,
                overflow: 'auto',
                minHeight: 63,
                outline: 0,
                border: 0,
              },
            },

            suggestions: {
              // left: 5,
              zIndex: 5,

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
                zIndex: 6,
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
              <div style={{ maxHeight: '50px', overflowY: 'auto' }}>{highlightedDisplay}</div>
            )}
            displayTransform={(id, display) => `{${display}}`}
            markup='{__display__}'
          />
        </MentionsInput>

        {errorMessage && <ErrorText text={errorMessage} />}
      </Box>
    );
  }
);

export default StyledMentionsInput;
