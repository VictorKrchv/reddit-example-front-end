import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { LoginCredentials } from '@api';
import { useAppDispatch } from '@app/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, AlertTitle, Button, TextField } from '@mui/material';

import { clearLoginError, loginByCredentialsThunk } from '../authSlice';

const validationSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(32),
});

export const SignInForm = () => {
  const dispatch = useAppDispatch();
  const error = useSelector((state) => state.auth.login.error);
  const isLoading = useSelector((state) => state.auth.login.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({ resolver: yupResolver(validationSchema) });

  const onSubmit = (values: LoginCredentials) => {
    dispatch(loginByCredentialsThunk(values));
  };

  React.useEffect(() => {
    return () => {
      dispatch(clearLoginError());
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert severity="error">
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
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
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        error={!!errors.password}
        helperText={errors?.password?.message}
        {...register('password')}
      />
      <Button
        disabled={isLoading}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
    </form>
  );
};
