import { ArrowDownward, ArrowUpward, Sort as SortIcon } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';

interface SortProps {
  sortOptions: { label: string; value: string }[];
  selectedSortOption: string;
  sortDirection: number;
  setSortAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

function Sort({ sortOptions, selectedSortOption, sortDirection, setSortAnchorEl }: SortProps) {
  const selectedOptionLabel = selectedSortOption
    ? sortOptions.find((option) => option.value === selectedSortOption)?.label
    : 'Name';

  const directionIcon =
    sortDirection === -1 ? (
      <ArrowDownward sx={{ fontSize: '1rem' }} />
    ) : (
      <ArrowUpward sx={{ fontSize: '1rem' }} />
    );

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  return (
    <Tooltip title={`Sort`}>
      <Box
        sx={{
          backgroundColor: '#0060B9',
          borderRadius: 3,
          mr: 1,
        }}
      >
        <IconButton onClick={handleSortClick} sx={{ borderRadius: 2, color: 'white', px: 1 }}>
          <SortIcon />
          <Typography sx={{ display: { xs: 'none', sm: 'block' } }} ml={1}>
            {selectedOptionLabel} {directionIcon}
          </Typography>
        </IconButton>
      </Box>
    </Tooltip>
  );
}

export default Sort;
