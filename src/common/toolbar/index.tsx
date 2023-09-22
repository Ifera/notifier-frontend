import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdd from '../../hooks/useAdd';
import { ID, Query, Service } from '../../interfaces';
import Dialog, { DialogProps } from '../dialog';
import PopoverMenu from './PopoverMenu';
import ToolbarOptions from './toolbar-options/';

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

const filterOptions = [
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Inactive',
    value: 'inactive',
  },
];

interface ToolBarProps {
  type: 'App' | 'Event' | 'Notification';
  query: Query;
  service: Service;
  parentId?: ID;
  parentName?: string;
  totalCount?: number;
  setQuery: Dispatch<SetStateAction<Query>>;
}

export default function ToolBar({
  type,
  query,
  service,
  parentId,
  parentName,
  totalCount,
  setQuery,
}: ToolBarProps) {
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const [sortDirection, setSortDirection] = useState(1);
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(null);
  const [selectedFilterOption, setSelectedFilterOption] = useState<string | null>(null);

  const [dialogProps, setDialogProps] = useState<DialogProps>({
    open: false,
    type: type,
  });

  const addHook = useAdd(service);
  const navigate = useNavigate();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleCloseSort = () => {
    setSortAnchorEl(null);
  };

  const handleSortChange = (value: string) => {
    if (selectedSortOption === value || value === '') {
      delete query.sortBy;
      setQuery({ ...query, pageNumber: 1 });
      setSelectedSortOption(null);
    } else {
      setQuery({ ...query, pageNumber: 1, sortBy: value });
      setSelectedSortOption(value);
    }

    setSortAnchorEl(null);
  };

  const handleFilterChange = (value: string) => {
    if (selectedFilterOption === value || value === '') {
      delete query.isActive;
      setQuery({ ...query, pageNumber: 1 });
      setSelectedFilterOption(null);
    } else {
      setQuery({ ...query, pageNumber: 1, isActive: value === 'active' });
      setSelectedFilterOption(value);
    }

    setFilterAnchorEl(null);
  };

  const handleCloseFilter = () => {
    setFilterAnchorEl(null);
  };

  const handleSearchChange = (search: string) => {
    if (search === '' || search.length <= 2) {
      delete query.like;
      setQuery({ ...query, pageNumber: 1 });
      return;
    }

    setQuery({ ...query, pageNumber: 1, like: search });
  };

  const handleSortDirectionChange = (newDirection: number) => {
    if (newDirection === sortDirection || newDirection === 0) {
      delete query.sortOrder;
      setQuery({ ...query, pageNumber: 1 });
      setSortDirection(0);
    } else {
      setQuery({ ...query, pageNumber: 1, sortOrder: newDirection });
      setSortDirection(newDirection);
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClickAddBtn = () => {
    if (type === 'Notification') {
      navigate(`/add-notification/${parentId}`);

      return;
    }

    setDialogProps({ ...dialogProps, open: true });
  };

  const renderToolbarOptions = () => (
    <ToolbarOptions
      type={type}
      setSortAnchorEl={setSortAnchorEl}
      sortOptions={sortOptions}
      selectedSortOption={selectedSortOption}
      sortDirection={sortDirection}
      onClickAddBtn={handleClickAddBtn}
      onSearchChange={handleSearchChange}
      setFilterAnchorEl={setFilterAnchorEl}
      filterOptions={filterOptions}
      selectedFilterOption={selectedFilterOption}
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
      <MenuItem disableRipple disableTouchRipple>
        {renderToolbarOptions()}
      </MenuItem>
    </Menu>
  );

  const openSort = Boolean(sortAnchorEl);
  const openFilter = Boolean(filterAnchorEl);

  let parentText = '';
  if (type === 'Event') {
    if (!parentName) return null;
    parentText =
      'App: ' + parentName?.slice(0, 20).trim() + (parentName?.length > 20 ? '...' : '') + ', ';
  } else if (type === 'Notification') {
    parentText = 'Event: ' + parentName + ', ';
  }

  const handleDialogSubmit = (success: boolean) => {
    if (!success) return;

    // close dialog on successful submit
    setDialogProps({ ...dialogProps, open: false });
  };

  return (
    <>
      <Dialog
        {...dialogProps}
        operation={{
          type: 'Add',
          addHook,
          parentId,
        }}
        options={{
          onSuccess: () => handleDialogSubmit(true),
          onError: () => handleDialogSubmit(false),
          onClose: () => setDialogProps({ ...dialogProps, open: false }), // just close the dialog
        }}
      />

      <Toolbar
        variant='dense'
        sx={{
          mt: 4,
          background: '#FFFFFF',
          borderRadius: '5px',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.04)',
          color: 'black',
          alignItems: 'center',
          py: 1,
        }}
      >
        <Typography
          component='div'
          variant='h6'
          sx={{
            flex: 1,
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {type === 'App' ? 'Applications' : `${type}s`}

          <Typography
            variant='body2'
            sx={{
              fontSize: '13px',
              display: { md: 'inline', sm: 'none', xs: 'none' },
              mx: 1,
            }}
          >
            ({parentText}Total: {totalCount || 0})
          </Typography>
        </Typography>
        <IconButton onClick={handleMobileMenuOpen} sx={{ display: { sm: 'none' } }}>
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

      <PopoverMenu
        open={openSort}
        anchorEl={sortAnchorEl}
        onClose={handleCloseSort}
        options={sortOptions}
        selectedOption={selectedSortOption || ''}
        direction={sortDirection}
        handleOptionChange={handleSortChange}
        handleDirectionChange={handleSortDirectionChange}
      />

      <PopoverMenu
        open={openFilter}
        anchorEl={filterAnchorEl}
        onClose={handleCloseFilter}
        options={filterOptions}
        selectedOption={selectedFilterOption || ''}
        handleOptionChange={handleFilterChange}
      />
    </>
  );
}
