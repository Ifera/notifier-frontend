import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, IconButton, Typography } from '@mui/material';

interface FilterProps {
  filterOptions: { label: string; value: string }[];
  selectedFilterOption: string;
  setFilterAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

function Filter({
  filterOptions,
  selectedFilterOption,
  setFilterAnchorEl,
}: FilterProps) {
  const selectedOptionLabel = selectedFilterOption
    ? filterOptions.find((option) => option.value === selectedFilterOption)
        ?.label
    : 'All';

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(152, 205, 255, 0.25)',
        borderRadius: 3,
        mr: 2,
      }}
    >
      <IconButton onClick={handleFilterClick} sx={{ borderRadius: 2 }}>
        <FilterListIcon />
        <Typography sx={{ display: { xs: 'none', sm: 'block' } }} ml={1}>
          {selectedOptionLabel}
        </Typography>
      </IconButton>
    </Box>
  );
}

export default Filter;
