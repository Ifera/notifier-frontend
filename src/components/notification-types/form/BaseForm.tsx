import { Box, Grid, Paper, Typography } from '@mui/material';
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

  const handleSubmit = (newData: FormData, { onSuccess, onError }: FormSubmitOptions) => {
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
    <Grid
      container
      px={{ sm: 4, md: 8, lg: 10 }}
      py={4}
      alignItems='stretch'
      justifyContent='center'
    >
      {/* form */}
      <Grid item xs={12} md={6} px={4} py={4} component={Paper}>
        <Typography variant='h6' sx={{ fontWeight: 600, mb: 2 }}>
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
      <Grid item xs={12} md={6} px={4} py={2} component={Paper}>
        <Typography variant='h6' sx={{ fontWeight: 600, mb: { xs: 2, md: 7 } }}>
          Preview
        </Typography>

        <Box
          width='100%'
          sx={{
            bgcolor: '#F1FAFF',
            border: '1px solid #98CDFF',
            whiteSpace: 'pre-wrap',
            overflow: 'auto',
            height: '530px',
            my: 2,
          }}
          py={1}
          px={2}
        >
          <Typography variant='h6' sx={{ fontWeight: 500, mb: 1 }}>
            {data.notification?.template_subject}
          </Typography>
          <Typography variant='body1'>{data.notification?.template_body}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BaseForm;
