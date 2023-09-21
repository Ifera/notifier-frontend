import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormDataSchemaType } from '../../interfaces';
import { formDataSchema } from '../../utils/validation/schema';
import StyledMentionsInput from '../text/input/MentionsInput';
import TextInput from '../text/input/TextInput';

export interface NotificationData {
  template_subject: string;
  template_body: string;
}

export interface FormData {
  name: string;
  description: string;

  notification?: NotificationData;
}

export interface BaseFormProps {
  formData: FormData;
  backBtn?: string;
  onSubmit: (data: FormData) => void;
}

function BaseForm({ formData, backBtn, onSubmit }: BaseFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormDataSchemaType>({
    resolver: zodResolver(formDataSchema),
    mode: 'all',
    values: formData,
  });

  const navigate = useNavigate();

  const onFormSubmit: SubmitHandler<FormDataSchemaType> = (d) => {
    onSubmit(d); // submit data
  };

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <TextInput
          {...register('name')}
          label='Name'
          errorMessage={errors.name?.message || null}
        />

        <TextInput
          {...register('description')}
          label='Description'
          rows={3}
          multiline
          errorMessage={errors.description?.message || null}
        />

        {formData.notification ? (
          <>
            <TextInput
              {...register('notification.template_subject')}
              label='Subject'
              errorMessage={
                errors.notification?.template_subject?.message || null
              }
            />

            {/* mentions input doesn"t work properly with refs so have to manually set values */}
            <StyledMentionsInput
              {...register('notification.template_body')}
              label='Body'
              value={getValues('notification.template_body')}
              onChange={(e) => {
                setValue('notification.template_body', e.target.value, {
                  shouldValidate: true,
                });
              }}
              errorMessage={errors.notification?.template_body?.message || null}
            />
          </>
        ) : null}

        <Box py={2}>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Grid>

            {backBtn ? (
              <Grid item>
                <Button
                  variant='contained'
                  color='warning'
                  type='button'
                  onClick={() => navigate(backBtn)}
                >
                  Go Back
                </Button>
              </Grid>
            ) : null}
          </Grid>
        </Box>
      </form>
    </>
  );
}

export default BaseForm;
