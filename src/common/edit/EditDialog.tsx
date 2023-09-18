import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import _ from 'lodash';
import { useState } from 'react';
import {
  ID,
  PProperties,
  Properties,
  UseAddHookResult,
  UseEditHookResult,
} from '../../interfaces';
import { parseError } from '../../utils';
import PreviewForm, { ValueProps } from '../preview-form/PreviewForm';

export interface EditDialogProps {
  open: boolean;
  type: 'App' | 'Event' | 'Notification';
  operation: 'Edit' | 'Add';
  data: Properties | null;

  addHook?: UseAddHookResult;
  editHook?: UseEditHookResult;
  parentId?: ID;

  // callback functions
  onClose?: () => void;
  onSubmitSuccess?: (data: Properties | null, values: ValueProps) => void;
  onSubmitError?: (error: Error) => void;
}

function EditDialog({
  open,
  type,
  operation,
  data,
  addHook,
  editHook,
  parentId,
  onClose,
  onSubmitSuccess,
  onSubmitError,
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
    if (_.isEqual(values, defaultValues)) {
      setSuccessMessage(null);
      setErrorMessage('No changes made');
      return;
    }

    if (editHook && data === null) return;

    if (addHook) {
      let d: PProperties = {
        name: values.name,
        description: values.description,
      };

      if (parentId && type === 'Event') {
        d = {
          ...d,
          application: parentId,
        };
      }

      if (parentId && type === 'Notification') {
        d = {
          ...d,
          event: parentId,
        };
      }

      addHook.mutate(d, {
        onSuccess: () => {
          onSuccess(parseSuccessMessage(type, 'added'));

          if (onSubmitSuccess) onSubmitSuccess(data, values);
        },
        onError: (error) => {
          onError(parseError(error));
          if (onSubmitError) onSubmitError(error);
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

            if (onSubmitSuccess) onSubmitSuccess(data, values);

            if (data) {
              data.name = values.name;
              data.description = values.description;
            }
          },
          onError: (error) => {
            onError(parseError(error));
            if (onSubmitError) onSubmitError(error);
          },
        }
      );
    }
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
