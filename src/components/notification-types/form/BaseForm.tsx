import { Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../../common/form';
import { FormData } from '../../../common/form/BaseForm';
import { ID, UseAddHookResult, UseEditHookResult } from '../../../interfaces';

interface BaseFormProps {
  id: ID;
  operation: 'Add' | 'Edit';
  hook: UseAddHookResult | UseEditHookResult;
  initialData?: FormData;
}

const BaseForm = ({ id, operation, hook, initialData }: BaseFormProps) => {
  const [data, setData] = useState<FormData>(
    initialData || {
      name: '',
      description: '',
      notification: {
        template_subject: '',
        template_body: '',
      },
    }
  );

  const navigate = useNavigate();

  // function onSubmit(
  //   values: ValueProps,
  //   onSuccess?: (cause: 'Add' | 'Edit') => void
  // ) {
  //   if (operation === 'Add') {
  //     hook.mutate(
  //       { ...values, event: id },
  //       {
  //         onSuccess: () => {
  //           setErrorMessage(null);
  //           setSuccessMessage('Notification added successfully');

  //           reset();

  //           if (onSuccess) onSuccess(operation);

  //           // go to dashboard on success after 1s
  //           setTimeout(() => {
  //             navigate('/');
  //           }, ms('1s'));
  //         },
  //         onError: (error) => {
  //           setErrorMessage(parseError(error));
  //           setSuccessMessage(null);
  //         },
  //       }
  //     );

  //     return;
  //   }

  //   if (operation === 'Edit') {
  //     if (_.isEqual(tempData, values)) {
  //       setErrorMessage('No changes made.');
  //       setSuccessMessage(null);

  //       return;
  //     }

  //     hook.mutate(
  //       { ...values, id },
  //       {
  //         onSuccess: () => {
  //           setErrorMessage(null);
  //           setSuccessMessage('Notification updated successfully');

  //           setTempData({ ...tempData, ...values });

  //           if (onSuccess) onSuccess(operation);

  //           // go to dashboard on success
  //           setTimeout(() => {
  //             navigate('/');
  //           }, ms('0.5s'));
  //         },
  //         onError: (error) => {
  //           setErrorMessage(parseError(error));
  //           setSuccessMessage(null);
  //         },
  //       }
  //     );

  //     return;
  //   }
  // }

  const handleChange = (newData: FormData) => {
    setData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const handleSubmit = (newData: FormData) => {
    console.log(newData);
  };

  return (
    <Grid container p={{ sm: 2, md: 8, lg: 10 }}>
      {/* form */}
      <Grid item xs={12} md={6} px={4} py={1}>
        <Typography variant='h5' sx={{ fontWeight: 600, mb: 2 }}>
          Notification
        </Typography>

        <Form
          formData={data}
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
            {data.notification.template_subject}
          </Typography>
          <Typography variant='body1'>
            {data.notification.template_body}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BaseForm;
