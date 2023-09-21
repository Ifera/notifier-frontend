import { Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form, { FormSubmitOptions } from '../../../common/form';
import { FormData } from '../../../common/form/BaseForm';
import { ID, UseAddHookResult, UseEditHookResult } from '../../../interfaces';
import { parseError } from '../../../utils';

interface BaseFormProps {
  id: ID;
  operation: 'Add' | 'Edit';
  hook: UseAddHookResult | UseEditHookResult;
  formData: FormData | null;
}

const BaseForm = ({ id, operation, hook, formData }: BaseFormProps) => {
  const [data, setData] = useState<FormData>(
    formData || {
      name: '',
      description: '',
      notification: {
        template_subject: '',
        template_body: '',
      },
    }
  );

  const navigate = useNavigate();

  const handleChange = (newData: FormData) => {
    setData(newData);
  };

  const handleSubmit = (
    newData: FormData,
    { onSuccess, onError }: FormSubmitOptions
  ) => {
    const mutationData = {
      name: newData.name,
      description: newData.description,
      template_subject: newData.notification?.template_subject,
      template_body: newData.notification?.template_body,
    };

    if (operation === 'Add') {
      hook.mutate(
        { ...mutationData, event: id },
        {
          onSuccess: () => {
            navigate('/');
            if (onSuccess) onSuccess('Notification added successfully');
          },
          onError: (error) => {
            if (onError) onError(parseError(error));
          },
        }
      );

      return;
    }

    if (operation === 'Edit') {
      hook.mutate(
        { ...mutationData, id },
        {
          onSuccess: () => {
            navigate('/');
            if (onSuccess) onSuccess('Notification updated successfully');
          },
          onError: (error) => {
            if (onError) onError(parseError(error));
          },
        }
      );

      return;
    }
  };

  return (
    <Grid container p={{ sm: 2, md: 8, lg: 10 }}>
      {/* form */}
      <Grid item xs={12} md={6} px={4} py={1}>
        <Typography variant='h5' sx={{ fontWeight: 600, mb: 2 }}>
          Notification
        </Typography>

        <Form
          formData={
            formData || {
              name: '',
              description: '',
              notification: {
                template_subject: '',
                template_body: '',
              },
            }
          }
          backBtn='/'
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      </Grid>

      {/* preview */}
      <Grid item xs={12} md={6} px={4} py={1}>
        <Typography variant='h5' sx={{ fontWeight: 600, mb: 2 }}>
          Preview
        </Typography>
        <Box
          width='100%'
          sx={{
            bgcolor: '#F1FAFF',
            border: '1px solid #98CDFF',
            height: '78%',
            whiteSpace: 'pre-wrap',
            width: '100%',
            overflow: 'auto',
          }}
          p={4}
        >
          <Typography variant='h6' sx={{ fontWeight: 500 }}>
            {data.notification?.template_subject}
          </Typography>
          <Typography variant='body1'>
            {data.notification?.template_body}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BaseForm;
