import { Delete } from '@mui/icons-material';
import { ButtonProps, IconButton } from '@mui/material';

function DeleteButton(props: ButtonProps) {
  return (
    <IconButton variant='contained' color='error' size='medium' {...props}>
      <Delete />
    </IconButton>
  );
}

export default DeleteButton;
