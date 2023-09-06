import { TextField, InputAdornment } from "@mui/material";
import { ReactNode } from "react";

interface TextInputProps {
  startIcon?: ReactNode;
  backgroundColor?: string;
  borderRadius?: number;
  [x: string]: any;
}

const TextInput = ({
  startIcon,
  backgroundColor = "#F0F0F0",
  borderRadius = 10,
  ...props
}: TextInputProps) => {
  return (
    <TextField
      fullWidth
      InputProps={{
        startAdornment: startIcon && (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ),
        style: {
          backgroundColor,
          borderRadius,
          border: 0,
        },
      }}
      {...props}
    />
  );
};

export default TextInput;
