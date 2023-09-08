import { TextField, InputAdornment, Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface TextInputProps {
  multiline?: boolean;
  label: string;
  startIcon?: ReactNode;

  [x: string]: any;
}

const TextInput = ({
  multiline,
  label,
  startIcon,
  ...props
}: TextInputProps) => {
  const inputId = `${label}-input`;

  return (
    <Box>
      <label htmlFor={inputId}>
        <Typography
          sx={{ fontSize: 15, textAlign: "left", my: 1 }}
          color="#071B2F"
        >
          {label}
        </Typography>
      </label>
      <TextField
        id={inputId}
        {...(multiline && { multiline: true, rows: 6 })}
        fullWidth
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ),
          sx: {
            width: "100%",
            background: "#F5FAFF",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#98CDFF",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#98CDFF",
            },
          },
        }}
        {...props}
      />
    </Box>
  );
};

export default TextInput;
