import { zodResolver } from '@hookform/resolvers/zod';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormDataSchemaType } from '../../interfaces';
import { formDataSchema } from '../../utils/validation/schema';
import ConfirmDialog from '../dialog/confirm';
import StyledMentionsInput from '../text/input/MentionsInput';
import TextInput from '../text/input/TextInput';

export interface NotificationData {
  template_subject: string;
  template_body: string;
}

export interface AuthData {
  email: string;
  password: string;
}

export interface FormData {
  name?: string;
  description?: string;

  auth?: AuthData;
  notification?: NotificationData;
}

export interface BaseFormProps {
  formData: FormData;
  btnText?: string;
  backBtn?: string;
  onSubmit: (data: FormData) => void;
  onChange?: (data: FormData) => void;
}

function BaseForm({ formData, btnText, backBtn, onSubmit, onChange }: BaseFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormDataSchemaType>({
    resolver: zodResolver(formDataSchema),
    mode: 'all',
    values: formData,
    defaultValues: formData,
  });

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (formData.auth !== undefined) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  const onFormSubmit: SubmitHandler<FormDataSchemaType> = (data) => {
    onSubmit(data); // submit data
  };

  const handleFormChange = () => {
    if (onChange) onChange(getValues());
  };

  const handleConfirmDialogSubmit = () => {
    if (backBtn) navigate(backBtn);
  };

  const handleClickBackBtn = () => {
    if (isDirty) {
      setOpenConfirmDialog(true);
      return;
    }

    if (backBtn) navigate(backBtn);
  };

  const handleClickConfirmDialogCloseBtn = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <>
      <ConfirmDialog
        open={openConfirmDialog}
        text='Are you sure you want to go back? All unsaved changes will be lost.'
        onSubmit={handleConfirmDialogSubmit}
        onClose={handleClickConfirmDialogCloseBtn}
      />

      <form onSubmit={handleSubmit(onFormSubmit)} onChange={handleFormChange}>
        {formData.name !== undefined && (
          <TextInput
            {...register('name')}
            label='Name'
            errorMessage={errors.name?.message || null}
          />
        )}

        {formData.description !== undefined && (
          <TextInput
            {...register('description')}
            label='Description'
            rows={3}
            multiline
            errorMessage={errors.description?.message || null}
          />
        )}

        {formData.auth && (
          <>
            <TextInput
              {...register('auth.email')}
              label='Email'
              errorMessage={errors.auth?.email?.message || null}
              startIcon={<EmailIcon />}
              type='email'
            />

            <TextInput
              {...register('auth.password')}
              label='Password'
              errorMessage={errors.auth?.password?.message || null}
              type='password'
              startIcon={<LockIcon />}
            />
          </>
        )}

        {formData.notification && (
          <>
            <TextInput
              {...register('notification.template_subject')}
              label='Subject'
              errorMessage={errors.notification?.template_subject?.message || null}
            />

            {/* mentions input doesn"t work properly with refs so have to manually set values */}
            <StyledMentionsInput
              {...register('notification.template_body')}
              label='Body'
              value={getValues('notification.template_body')}
              onChange={(e) => {
                setValue('notification.template_body', e.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              errorMessage={errors.notification?.template_body?.message || null}
            />
          </>
        )}

        <Box py={2}>
          {backBtn ? (
            <Grid container spacing={2}>
              <Grid item>
                <Button variant='contained' color='primary' type='submit' disabled={isSubmitting}>
                  {btnText || 'Submit'}
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant='contained'
                  color='warning'
                  type='button'
                  onClick={handleClickBackBtn}
                >
                  Go Back
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Button
              variant='contained'
              color='primary'
              type='submit'
              fullWidth
              disabled={isSubmitting}
            >
              {btnText || 'Submit'}
            </Button>
          )}
        </Box>
      </form>
    </>
  );
}

export default BaseForm;
