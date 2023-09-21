import { Typography, TypographyProps } from '@mui/material';

type LabelTextProps = TypographyProps & {
  label: string;
  asterisk?: boolean;
};

function LabelText({ label, asterisk, ...props }: LabelTextProps) {
  return (
    <Typography
      sx={{ fontSize: 15, textAlign: 'left', my: 1 }}
      color='#071B2F'
      {...props}
    >
      {label}{' '}
      {asterisk && (
        <Typography component='span' color='error' fontWeight='bold'>
          *
        </Typography>
      )}
    </Typography>
  );
}

export default LabelText;
