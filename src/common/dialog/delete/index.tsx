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

interface DeleteDialogProps {
  open: boolean;
  type: string;
  handleClose: () => void;
  handleSubmit: () => void;
  multipleDelete?: boolean;
}

const DeleteDialog = ({
  open,
  type,
  multipleDelete = false,
  handleClose,
  handleSubmit,
}: DeleteDialogProps) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography variant="h6">
              {multipleDelete ? `Delete Multiple ${type}s` : `Delete ${type}`}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={handleClose} edge="end">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {multipleDelete
            ? `Are you sure you want to delete all selected ${type}s?`
            : `Are you sure you want to delete this ${type}?`}
        </Typography>
        <Box display="flex" justifyContent="flex-end" sx={{ mt: 6 }}>
          <Button variant="contained" color="primary" onClick={handleClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleSubmit}>
            Delete
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
