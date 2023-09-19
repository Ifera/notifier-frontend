import { Box, Typography } from '@mui/material';
import { Mention, MentionsInput } from 'react-mentions';
import { EventParamProp } from '../../interfaces';

export type MentionsInputProps = {
  label: string;
  value?: string;
  onChange?: (event: EventParamProp) => void; // Change to HTMLTextAreaElement
  tags: string[];
};

const StyledMentionsInput = ({
  label,
  value,
  onChange,
  tags,
}: MentionsInputProps) => {
  const inputId = `${label}-input`;

  function handleBodyChange(event: EventParamProp) {
    if (onChange) onChange(event);
  }

  return (
    <Box>
      <label htmlFor={inputId}>
        <Typography
          sx={{ fontSize: 15, textAlign: 'left', my: 1 }}
          color='#071B2F'
        >
          {label}
        </Typography>
      </label>

      <MentionsInput
        value={value}
        onChange={handleBodyChange}
        readOnly={false}
        placeholder='Template Body'
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
    </Box>
  );
};

export default StyledMentionsInput;
