import { Container } from '@mui/material';
import { useState } from 'react';
import Form from '../common/form';
import { FormData } from '../common/form/BaseForm';

function TestPage() {
  const [formData, setFormData] = useState<FormData>({
    name: 'Test',
    description: 'Test desc',
    notification: {
      template_subject: 'Test subject',
      template_body: 'TEST BODY',
    },
  });

  return (
    <Container sx={{ p: 2 }}>
      <Form formData={formData} />
    </Container>
  );
}

export default TestPage;
