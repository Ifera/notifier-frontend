import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';

interface FilterProps {
  filterOptions: { label: string; value: string }[];
  selectedFilterOption: string;
  setFilterAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

function Filter({ filterOptions, selectedFilterOption, setFilterAnchorEl }: FilterProps) {
  const selectedOptionLabel = selectedFilterOption
    ? filterOptions.find((option) => option.value === selectedFilterOption)?.label
    : 'All';

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  return (
    <Tooltip title={`Filter`}>
      <Box
        sx={{
          backgroundColor: '#0060B9',
          color: 'white',
          borderRadius: 3,
          mr: 1,
        }}
      >
        <IconButton onClick={handleFilterClick} sx={{ borderRadius: 2, color: 'white', px: 1 }}>
          <FilterListIcon />
          <Typography sx={{ display: { xs: 'none', sm: 'block', color: 'white' } }} ml={1}>
            {selectedOptionLabel}
          </Typography>
        </IconButton>
      </Box>
    </Tooltip>
  );
}

export default Filter;
