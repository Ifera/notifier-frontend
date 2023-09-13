import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!data && !addHook) return null;

  const defaultValues: ValueProps = {
    name: data?.name || '',
    description: data?.description || '',
  };

  function parseSuccessMessage(type: string, operation: string) {
    return `${type} ${operation} successfully`;
  }

  function onSuccess(message: string) {
    setErrorMessage(null);
    setSuccessMessage(message);
  }

  function onError(message: string) {
    setSuccessMessage(null);
    setErrorMessage(message);
  }

  const handleClose = () => {
    if (addHook) addHook.reset();
    if (editHook) editHook.reset();
    if (onClose) onClose();

    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const handleSubmit = (values: ValueProps) => {
    if (editHook && values === defaultValues) {
      setErrorMessage('No changes made');
      return;
    }

    if (editHook && data === null) return;

    if (addHook) {
      addHook.mutate(values, {
        onSuccess: () => {
          onSuccess(parseSuccessMessage(type, 'added'));
        },
        onError: (error) => {
          onError(parseError(error));
        },
      });
    }

    if (editHook) {
      editHook.mutate(
        {
          id: data?.id,
          name: values.name,
          description: values.description,
        },
        {
          onSuccess: () => {
            onSuccess(parseSuccessMessage(type, 'edited'));
          },
          onError: (error) => {
            onError(parseError(error));
          },
        }
      );
    }

    if (onSubmit) onSubmit(data, values);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
        <DialogTitle>
          <Box display='flex' alignItems='center'>
            <Box flexGrow={1}>
              {operation} {type}
            </Box>
            <Box>
              <IconButton onClick={handleClose} edge='end'>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {successMessage && <Alert severity='success'>{successMessage}</Alert>}
          {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}

          <PreviewForm
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            onError={onError}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditDialog;
