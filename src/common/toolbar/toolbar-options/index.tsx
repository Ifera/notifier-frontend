import AddCircleIcon from '@mui/icons-material/AddCircleRounded';
import { Box, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Filter from './FIlter';
import SearchBar from './SearchBar';
import Sort from './Sort';

interface ToolbarOptionsProps {
  type: string;
  setSortAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  sortOptions: { label: string; value: string }[];
  selectedSortOption: string | null;
  sortDirection: number;
  setFilterAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  filterOptions: { label: string; value: string }[];
  selectedFilterOption: string | null;

  onClickAddBtn: () => void;
  onSearchChange: (value: string) => void;
}

const ToolbarOptions = ({
  type,
  setSortAnchorEl,
  sortOptions,
  selectedSortOption,
  sortDirection,
  setFilterAnchorEl,
  filterOptions,
  selectedFilterOption,
  onClickAddBtn,
  onSearchChange,
}: ToolbarOptionsProps) => {
  return (
    <>
      <SearchBar onSearchChange={onSearchChange} />

      <Filter
        filterOptions={filterOptions}
        selectedFilterOption={selectedFilterOption || ''}
        setFilterAnchorEl={setFilterAnchorEl}
      />

      <Sort
        sortOptions={sortOptions}
        selectedSortOption={selectedSortOption || ''}
        sortDirection={sortDirection}
        setSortAnchorEl={setSortAnchorEl}
      />

      <Tooltip title={`Add new ${type}`}>
        <Box
          sx={{
            backgroundColor: '#0060B9',
            color: 'white',
            borderRadius: 3,
          }}
        >
          <IconButton
            onClick={onClickAddBtn}
            color='primary'
            sx={{ borderRadius: 2, color: 'white', px: 1 }}
          >
            <AddCircleIcon />
            <Typography sx={{ display: { xs: 'none', sm: 'block', ml: 1 } }} ml={1}>
              Add {type}
            </Typography>
          </IconButton>
        </Box>
      </Tooltip>
    </>
  );
};

export default ToolbarOptions;
