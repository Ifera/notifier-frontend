import { Box, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Event, NotificationType } from '../../interfaces';
import PreviewForm from '../PreviewForm';

import CloseIcon from '@mui/icons-material/Close';

export interface EditDialogProps {
  open: boolean;
  type: 'Event' | 'Notification';
  data: Event | NotificationType | null;
  onClose: () => void;
}

function EditDialog({ open, type, data, onClose }: EditDialogProps) {
  if (!data) return null;

  const values = {
    name: data.name,
    description: data.description,
  };

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
        <DialogTitle>
          <Box display='flex' alignItems='center'>
            <Box flexGrow={1}>{type} Edit</Box>
            <Box>
              <IconButton onClick={onClose} edge='end'>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <PreviewForm values={values} onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditDialog;
