import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Popover,
  Radio,
  RadioGroup,
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
        {handleDirectionChange && (
          <Box display='flex' alignItems='center' sx={{ marginBottom: '8px' }}>
            <FormControl>
              <FormLabel component='legend'>
                <b>SORT ORDER</b>
              </FormLabel>
              <RadioGroup
                value={String(direction)}
                onChange={(event) =>
                  handleDirectionChange &&
                  handleDirectionChange(Number(event.target.value))
                }
                onClick={(event) => {
                  if (
                    (event.target as HTMLInputElement).value ===
                    String(direction)
                  ) {
                    handleDirectionChange && handleDirectionChange(0);
                  }
                }}
              >
                <FormControlLabel
                  value='1'
                  control={<Radio />}
                  label='Ascending'
                />
                <FormControlLabel
                  value='-1'
                  control={<Radio />}
                  label='Descending'
                />
              </RadioGroup>
            </FormControl>
          </Box>
        )}

        <FormControl>
          <FormLabel component='legend'>
            {handleDirectionChange ? <b>SORT BY </b> : <b>FILTER BY </b>}
          </FormLabel>

          <RadioGroup
            value={selectedOption}
            onChange={(event) => handleOptionChange(event.target.value)}
            onClick={(event) => {
              if ((event.target as HTMLInputElement).value === selectedOption) {
                handleOptionChange('');
              }
            }}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    </Popover>
  );
}

export default PopoverMenu;
