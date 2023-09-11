import {
  ArrowDownward,
  ArrowUpward,
  Sort as SortIcon,
} from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';

interface SortProps {
  sortOptions: { label: string; value: string }[];
  selectedSortOption: string;
  sortDirection: string;
  handleSortClick: (event: React.MouseEvent<HTMLElement>) => void;
}

function Sort({
  sortOptions,
  selectedSortOption,
  sortDirection,
  handleSortClick,
}: SortProps) {
  const selectedOptionLabel = selectedSortOption
    ? sortOptions.find((option) => option.value === selectedSortOption)?.label
    : 'Sort By';

  const directionIcon =
    sortDirection === 'asc' ? (
      <ArrowUpward sx={{ fontSize: '1rem' }} />
    ) : (
      <ArrowDownward sx={{ fontSize: '1rem' }} />
    );

  return (
    <IconButton onClick={handleSortClick}>
      <SortIcon />
      <Typography p={1} sx={{ display: { xs: 'none', sm: 'block' } }}>
        {selectedOptionLabel} {directionIcon}
      </Typography>
    </IconButton>
  );
}

export default Sort;
