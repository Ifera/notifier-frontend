import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  text?: string;
  onClose?: () => void;
  onSubmit: () => void;
}

const ConfirmDialog = ({ open, title, text, onClose, onSubmit }: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
      <DialogTitle>
        <Box display='flex' alignItems='center'>
          <Box flexGrow={1}>
            <Typography variant='h6'>{title || 'Confirm'}</Typography>
          </Box>
          <Box>
            <IconButton onClick={onClose} edge='end'>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant='body1' sx={{ mb: 2 }}>
          {text || 'Are you sure you want to continue?'}
        </Typography>
        <Box display='flex' justifyContent='flex-end' sx={{ mt: 6 }}>
          <Button variant='contained' color='primary' onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant='contained' color='error' onClick={onSubmit}>
            Continue
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
