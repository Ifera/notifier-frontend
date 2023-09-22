import MenuIcon from '@mui/icons-material/Menu';
import { Box, Hidden, IconButton, Menu, Switch, Tooltip } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { useBetween } from 'use-between';
import { Properties, UseDeleteHookResult, UseEditHookResult } from '../../interfaces';
import { dashboardState } from '../../pages/Dashboard';
import { snackbarState } from '../../utils/SnackbarState';
import DeleteDialog from '../dialog/delete';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import InfoButton from './InfoButton';

interface ActionButtonsProps {
  type: 'App' | 'Event' | 'Notification';
  data: Properties;
  editHook: UseEditHookResult;
  delHook: UseDeleteHookResult;
  disabled?: boolean;

  // callback functions
  onClickEdit?: (data: Properties) => void;
  onClickDelete?: (data: Properties) => void;
  onClickSwitch?: (data: Properties, value: boolean) => void;
}

function ActionButtons({
  type,
  data,
  editHook,
  delHook,
  disabled = false,

  onClickEdit,
  onClickDelete,
  onClickSwitch,
}: ActionButtonsProps) {
  const [switchStatus, setSwitchStatus] = useState(false);
  const [delBtnStatus, setDelBtnStatus] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const { setSelectedApp, setSelectedEvent } = useBetween(dashboardState);
  const { handleSuccessMessage, handleErrorMessage } = useBetween(snackbarState);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleClickEdit = () => {
    if (onClickEdit) onClickEdit(data);
  };

  const handleClickDelete = () => {
    setDelBtnStatus(true);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    delHook.mutate(
      { id: data.id },
      {
        onSuccess: () => {
          handleSuccessMessage(`${type} deleted successfully`);

          if (type === 'App') {
            setSelectedApp(null);
            setSelectedEvent(null);
          }

          if (type === 'Event') setSelectedEvent(null);
        },
        onError: (error) => {
          handleErrorMessage(`Unable to delete the selected ${type}`);
          console.log(error);
        },
        onSettled: () => {
          setDelBtnStatus(false);
          setIsDialogOpen(false);
        },
      }
    );

    if (onClickDelete) onClickDelete(data);
  };

  const handleClickSwitch = (value: boolean) => {
    setSwitchStatus(true);

    editHook.mutate(
      {
        id: data.id,
        is_active: value,
      },
      {
        onSuccess: () => {
          handleSuccessMessage(`${type} ${value ? 'activated' : 'deactivated'} successfully`);
        },
        onError: (error) => {
          handleErrorMessage(`Unable to ${value ? 'activate' : 'deactivate'} the selected ${type}`);
          console.log(error);
        },
        onSettled: () => {
          setSwitchStatus(false);
        },
      }
    );

    if (onClickSwitch) onClickSwitch(data, value);
  };

  const onClick = (e: MouseEvent, type: 'edit' | 'delete' | 'switch') => {
    e.stopPropagation();

    if (type === 'switch') {
      const t = e.target as HTMLInputElement;

      handleClickSwitch(t.checked);

      return;
    }

    if (type === 'delete') {
      handleClickDelete();

      return;
    }

    if (type === 'edit') {
      handleClickEdit();

      return;
    }
  };

  const btns = () => {
    return (
      <>
        <InfoButton data={data} />
        <EditButton onClick={(e) => onClick(e, 'edit')} disabled={disabled} />
        <DeleteButton onClick={(e) => onClick(e, 'delete')} disabled={delBtnStatus || disabled} />
        <Tooltip title={data.is_active ? 'Deactivate' : 'Activate'}>
          <Switch
            key={data.id}
            onClick={(e) => onClick(e, 'switch')}
            checked={data.is_active}
            disabled={switchStatus || disabled}
          />
        </Tooltip>

        <DeleteDialog
          open={isDialogOpen}
          type={type}
          handleClose={() => {
            setIsDialogOpen(false);
            setDelBtnStatus(false);
            disabled = false;
          }}
          handleSubmit={handleConfirmDelete} // Perform the delete action
        />
      </>
    );
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMobileMenu = () => (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      id='action-btns-mobile'
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{ display: { xs: 'block', sm: 'none' } }}
    >
      <Box px={2}>{btns()}</Box>
    </Menu>
  );

  // just render the btns as is for app cards
  if (type === 'App') return <>{btns()}</>;

  return (
    <>
      <IconButton onClick={handleMobileMenuOpen} sx={{ display: { sm: 'none' } }}>
        <MenuIcon />
      </IconButton>
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {renderMobileMenu()}
      </Box>

      <Hidden smDown>{btns()}</Hidden>
    </>
  );
}

export default ActionButtons;
