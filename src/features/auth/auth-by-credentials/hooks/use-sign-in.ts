import { authApi, LoginCredentials } from '@api';
import { useAppDispatch } from '@app/store';
import { setIsAuthorized } from '@entities/session';
import { yupResolver } from '@hookform/resolvers/yup';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '@lib/constants';
import { Tokens, TokenStorage } from '@lib/token';
import { Token } from '@mui/icons-material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(MIN_PASSWORD_LENGTH)
    .max(MAX_PASSWORD_LENGTH),
});

export const useSignIn = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = React.useState('');

  const loginMutation = useMutation<Tokens, ApiError, LoginCredentials>(
    authApi.loginByCredentials,
    {
      onSuccess: (data) => {
        TokenStorage.storeToken(data);
        dispatch(setIsAuthorized(true));
      },
      onError: (error) => {
        setError(error.message);
      },
    },
  );

  const form = useForm<LoginCredentials>({
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = form.handleSubmit((values: LoginCredentials) => {
    loginMutation.mutate(values);
  });

  const clearError = () => {
    setError('');
  };

  return {
    error,
    isLoading: loginMutation.isLoading,
    handleSubmit,
    form,
    clearError,
  };
};
