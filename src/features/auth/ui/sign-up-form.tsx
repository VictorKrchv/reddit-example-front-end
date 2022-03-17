import { RegisterUserBody, userApi } from '@api/user';
import { useAppDispatch } from '@app/store';
import { registerUserThunk } from '@features/auth';
import { Alert, AlertTitle, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { clearRegistrationError } from '../authSlice';
import React from 'react';

interface FormValues extends RegisterUserBody {
  passwordConfirmation: string;
}

const validationSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(32),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const SignupForm = () => {
  const dispatch = useAppDispatch();
  const error = useSelector((state) => state.auth.registration.error);
  const isLoading = useSelector((state) => state.auth.registration.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(validationSchema) });

  const onSubmit = (values: FormValues) => {
    dispatch(registerUserThunk(values));
  };

  React.useEffect(() => {
    return () => {
      dispatch(clearRegistrationError());
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

      <Button
        disabled={isLoading}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>
    </form>
  );
};
