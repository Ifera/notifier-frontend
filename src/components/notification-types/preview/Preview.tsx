import { Alert, Box, CircularProgress, Grid, Typography } from '@mui/material';

import { useState } from 'react';
import PreviewForm, { ValueProps } from '../../../common/PreviewForm';
import useAdd from '../../../hooks/useAdd';
import useTags from '../../../hooks/useTags';
import { ID } from '../../../interfaces';
import notificationService from '../../../services/notificationService';
import { parseError } from '../../../utils';

interface PreviewProps {
  event: ID;
}

const Preview = ({ event }: PreviewProps) => {
  const [initialValues, setInitialValues] = useState<ValueProps>({
    name: '',
    description: '',
    template_subject: '',
    template_body: '',
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addHook = useAdd(notificationService);

  const { data: tags, isLoading: tagsLoading, error } = useTags();

  if (error) {
    return (
      <Alert severity='error' sx={{ marginTop: 2 }}>
        An error occurred while loading the tags
      </Alert>
    );
  }

  const onSubmit = (values: ValueProps) => {
    addHook.mutate(
      { ...values, event },
      {
        onSuccess: () => {
          setErrorMessage(null);
          setSuccessMessage('Notification added successfully');
        },
        onError: (error) => {
          console.log('error');
          setErrorMessage(parseError(error));
          setSuccessMessage(null);
        },
      }
    );
  };

  const onChange = (values: ValueProps) => {
    setInitialValues(values);
  };

  const onError = (errorMessage: string) => {
    setSuccessMessage(null);
    setErrorMessage(errorMessage);
  };

  return (
    <Grid container p={{ sm: 2, md: 8, lg: 10 }}>
      <Grid item xs={12} md={6} px={4} py={1}>
        <Typography variant='h5' sx={{ fontWeight: 600, mb: 2 }}>
          Notification
        </Typography>
        {successMessage && <Alert severity='success'>{successMessage}</Alert>}
        {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
        {tagsLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '75%',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <PreviewForm
            defaultValues={initialValues}
            tags={tags}
            onError={onError}
            onSubmit={onSubmit}
            onChange={onChange}
          />
        )}
      </Grid>

      <Grid item xs={12} md={6} px={4} py={2}>
        <Typography variant='h5' sx={{ fontWeight: 600, mb: 2 }}>
          Preview
        </Typography>
        <Box
          width='100%'
          sx={{
            bgcolor: '#F1FAFF',
            border: '1px solid #98CDFF',
            height: '75%',
            whiteSpace: 'pre-wrap',
          }}
          p={4}
        >
          <Typography variant='h6' sx={{ fontWeight: 500 }}>
            {initialValues.template_subject}
          </Typography>
          <Typography variant='body1'>{initialValues.template_body}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Preview;
