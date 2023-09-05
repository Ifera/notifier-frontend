import { Edit } from '@mui/icons-material';
import { ButtonProps, IconButton } from '@mui/material';

function EditButton(props: ButtonProps) {
  return (
    <IconButton
      variant='contained'
      color='primary'
      size='medium'
      edge='start'
      {...props}
    >
      <Edit />
    </IconButton>
  );
}

export default EditButton;
