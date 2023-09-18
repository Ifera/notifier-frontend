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
  const createdAtDate: Date = new Date(application.created_at);
  const formattedDate = createdAtDate.toLocaleDateString();
  return (
    <>
      <CardActionArea
        onClick={() => onCardClick(application.id, application.name)}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography gutterBottom variant='h5' component='h2'>
              {application.name}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography sx={{ fontSize: 14 }} color='#071B2F'>
              {formattedDate}
            </Typography>
          </Box>
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
