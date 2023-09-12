import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

const SearchWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  background: '#F5FAFF',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid #98CDFF',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
  margin: theme.spacing(0, 2),
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
        width: '10ch',
      },
    },
  },
}));

interface SearchBarProps {
  onSearchChange: (value: string) => void;
}

function SearchBar({ onSearchChange }: SearchBarProps) {
  return (
    <SearchWrapper>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </SearchWrapper>
  );
}

export default SearchBar;
