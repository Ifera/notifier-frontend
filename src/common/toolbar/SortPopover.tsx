import {
  Box,
  Button,
  Popover,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

interface SortPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleCloseSort: () => void;
  sortOptions: { label: string; value: string }[];
  sortDirection: string;
  selectedSortOption: string;
  handleSortChange: (value: string) => void;
  handleSortDirectionChange: (newDirection: string) => void;
}

function SortPopover({
  open,
  anchorEl,
  handleCloseSort,
  sortOptions,
  sortDirection,
  selectedSortOption,
  handleSortChange,
  handleSortDirectionChange,
}: SortPopoverProps) {
  const toggleButtons = [
    { value: 'asc', label: 'ASC' },
    { value: 'desc', label: 'DESC' },
  ];

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleCloseSort}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Box p={1}>
        <Box display='flex' alignItems='center' sx={{ marginBottom: '8px' }}>
          <ToggleButtonGroup
            value={sortDirection}
            exclusive
            onChange={(event, newDirection) =>
              handleSortDirectionChange(newDirection)
            }
            size='small'
          >
            {toggleButtons.map((button) => (
              <ToggleButton
                key={button.value}
                value={button.value}
                sx={{ width: '50%' }}
              >
                {button.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {sortOptions.map((option) => (
          <Button
            sx={{ display: 'block', width: '100%', textAlign: 'left' }}
            key={option.value}
            onClick={() => handleSortChange(option.value)}
            variant={selectedSortOption === option.value ? 'contained' : 'text'}
          >
            {option.label}
          </Button>
        ))}
      </Box>
    </Popover>
  );
}

export default SortPopover;
