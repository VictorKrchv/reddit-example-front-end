import { LoginCredentials } from '@api';
import { useAppDispatch } from '@app/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '@lib/constants';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

import { clearLoginError, loginByCredentialsThunk } from '../authSlice';

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
  const error = useSelector((state) => state.auth.login.error);
  const isLoading = useSelector((state) => state.auth.login.isLoading);

  const form = useForm<LoginCredentials>({
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = form.handleSubmit((values: LoginCredentials) => {
    dispatch(loginByCredentialsThunk(values));
  });

  const clearError = () => {
    dispatch(clearLoginError());
  };

  return { error, isLoading, handleSubmit, form, clearError };
};
