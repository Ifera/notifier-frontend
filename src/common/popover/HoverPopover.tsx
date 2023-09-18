import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

interface HoverPopoverProps {
  text: string;
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

function HoverPopover({ text, open, anchorEl, onClose }: HoverPopoverProps) {
  return (
    <Popover
      id='mouse-over-popover'
      sx={{
        pointerEvents: 'none',
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={onClose}
      disableRestoreFocus
    >
      <Typography sx={{ p: 1 }} variant='body2'>
        {text}
      </Typography>
    </Popover>
  );
}

export default HoverPopover;
