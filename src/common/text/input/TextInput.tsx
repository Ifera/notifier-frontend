import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { ReactNode, forwardRef } from 'react';
import ErrorText from '../ErrorText';
import LabelText from '../LabelText';

export type TextInputProps = TextFieldProps & {
  label: string;
  startIcon?: ReactNode;
  errorMessage?: string | null;
  asterisk?: boolean;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, startIcon, errorMessage, asterisk = true, ...props }, ref) => {
    const inputId = `${label}-input`;

    return (
      <>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: 1,
          }}
        >
          <label htmlFor={inputId}>
            <LabelText label={label} asterisk={asterisk} />
          </label>

          <TextField
            id={inputId}
            ref={ref}
            fullWidth
            placeholder={props.placeholder || `Enter ${label.toLowerCase()}`}
            InputProps={{
              startAdornment: startIcon && (
                <InputAdornment position='start'>{startIcon}</InputAdornment>
              ),
              sx: {
                width: '100%',
                background: '#F5FAFF',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#98CDFF',
                },

                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#98CDFF',
                },
              },
            }}
            {...(props.multiline && { multiline: true, rows: 6 })}
            {...props}
          />

          {errorMessage && <ErrorText text={errorMessage} />}
        </div>
      </>
    );
  }
);

export default TextInput;
