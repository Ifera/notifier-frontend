import {
  ArrowDownward,
  ArrowUpward,
  Sort as SortIcon,
} from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';

interface SortProps {
  sortOptions: { label: string; value: string }[];
  selectedSortOption: string;
  sortDirection: number;
  setSortAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

function Sort({
  sortOptions,
  selectedSortOption,
  sortDirection,
  setSortAnchorEl,
}: SortProps) {
  const selectedOptionLabel = selectedSortOption
    ? sortOptions.find((option) => option.value === selectedSortOption)?.label
    : 'Name';

  const directionIcon =
    sortDirection === 1 ? (
      <ArrowUpward sx={{ fontSize: '1rem' }} />
    ) : (
      <ArrowDownward sx={{ fontSize: '1rem' }} />
    );

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  return (
    <IconButton onClick={handleSortClick} sx={{ borderRadius: 2 }}>
      <SortIcon />
      <Typography sx={{ display: { xs: 'none', sm: 'block' } }} ml={1}>
        {selectedOptionLabel} {directionIcon}
      </Typography>
    </IconButton>
  );
}

export default Sort;
