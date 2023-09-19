import { Edit } from '@mui/icons-material';
import { ButtonProps, IconButton, Tooltip } from '@mui/material';

function EditButton(props: ButtonProps) {
  return (
    <>
      <Tooltip title='Edit'>
        <IconButton color='primary' size='medium' {...props}>
          <Edit />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default EditButton;
