import { Box, CardActionArea } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ActionButtons from '../../../common/buttons/ActionButtons';
import {
  Application,
  ID,
  UseDeleteHookResult,
  UseEditHookResult,
} from '../../../interfaces';

interface ApplicationCardProps {
  application: Application;
  editHook: UseEditHookResult;
  delHook: UseDeleteHookResult;
  onCardClick: (cardId: ID, name: string) => void;
  onClickEditBtn?: (data: Application) => void;
}

function ApplicationCard({
  application,
  editHook,
  delHook,
  onCardClick,
  onClickEditBtn,
}: ApplicationCardProps) {
  return (
    <>
      <CardActionArea
        onClick={() => onCardClick(application.id, application.name)}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant='h5' component='h2'>
            {application.name}
          </Typography>
          <Typography>{application.description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box ml={1}>
          <ActionButtons
            type='App'
            data={application}
            editHook={editHook}
            delHook={delHook}
            onClickEdit={onClickEditBtn}
          />
        </Box>
      </CardActions>
    </>
  );
}

export default ApplicationCard;
