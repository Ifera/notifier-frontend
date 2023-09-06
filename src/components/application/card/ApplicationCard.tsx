import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface ApplicationCardProps {
  title: string;
  description: string;
}

function ApplicationCard({ title, description }: ApplicationCardProps) {
  return (
    <>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
        <Button size="small">Deactivate</Button>
      </CardActions>
    </>
  );
}

export default ApplicationCard;
