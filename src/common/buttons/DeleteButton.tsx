import { Delete } from '@mui/icons-material';
import { ButtonProps, IconButton, Tooltip } from '@mui/material';

function DeleteButton(props: ButtonProps) {
  return (
    <>
      <Tooltip title='Delete'>
        <IconButton color='error' size='medium' {...props}>
          <Delete />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default DeleteButton;
