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
    <Grid container p={12}>
      <Grid item xs={12} sm={6} p={12}>
        <PreviewForm initialValues={initialValues} onSubmit={onSubmit} />
      </Grid>
      <Grid item xs={12} sm={6} p={12}>
        <h1>Preview</h1>
      </Grid>
    </Grid>
  );
};

export default Preview;
