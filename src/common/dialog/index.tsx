import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Dialog as MuiDialog, Tooltip } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import { ID, PProperties, Properties, UseAddHookResult, UseEditHookResult } from '../../interfaces';
import { parseError } from '../../utils';
import Form, { FormSubmitOptions } from '../form';
import { FormData } from '../form/BaseForm';

// ----------------------------------------------

export type DialogSubmitOptions = {
  onSuccess?: () => void;
  onError?: () => void;
  onClose?: () => void;
};

// ----------------------------------------------

type DialogAddOp = {
  type: 'Add';
  addHook: UseAddHookResult;
  parentId?: ID; // only needed for Event and Notification
};

type DialogEditOp = {
  type: 'Edit';
  editHook: UseEditHookResult;
  data: Properties;
};

export type DialogProps = {
  open: boolean;
  type: 'App' | 'Event' | 'Notification';
};

export type DialogFnProps = DialogProps & {
  operation: DialogAddOp | DialogEditOp;

  options?: DialogSubmitOptions;
};

// ----------------------------------------------

function Dialog({ open, type, operation, options }: DialogFnProps) {
  const formData: FormData = {
    name: '',
    description: '',
  };

  if (operation.type === 'Edit') {
    formData.name = operation.data.name;
    formData.description = operation.data.description;
  }

  const handleClose = () => {
    if (operation.type === 'Add') {
      operation.addHook.reset();
    }

    if (operation.type === 'Edit') {
      operation.editHook.reset();
    }

    if (options?.onClose) options.onClose();
  };

  useEffect(() => {
    if (!open) handleClose();
  }, [open]);

  const parseSuccessMessage = (type: string, operation: string) => {
    return `${type} ${operation} successfully`;
  };

  const handleSubmit = (newData: FormData, { onSuccess, onError }: FormSubmitOptions) => {
    const mutationData: PProperties = {
      name: newData.name,
      description: newData.description,
    };

    if (operation.type === 'Add') {
      let d = { ...mutationData };

      if (operation.parentId) {
        if (type === 'Event') {
          d = {
            ...d,
            application: operation.parentId,
          };
        }

        if (type === 'Notification') {
          d = {
            ...d,
            event: operation.parentId,
          };
        }
      }

      operation.addHook.mutate(d, {
        onSuccess: () => {
          if (options?.onSuccess) options.onSuccess();
          if (onSuccess) onSuccess(parseSuccessMessage(type, 'added'));
        },
        onError: (error) => {
          if (options?.onError) options.onError();
          if (onError) onError(parseError(error));
        },
      });

      return;
    }

    if (operation.type === 'Edit') {
      operation.editHook.mutate(
        {
          ...mutationData,
          id: operation.data.id,
        },
        {
          onSuccess: () => {
            if (options?.onSuccess) options.onSuccess();
            if (onSuccess) onSuccess(parseSuccessMessage(type, 'edited'));
          },
          onError: (error) => {
            if (options?.onError) options.onError();
            if (onError) onError(parseError(error));
          },
        }
      );

      return;
    }
  };

  return (
    <>
      <MuiDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>
              {operation.type} {type}
            </Box>
            <Box>
              <Tooltip title="Close" enterTouchDelay={0}>
                <IconButton onClick={handleClose} edge="end">
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Form formData={formData} onSubmit={handleSubmit} />
        </DialogContent>
      </MuiDialog>
    </>
  );
}

export default Dialog;
