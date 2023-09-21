import { Info } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import ms from 'ms';
import { Properties } from '../../interfaces';

interface InfoButtonProps {
  data: Properties;
}

function InfoButton({ data }: InfoButtonProps) {
  const dc = new Date(data.created_at);
  const dm = new Date(data.modified_at);

  const dcText = dc.toDateString() + ' - ' + dc.toLocaleTimeString();
  const dmText = dm.toDateString() + ' - ' + dm.toLocaleTimeString();

  return (
    <>
      <Tooltip
        title={
          <div>
            <p style={{ fontSize: '13px' }}>
              <u>Name:</u> {data.name} <br />
              <u>Description:</u> {data.description} <br />
              <u>Created at:</u> {dcText} <br />
              <u>Modified at:</u> {dmText}
            </p>
          </div>
        }
        enterTouchDelay={0}
        leaveTouchDelay={ms('5s')}
      >
        <IconButton size='medium' edge='start' sx={{ color: 'gray' }}>
          <Info />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default InfoButton;
