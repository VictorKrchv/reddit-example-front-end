import { SignInForm } from '@features/auth/auth-by-credentials';
import { SendResetPasswordEmailModal } from '@features/reset-password';
import { useDisclosure } from '@lib/hooks';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Grid, Link, Paper, Typography } from '@mui/material';
import { paths } from '@pages/paths';
import { NavLink } from 'react-router-dom';

export const SignInPage = () => {
  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1, maxWidth: 600, width: '100%' }}>
          <SignInForm />
          <Grid container>
            <Grid item xs>
              <ResetPasswordLink />
            </Grid>
            <Grid item>
              <Link component={NavLink} to={paths.signUp()} variant="body2">
                Dont have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

const ResetPasswordLink = () => {
  const { isOpen, open, close } = useDisclosure();

  return (
    <>
      <SendResetPasswordEmailModal open={isOpen} onClose={close} />
      <Link onClick={open} variant="body2" sx={{ cursor: 'pointer' }}>
        Forgot your password?
      </Link>
    </>
  );
};
