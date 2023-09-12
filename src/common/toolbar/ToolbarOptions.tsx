import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import IconButton from '@mui/material/IconButton';
import SearchBar from './SearchBar';
import Sort from './Sort';

interface ToolbarOptionsProps {
  setSortAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  sortOptions: { label: string; value: string }[];
  selectedSortOption: string | null;
  sortDirection: number;
  onClickAddBtn: () => void;
}

const ToolbarOptions = ({
  setSortAnchorEl,
  sortOptions,
  selectedSortOption,
  sortDirection,
  onClickAddBtn,
}: ToolbarOptionsProps) => {
  return (
    <>
      <SearchBar />
      <Sort
        sortOptions={sortOptions}
        selectedSortOption={selectedSortOption || ''}
        sortDirection={sortDirection}
        setSortAnchorEl={setSortAnchorEl}
      />
      <IconButton onClick={onClickAddBtn}>
        <AddCircleRoundedIcon sx={{ color: 'primary' }} />
      </IconButton>
    </>
  );
};

export default ToolbarOptions;
