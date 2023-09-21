import { Typography, TypographyProps } from '@mui/material';

type ErrorTextProps = TypographyProps & {
  text: string;
};

function ErrorText({ text, ...props }: ErrorTextProps) {
  return (
    <Typography sx={{ my: 1 }} color='#FF0000' variant='body2' {...props}>
      {text}
    </Typography>
  );
}

export default ErrorText;
