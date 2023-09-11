import {
  AddCircleRounded,
  ArrowDownward,
  ArrowUpward,
  SearchIcon,
  SortIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Popover,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  background: '#F5FAFF',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid #98CDFF',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedSortOption, setSelectedSortOption] = useState('');

  const handleSortClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSort = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (value: string) => {
    if (selectedSortOption === value) {
      setSelectedSortOption('');
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
        }}
      >
        <Typography variant='h6' noWrap component='div' sx={{ flex: 1 }}>
          Applications
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder='Search…'
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <IconButton onClick={handleSortClick}>
          <SortIcon />
          <Typography p={1} sx={{ display: { xs: 'none', sm: 'block' } }}>
            {selectedSortOption ? (
              <>
                {
                  sortOptions.find(
                    (option) => option.value === selectedSortOption
                  )?.label
                }{' '}
              </>
            ) : (
              'Sort By'
            )}{' '}
            {sortDirection === 'asc' ? (
              <ArrowUpward fontSize='4' />
            ) : (
              <ArrowDownward fontSize='4' />
            )}
          </Typography>
        </IconButton>
        <IconButton onClick={handleAddNew}>
          <AddCircleRounded sx={{ color: 'primary' }} />
        </IconButton>
      </Toolbar>
      <Popover
        open={openSort}
        anchorEl={anchorEl}
        onClose={handleCloseSort}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box p={1}>
          <Box display='flex' alignItems='center' sx={{ marginBottom: '8px' }}>
            <ToggleButtonGroup
              value={sortDirection}
              exclusive
              onChange={(event, newDirection) =>
                handleSortDirectionChange(newDirection)
              }
              size='small'
            >
              <ToggleButton value='asc' sx={{ width: '50%' }}>
                ASC
              </ToggleButton>
              <ToggleButton value='desc' sx={{ width: '50%' }}>
                DESC
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {sortOptions.map((option) => (
            <Button
              sx={{ display: 'block', width: '100%', textAlign: 'left' }}
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              variant={selectedSortOption === option.value ? 'contained' : ''}
            >
              {option.label}
            </Button>
          ))}
        </Box>
      </Popover>
    </>
  );
}
