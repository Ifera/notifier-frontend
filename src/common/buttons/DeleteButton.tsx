import { Delete } from '@mui/icons-material';
import { ButtonProps, IconButton } from '@mui/material';
import { useState } from 'react';
import HoverPopover from '../popover/HoverPopover';

function DeleteButton(props: ButtonProps) {
  const [openPopover, setOpenPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(true);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setOpenPopover(false);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        color='error'
        size='medium'
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        {...props}
      >
        <Delete />
      </IconButton>

      <HoverPopover
        text='Click to delete'
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
      />
    </>
  );
}

export default DeleteButton;
