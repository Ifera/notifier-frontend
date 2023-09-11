import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import SearchBar from './SearchBar';
import Sort from './Sort';

interface ToolbarOptionsProps {
  sortOptions: { label: string; value: string }[];
  selectedSortOption: string | null;
  sortDirection: string;
  handleSortClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleAddNew: () => void;
}

const ToolbarOptions = ({
  sortOptions,
  selectedSortOption,
  sortDirection,
  handleSortClick,
  handleAddNew,
}: ToolbarOptionsProps) => {
  return (
    <>
      <SearchBar />
      <Sort
        sortOptions={sortOptions}
        selectedSortOption={selectedSortOption || ''}
        sortDirection={sortDirection}
        handleSortClick={handleSortClick}
      />
      <IconButton onClick={handleAddNew}>
        <AddCircleRoundedIcon sx={{ color: 'primary' }} />
      </IconButton>
    </>
  );
};

export default ToolbarOptions;
