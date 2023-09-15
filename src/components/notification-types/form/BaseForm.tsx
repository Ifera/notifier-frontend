import { Alert, Box, CircularProgress, Grid, Typography } from '@mui/material';
import _ from 'lodash';
import { useState } from 'react';

import ms from 'ms';
import { useNavigate } from 'react-router-dom';
import PreviewForm, { ValueProps } from '../../../common/PreviewForm';
import useTags from '../../../hooks/useTags';
import { ID, UseAddHookResult, UseEditHookResult } from '../../../interfaces';
import { parseError } from '../../../utils';

interface BaseFormProps {
  id: ID;
  operation: 'Add' | 'Edit';
  hook: UseAddHookResult | UseEditHookResult;
  initialData?: ValueProps;
}

const BaseForm = ({ id, operation, hook, initialData }: BaseFormProps) => {
  const [initialValues, setInitialValues] = useState<ValueProps>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    template_subject: initialData?.template_subject || '',
    template_body: initialData?.template_body || '',
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [tempData, setTempData] = useState<ValueProps>({ ...initialValues });

  const navigate = useNavigate();

  const { data: tags, isLoading: tagsLoading, error } = useTags();

  if (error) {
    return (
      <Alert severity='error' sx={{ marginTop: 2 }}>
        An error occurred while loading the tags
      </Alert>
    );
  }

  function onSubmit(
    values: ValueProps,
    onSuccess?: (cause: 'Add' | 'Edit') => void
  ) {
    if (operation === 'Add') {
      hook.mutate(
        { ...values, event: id },
        {
          onSuccess: () => {
            setErrorMessage(null);
            setSuccessMessage('Notification added successfully');

            setInitialValues({
              name: '',
              description: '',
              template_subject: '',
              template_body: '',
            });

            if (onSuccess) onSuccess(operation);

            // go to dashboard on success after 1s
            setTimeout(() => {
              navigate('/');
            }, ms('1s'));
          },
          onError: (error) => {
            setErrorMessage(parseError(error));
            setSuccessMessage(null);
          },
        }
      );

      return;
    }

    if (operation === 'Edit') {
      if (_.isEqual(tempData, values)) {
        setErrorMessage('No changes made.');
        setSuccessMessage(null);

        return;
      }

      hook.mutate(
        { ...values, id },
        {
          onSuccess: () => {
            setErrorMessage(null);
            setSuccessMessage('Notification updated successfully');

            setTempData({ ...tempData, ...values });

            if (onSuccess) onSuccess(operation);

            // go to dashboard on success after 1s
            setTimeout(() => {
              navigate('/');
            }, ms('1s'));
          },
          onError: (error) => {
            setErrorMessage(parseError(error));
            setSuccessMessage(null);
          },
        }
      );

      return;
    }
  }

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
            backBtn='/'
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

export default BaseForm;
