import { Box, Grid, Typography } from "@mui/material";
import PreviewForm from "../../../common/PreviewForm";
import { useState } from "react";
const Preview = () => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    subject: "",
    body: "",
  });

  const onSubmit = (values: {
    name: string;
    description: string;
    subject: string;
    body: string;
  }) => {
    console.log(values);
    setInitialValues(values);
  };
  return (
    <Grid container p={{ sm: 2, md: 8, lg: 10 }}>
      <Grid item xs={12} md={6} px={4} py={1}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Notification
        </Typography>
        <PreviewForm values={initialValues} onSubmit={onSubmit} />
      </Grid>
      <Grid item xs={12} md={6} px={4} py={2}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Preview
        </Typography>
        <Box
          width="100%"
          sx={{
            bgcolor: "#F1FAFF",
            border: "1px solid #98CDFF",
            height: "75%",
            whiteSpace: "pre-wrap",
          }}
          p={4}
        >
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            {initialValues.subject}
          </Typography>
          <Typography variant="body1">{initialValues.body}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Preview;
