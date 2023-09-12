import { Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import PreviewForm, { ValueProps } from '../../../common/PreviewForm';

const Preview = () => {
  const [initialValues, setInitialValues] = useState<ValueProps>({
    name: '',
    description: '',
    subject: '',
    body: '',
  });

  const onSubmit = (values: ValueProps) => {
    console.log(values);
    setInitialValues(values);
  };

  return (
    <Grid container p={{ sm: 2, md: 8, lg: 10 }}>
      <Grid item xs={12} md={6} px={4} py={1}>
        <Typography variant='h5' sx={{ fontWeight: 600, mb: 2 }}>
          Notification
        </Typography>
        <PreviewForm
          defaultValues={initialValues}
          onSubmit={onSubmit}
          setDefaultValues={setInitialValues}
        />
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
            {initialValues.subject}
          </Typography>
          <Typography variant='body1'>{initialValues.body}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Preview;
