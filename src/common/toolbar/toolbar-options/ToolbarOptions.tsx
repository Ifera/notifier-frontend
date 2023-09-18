import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import IconButton from '@mui/material/IconButton';
import Filter from './FIlter';
import SearchBar from './SearchBar';
import Sort from './Sort';

interface ToolbarOptionsProps {
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
      <IconButton onClick={onClickAddBtn} color='primary' sx={{ ml: 1 }}>
        <AddCircleRoundedIcon />
      </IconButton>
    </>
  );
};

export default ToolbarOptions;
