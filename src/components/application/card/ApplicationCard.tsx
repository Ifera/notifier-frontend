import { Box, CardActionArea, Chip } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ActionButtons from '../../../common/buttons/ActionButtons';
import { Application, ID, UseDeleteHookResult, UseEditHookResult } from '../../../interfaces';

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
      <CardActionArea onClick={() => onCardClick(application.id, application.name)}>
        <CardContent sx={{ flexGrow: 1, overflowWrap: 'anywhere' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              pb: 1,
              mb: 2,
              borderBottom: '1px solid #E0E0E0',
            }}
          >
            <Typography sx={{ fontSize: 14 }} color='#071B2F'>
              {formattedDate}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Chip
              label={application.is_active ? 'Active' : 'Inactive'}
              sx={{
                backgroundColor: application.is_active ? '#0060B9' : 'grey',
                color: 'white',
                borderRadius: 2,
                fontSize: '0.75rem',
                fontWeight: 'bold',
              }}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              minHeight: { xs: '65px', sm: '75px' },
              maxHeight: '75px',
            }}
          >
            <Typography variant='h6'>
              {application.name.length > 25
                ? application.name.substring(0, 25) + '...'
                : application.name}
            </Typography>
            <Typography variant='body2'>
              {application.description.length > 80
                ? application.description.substring(0, 80) + '...'
                : application.description}
            </Typography>
          </Box>
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
