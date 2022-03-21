import { Alert, AlertTitle, Button, TextField } from '@mui/material';
import React from 'react';
import { useSignIn } from './hooks';

export const SignInForm = () => {
  const {
    form: {
      register,
      formState: { errors },
    },
    handleSubmit,
    error,
    isLoading,
    clearError,
  } = useSignIn();

  React.useEffect(() => {
    return () => {
      clearError();
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
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
