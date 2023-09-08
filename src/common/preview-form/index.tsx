import { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import TextInput from "../TextInput";
import { Box, Button, Grid, FormControl } from "@mui/material"; // Import Form from Material-UI

interface PreviewFormProps {
  initialValues: {
    name: string;
    description: string;
    body?: string;
  };
  onSubmit: (values: any) => void;
}

function PreviewForm({ initialValues, onSubmit }: PreviewFormProps) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = () => {
    console.log("values");
    onSubmit(values);
  };

  return (
    <FormControl onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <TextInput
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      <TextInput
        label="Description"
        name="description"
        value={values.description}
        onChange={handleChange}
      />
      {values.body && (
        <TextField
          multiline={true}
          label="Body"
          name="body"
          value={values.body}
          onChange={handleChange}
        />
      )}
      <Box py={4}>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </FormControl>
  );
}

export default PreviewForm;
