import { Grid } from "@mui/material";
import PreviewForm from "../../../common/preview-form";

const initialValues = {
  name: "",
  description: "",
};

const onSubmit = (values: any) => {
  console.log(values);
};

const Preview = () => {
  return (
    <Grid container p={{ xs: 2, sm: 2, md: 10 }}>
      <Grid item xs={12} sm={6} p={{ xs: 2, sm: 4 }}>
        <PreviewForm initialValues={initialValues} onSubmit={onSubmit} />
      </Grid>
      <Grid item xs={12} sm={6} p={{ xs: 2, sm: 4 }}>
        <h1>Preview</h1>
      </Grid>
    </Grid>
  );
};

export default Preview;
