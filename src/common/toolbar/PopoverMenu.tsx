import {
  Box,
  Button,
  Popover,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

interface PopoverMenuProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  options: { label: string; value: string }[];
  selectedOption: string;
  handleOptionChange: (value: string) => void;
  direction?: number;
  handleDirectionChange?: (newDirection: number) => void;
}

function PopoverMenu({
  open,
  anchorEl,
  onClose,
  options,
  selectedOption,
  handleOptionChange,
  direction,
  handleDirectionChange,
}: PopoverMenuProps) {
  const toggleButtons = [
    { value: 1, label: 'ASC' },
    { value: -1, label: 'DESC' },
  ];

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
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
        {direction && handleDirectionChange && (
          <Box display='flex' alignItems='center' sx={{ marginBottom: '8px' }}>
            <ToggleButtonGroup
              value={direction}
              exclusive
              onChange={(event, newDirection) =>
                handleDirectionChange && handleDirectionChange(newDirection)
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
        )}

        {options.map((option) => (
          <Button
            sx={{ display: 'block', width: '100%', textAlign: 'left' }}
            key={option.value}
            onClick={() => handleOptionChange(option.value)}
            variant={selectedOption === option.value ? 'contained' : 'text'}
          >
            {option.label}
          </Button>
        ))}
      </Box>
    </Popover>
  );
}

export default PopoverMenu;
