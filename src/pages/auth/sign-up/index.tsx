import { SignupForm } from '@features/registration';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Grid, Link, Paper, Typography } from '@mui/material';
import { paths } from '@pages/paths';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

export const SignUpPage = () => {
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
          Sign up
        </Typography>
        <Box sx={{ mt: 1, maxWidth: 600 }}>
          <SignupForm />
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link component={NavLink} to={paths.signIn()} variant="body2">
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};
