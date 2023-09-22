import SearchIcon from '@mui/icons-material/Search';
import { Button, InputBase, Popover } from '@mui/material';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useState } from 'react';

const SearchWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: 10,
  border: '1px solid #CDCDCD',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
  margin: theme.spacing(0, 1),
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
    padding: theme.spacing(2),
    transition: theme.transitions.create('width'),
    width: '100%',

    [theme.breakpoints.up('xs')]: {
      width: '12ch',
      padding: theme.spacing(1),
      '&:focus': {
        width: '10ch',
      },
    },
  },
}));

interface SearchBarProps {
  onSearchChange: (value: string) => void;
}

function SearchBar({ onSearchChange }: SearchBarProps) {
  const [searchPopoverOpen, setSearchPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery('(max-width:370px)');

  const handleSearchButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setSearchPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setSearchPopoverOpen(false);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <>
      {isMobile ? (
        <Button onClick={handleSearchButtonClick} startIcon={<SearchIcon />}>
          Search
        </Button>
      ) : (
        <SearchWrapper>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder='Search…'
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleSearchInputChange}
          />
        </SearchWrapper>
      )}
      <Popover
        open={searchPopoverOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <StyledInputBase
          placeholder='Search…'
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleSearchInputChange}
        />
      </Popover>
    </>
  );
}

export default SearchBar;
