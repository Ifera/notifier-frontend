import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';

const DeleteButton = () => {
  return (
    <Button variant='contained' color='error'>
      <Delete />
    </Button>
  );
};

export default DeleteButton;
