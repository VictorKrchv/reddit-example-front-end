import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { RegisterUserBody, userApi } from '@api/user';
import { useAppDispatch } from '@app/store';
import { setIsAuthorized } from '@entities/session';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '@lib/constants';
import { Tokens, TokenStorage } from '@lib/token';

interface FormValues extends RegisterUserBody {
  passwordConfirmation: string;
}

const validationSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(MIN_PASSWORD_LENGTH)
    .max(MAX_PASSWORD_LENGTH),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const useSignUp = () => {
  const dispatch = useAppDispatch();

  const [error, setError] = React.useState('');

  const mutation = useMutation<Tokens, ApiError, RegisterUserBody>(
    userApi.registerUser,
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

  const form = useForm<FormValues>({ resolver: yupResolver(validationSchema) });

  const handleSubmit = form.handleSubmit((values: FormValues) => {
    mutation.mutate(values);
  });

  const clearError = () => {
    setError('');
  };

  return {
    error,
    isLoading: mutation.isLoading,
    form,
    handleSubmit,
    clearError,
  };
};
