import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { UseMutationResult } from '@tanstack/react-query';
import { PProperties, Properties } from '../../interfaces';
import { parseError } from '../../utils';
import PreviewForm, { ValueProps } from '../PreviewForm';

export interface EditDialogProps {
  open: boolean;
  type: 'App' | 'Event' | 'Notification';
  data: Properties | null;
  editHook?: UseMutationResult<Properties, Error, PProperties>;

  // callback functions
  onClose?: () => void;
  onSubmit?: (data: Properties, values: ValueProps) => void;
}

function EditDialog({
  open,
  type,
  data,
  editHook,
  onClose,
  onSubmit,
}: EditDialogProps) {
  if (!data) return null;

  const defaultValues: ValueProps = {
    name: data.name,
    description: data.description,
  };

  const handleClose = () => {
    if (editHook) editHook.reset();
    if (onClose) onClose();
  };

  const handleSubmit = (values: ValueProps) => {
    // noop if values are the same as defaultValues or data is null
    if (values === defaultValues || data === null) return;

    if (editHook)
      editHook.mutate({
        id: data.id,
        name: values.name,
        description: values.description,
      });

    if (onSubmit) onSubmit(data, values);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
        <DialogTitle>
          <Box display='flex' alignItems='center'>
            <Box flexGrow={1}>{type} Edit</Box>
            <Box>
              <IconButton onClick={handleClose} edge='end'>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {editHook && editHook.isSuccess ? (
            <Alert severity='success'>{type} edited successfully</Alert>
          ) : null}

          {editHook && editHook.isError ? (
            <Alert severity='error'>{parseError(editHook.error)}</Alert>
          ) : null}

          <PreviewForm defaultValues={defaultValues} onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditDialog;
