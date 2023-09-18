import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EDIT_DIALOG_AUTO_CLOSE_DELAY } from '../../constants';
import useAdd from '../../hooks/useAdd';
import { ID, Query, Service } from '../../interfaces';
import EditDialog, {
  EditDialogProps,
  OnSubmitSuccessProps,
} from '../edit/EditDialog';
import PopoverMenu from './PopoverMenu';
import ToolbarOptions from './toolbar-options/ToolbarOptions';

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
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const [sortDirection, setSortDirection] = useState(1);
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(
    null
  );
  const [selectedFilterOption, setSelectedFilterOption] = useState<
    string | null
  >(null);
  const [dialogProps, setDialogProps] = useState<EditDialogProps>({
    open: false,
    type: type,
    operation: 'Add',
    data: null,
  });

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const addHook = useAdd(service);
  const navigate = useNavigate();

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

  const handleFilterChange = (value: string) => {
    if (selectedFilterOption === value) {
      delete query.isActive;
      setQuery({ ...query, pageNumber: 1 });
      setSelectedFilterOption(null);
    } else {
      query.isActive = value === 'active' ? true : false;
      setQuery({ ...query, pageNumber: 1 });
      setSelectedFilterOption(value);
    }

    setFilterAnchorEl(null);
  };

  const handleCloseFilter = () => {
    setFilterAnchorEl(null);
  };

  const handleSearchChange = (search: string) => {
    if (search === '' || search.length <= 3) {
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

  const handleSubmitSuccess = ({ cleanup }: OnSubmitSuccessProps) => {
    setTimeout(() => {
      handleEditDialogClose();
      cleanup(true);
    }, EDIT_DIALOG_AUTO_CLOSE_DELAY);
  };

  const handleClickAddBtn = () => {
    if (type === 'Notification') {
      navigate(`/add-notification/${parentId}`);

      return;
    }

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
      <MenuItem>{renderToolbarOptions()}</MenuItem>
    </Menu>
  );

  const openSort = Boolean(sortAnchorEl);
  const openFilter = Boolean(filterAnchorEl);

  let parentText = '';
  if (type === 'Event') {
    parentText = 'App: ' + parentName + ', ';
  } else if (type === 'Notification') {
    parentText = 'Event: ' + parentName + ', ';
  }

  return (
    <>
      <EditDialog
        {...dialogProps}
        onClose={handleEditDialogClose}
        addHook={addHook}
        parentId={parentId}
        onSubmitSuccess={handleSubmitSuccess}
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
        <Typography
          component='div'
          variant='h6'
          sx={{ flex: 1, fontSize: '18px' }}
        >
          {type === 'App' ? 'Applications ' : `${type}s `}
          <span style={{ fontSize: '12px' }}>
            ({parentText}Total: {totalCount || 0})
          </span>
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
