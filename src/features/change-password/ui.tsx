import { useDisclosure } from '@lib/hooks';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from '@mui/material';
import React from 'react';

import { useUpdateUserPassword } from './hooks';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<Props> = ({
  open,
  onClose = () => {},
}) => {
  const {
    isOpen: successAlertIsOpen,
    open: showSuccessAlert,
    close: hideSuccessAlert,
  } = useDisclosure();

  const onPasswordUpdated = React.useCallback(() => {
    showSuccessAlert();
    onClose();
  }, []);

  const {
    handleSubmit,
    form: {
      register,
      formState: { errors },
      reset,
    },
  } = useUpdateUserPassword({
    onSuccess: onPasswordUpdated,
  });

  React.useEffect(() => {
    return () => {
      reset();
    };
  }, [open]);

  return (
    <>
      <Snackbar
        open={successAlertIsOpen}
        autoHideDuration={6000}
        onClose={hideSuccessAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={hideSuccessAlert}
          severity="success"
          sx={{ width: '100%' }}
        >
          Password updated successfully!
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Update your password</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="normal"
              id="name"
              required
              label="Old password"
              type="password"
              fullWidth
              variant="outlined"
              error={!!errors.oldPassword}
              helperText={errors?.oldPassword?.message}
              {...register('oldPassword')}
            />
            <TextField
              margin="normal"
              id="name"
              required
              label="New password"
              type="password"
              fullWidth
              variant="outlined"
              error={!!errors.newPassword}
              helperText={errors?.newPassword?.message}
              {...register('newPassword')}
            />
            <TextField
              margin="normal"
              id="name"
              required
              label="Confirm new password"
              type="password"
              fullWidth
              variant="outlined"
              error={!!errors.passwordConfirmation}
              helperText={errors?.passwordConfirmation?.message}
              {...register('passwordConfirmation')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
