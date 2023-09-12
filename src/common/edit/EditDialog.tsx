import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Properties,
  UseAddHookResult,
  UseEditHookResult,
} from '../../interfaces';
import { parseError } from '../../utils';
import PreviewForm, { ValueProps } from '../PreviewForm';

export interface EditDialogProps {
  open: boolean;
  type: 'App' | 'Event' | 'Notification';
  operation: 'Edit' | 'Add';
  data: Properties | null;
  addHook?: UseAddHookResult;
  editHook?: UseEditHookResult;

  // callback functions
  onClose?: () => void;
  onSubmit?: (data: Properties | null, values: ValueProps) => void;
}

function EditDialog({
  open,
  type,
  operation,
  data,
  addHook,
  editHook,
  onClose,
  onSubmit,
}: EditDialogProps) {
  if (!data && !addHook) return null;

  const defaultValues: ValueProps = {
    name: data?.name || '',
    description: data?.description || '',
  };

  const handleClose = () => {
    if (addHook) addHook.reset();
    if (editHook) editHook.reset();
    if (onClose) onClose();
  };

  const handleSubmit = (values: ValueProps) => {
    // noop if values are the same as defaultValues or data is null
    if (
      (editHook && values === defaultValues) ||
      (editHook && data === null) ||
      values === null
    )
      return;

    if (addHook) addHook.mutate(values);

    if (editHook)
      editHook.mutate({
        id: data?.id,
        name: values.name,
        description: values.description,
      });

    if (onSubmit) onSubmit(data, values);
  };

  function renderSuccessMessage(type: string, operation: string) {
    return (
      <Alert severity='success'>
        {type} {operation} successfully
      </Alert>
    );
  }

  function renderErrorMessage(error: any) {
    return <Alert severity='error'>{parseError(error)}</Alert>;
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
        <DialogTitle>
          <Box display='flex' alignItems='center'>
            <Box flexGrow={1}>
              {type} {operation}
            </Box>
            <Box>
              <IconButton onClick={handleClose} edge='end'>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {addHook && addHook.isSuccess && renderSuccessMessage(type, 'added')}
          {addHook && addHook.isError && renderErrorMessage(addHook.error)}
          {editHook &&
            editHook.isSuccess &&
            renderSuccessMessage(type, 'edited')}

          {editHook && editHook.isError && renderErrorMessage(editHook.error)}
          <PreviewForm defaultValues={defaultValues} onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditDialog;
