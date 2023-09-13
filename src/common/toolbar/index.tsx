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
import { ApplicationQuery } from '../../interfaces';
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
    label: 'Date Created',
    value: 'created_at',
  },
  {
    label: 'Date Modified',
    value: 'modified_at',
  },
  {
    label: 'Active',
    value: 'is_active',
  },
];

interface ToolBarProps {
  title: string;
  query: ApplicationQuery;
  setQuery: React.Dispatch<React.SetStateAction<ApplicationQuery>>;
}

export default function ToolBar({ title, query, setQuery }: ToolBarProps) {
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const [sortDirection, setSortDirection] = useState(1);
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
      delete query.sortBy;
      setQuery({ ...query, pageNumber: 1 });
      setSelectedSortOption(null);
    } else {
      query.sortBy = value;
      setQuery({ ...query, pageNumber: 1 });
      setSelectedSortOption(value);
    }

    setSortAnchorEl(null);
  };

  const handleSearchChange = (search: string) => {
    if (search === '') {
      delete query.like;
      setQuery({ ...query, pageNumber: 1 });
      return;
    }

    query.like = search;
    setQuery({ ...query, pageNumber: 1 });
  };

  const handleSortDirectionChange = (newDirection: number) => {
    if (newDirection === sortDirection) {
      delete query.sortOrder;
      setQuery({ ...query, pageNumber: 1 });
      setSortDirection(1);
    } else {
      query.sortOrder = newDirection;
      setQuery({ ...query, pageNumber: 1 });
      setSortDirection(newDirection);
    }
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
      onSearchChange={handleSearchChange}
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
        variant='dense'
        sx={{
          mt: 4,
          background: '#F5FAFF',
          boxShadow: '0px 4px 4px rgba(152, 205, 255, 0.5)',
          borderRadius: 2,
          color: 'black',
          alignItems: 'center',
        }}
      >
        <Typography variant='h6' sx={{ flex: 1, fontSize: '18px' }}>
          {title}
        </Typography>
        <IconButton
          onClick={handleMobileMenuOpen}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
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
