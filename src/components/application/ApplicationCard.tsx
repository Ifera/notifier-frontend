import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface ApplicationCardProps {
  title: string;
  description: string;
}

function ApplicationCard({ title, description }: ApplicationCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
    </Card>
  );
}

export default ApplicationCard;
