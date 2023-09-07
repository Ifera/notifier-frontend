import { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField";

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
    console.log(values);
    onSubmit(values);
  };

  return (
    <div>
      <TextField
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      <TextField
        label="Description"
        name="description"
        value={values.description}
        onChange={handleChange}
      />
      {values.body && (
        <TextField
          label="Body"
          name="body"
          value={values.body}
          onChange={handleChange}
        />
      )}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default PreviewForm;
