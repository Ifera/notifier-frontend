import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import useAdd from '../../hooks/useAdd';
import applicationService from '../../services/applicationService';
import EditDialog, { EditDialogProps } from '../edit/EditDialog';
import SortPopover from './SortPopover';
import ToolbarOptions from './ToolbarOptions';

const sortOptions = [
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'Created Date',
    value: 'createdDate',
  },
  {
    label: 'Description',
    value: 'description',
  },
];

interface ToolBarProps {
  title: string;
}

export default function ToolBar({ title }: ToolBarProps) {
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(
    null
  );
  const [dialogProps, setDialogProps] = useState<EditDialogProps>({
    open: false,
    type: 'App',
    operation: 'Add',
    data: null,
  });

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const addHook = useAdd(applicationService);

  const handleCloseSort = () => {
    setSortAnchorEl(null);
  };

  const handleSortChange = (value: string) => {
    if (selectedSortOption === value) {
      setSelectedSortOption(null);
    } else {
      setSelectedSortOption(value);
      setSortDirection('asc');
    }
    setSortAnchorEl(null);
  };

  const handleSortDirectionChange = (newDirection: string) => {
    setSortDirection(newDirection);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleEditDialogClose = () => {
    setDialogProps({ ...dialogProps, open: false, data: null });
  };

  const handleClickAddBtn = () => {
    setDialogProps({ ...dialogProps, open: true, data: null });
  };

  const renderToolbarOptions = () => (
    <ToolbarOptions
      setSortAnchorEl={setSortAnchorEl}
      sortOptions={sortOptions}
      selectedSortOption={selectedSortOption}
      sortDirection={sortDirection}
      onClickAddBtn={handleClickAddBtn}
    />
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id='toolbar-menu-mobile'
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{ display: { xs: 'block', sm: 'none' } }}
    >
      <MenuItem>{renderToolbarOptions()}</MenuItem>
    </Menu>
  );

  const openSort = Boolean(sortAnchorEl);

  return (
    <>
      <EditDialog
        {...dialogProps}
        onClose={handleEditDialogClose}
        addHook={addHook}
      />
      <Toolbar
        sx={{
          mt: 2,
          background: '#F5FAFF',
          border: '1px solid #98CDFF',
          borderRadius: '5px',
          color: 'black',
          boxShadow: 'none',
          alignItems: 'center',
        }}
      >
        <Typography variant='h6' component='div' sx={{ flex: 1 }}>
          {title}
        </Typography>
        <IconButton
          onClick={handleMobileMenuOpen}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          {renderToolbarOptions()}
        </Box>
      </Toolbar>
      {renderMobileMenu}

      <SortPopover
        open={openSort}
        anchorEl={sortAnchorEl}
        handleCloseSort={handleCloseSort}
        sortOptions={sortOptions}
        sortDirection={sortDirection}
        selectedSortOption={selectedSortOption || ''}
        handleSortChange={handleSortChange}
        handleSortDirectionChange={handleSortDirectionChange}
      />
    </>
  );
}
