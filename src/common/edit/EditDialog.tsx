import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Event, NotificationType } from '../../interfaces';
import PreviewForm, { ValueProps } from '../PreviewForm';

export interface EditResponse {
  success: boolean;
  // message: string;
  error: string | null;
}

export interface EditDialogProps {
  open: boolean;
  type: 'Event' | 'Notification';
  data: Event | NotificationType | null;

  // callback functions
  onClose?: () => void;
  onSubmit?: (data: Event | NotificationType, values: ValueProps) => void;

  // reply back
  response?: EditResponse | null;
}

function EditDialog({
  open,
  type,
  data,
  onClose,
  onSubmit,
  response,
}: EditDialogProps) {
  if (!data) return null;

  const defaultValues: ValueProps = {
    name: data.name,
    description: data.description,
  };

  const handleSubmit = (values: ValueProps) => {
    // noop if values are the same as defaultValues or data is null
    if (values === defaultValues || data === null) return;

    if (onSubmit) onSubmit(data, values);
  };

  return (
    <>
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
          {response && response.success ? (
            <Alert severity='success'>{type} edited successfully</Alert>
          ) : null}

          {response && response.success === false && response.error ? (
            <Alert severity='error'>{response.error}</Alert>
          ) : null}

          <PreviewForm defaultValues={defaultValues} onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditDialog;
