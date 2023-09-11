import { Button, CardActionArea } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Application } from '../../../interfaces';

interface ApplicationCardProps {
  application: Application;
  onCardClick: (cardId: string | number) => void;
}

function ApplicationCard({ application, onCardClick }: ApplicationCardProps) {
  return (
    <>
      <CardActionArea onClick={() => onCardClick(application.id)}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant='h5' component='h2'>
            {application.name}
          </Typography>
          <Typography>{application.description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small'>Edit</Button>
        <Button size='small'>Delete</Button>
        <Button size='small'>Deactivate</Button>
      </CardActions>
    </>
  );
}

export default ApplicationCard;
