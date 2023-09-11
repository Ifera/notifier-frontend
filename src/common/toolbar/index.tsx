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

export default function ToolBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(
    null
  );
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSort = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (value: string) => {
    if (selectedSortOption === value) {
      setSelectedSortOption(null);
    } else {
      setSelectedSortOption(value);
      setSortDirection('asc');
    }
    setAnchorEl(null);
  };

  const handleAddNew = () => {
    console.log('Add new');
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
  const renderToolbarOptions = () => (
    <ToolbarOptions
      sortOptions={sortOptions}
      selectedSortOption={selectedSortOption}
      sortDirection={sortDirection}
      handleSortClick={handleSortClick}
      handleAddNew={handleAddNew}
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

  const openSort = Boolean(anchorEl);

  return (
    <>
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
          Applications
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
        anchorEl={anchorEl}
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
