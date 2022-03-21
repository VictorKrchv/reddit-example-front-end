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
  AlertColor,
} from '@mui/material';
import React from 'react';
import { useResetPassword } from '../hooks';

export const ResetPasswordModal: React.FC = () => {
  const { isOpen, open, close } = useDisclosure();

  const [alert, setAlert] = React.useState<{
    severety: AlertColor;
    message: string;
    isOpen: boolean;
  }>({ severety: 'success', message: '', isOpen: false });

  const { form, handleSubmit, hasCode, getCodeInParams } = useResetPassword({
    onPasswordUpdate: () => {
      setAlert({
        severety: 'success',
        message: 'Password changed successfully',
        isOpen: true,
      });
      close();
    },
    onError: () => {
      setAlert({
        severety: 'error',
        message: 'Something went wrong, please try again',
        isOpen: true,
      });
      close();
    },
  });

  const {
    register,
    formState: { errors },
    reset,
  } = form;

  React.useEffect(() => {
    hasCode && open();
  }, [hasCode]);

  React.useEffect(() => {
    getCodeInParams();
    return () => {
      reset();
    };
  }, []);

  const hideAlert = () => setAlert((alert) => ({ ...alert, isOpen: false }));

  return (
    <>
      <Snackbar
        open={alert.isOpen}
        autoHideDuration={6000}
        onClose={hideAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={hideAlert}
          severity={alert.severety}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      {isOpen && (
        <Dialog open>
          <form onSubmit={handleSubmit}>
            <DialogTitle>Reset your password</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter your new password. The password must be different from the
                old one.
              </DialogContentText>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                error={!!errors.newPassword}
                helperText={errors?.newPassword?.message}
                {...register('newPassword')}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Repeat password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.passwordConfirmation}
                helperText={errors?.passwordConfirmation?.message}
                {...register('passwordConfirmation')}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={close}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </>
  );
};
