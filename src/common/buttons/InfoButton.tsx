import { Info } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
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
            <p>
              ID: {data.id} <br />
              Name: {data.name} <br />
              Description: {data.description} <br />
              Created at: {dcText} <br />
              Modified at: {dmText}
            </p>
          </div>
        }
      >
        <IconButton size='medium' edge='start' sx={{ color: 'gray' }}>
          <Info />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default InfoButton;
