import { useDisclosure } from '@lib/hooks';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  DialogContentText,
} from '@mui/material';
import React from 'react';
import { useSendResetPasswordLink } from '../hooks';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const SendResetPasswordEmailModal: React.FC<Props> = ({
  open,
  onClose = () => {},
}) => {
  const {
    isOpen: successAlertIsOpen,
    open: showSuccessAlert,
    close: hideSuccessAlert,
  } = useDisclosure();

  const {
    form: {
      register,
      formState: { errors },
      reset,
    },
    handleSubmit,
  } = useSendResetPasswordLink({
    onSendLink: () => {
      showSuccessAlert();
      onClose();
    },
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
          An email has been sent to your email to reset your password!
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Update your password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tell us email address associated with your Reddit account, and
              we’ll send you an email with a link to reset your password.
            </DialogContentText>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors?.email?.message}
              {...register('email')}
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
