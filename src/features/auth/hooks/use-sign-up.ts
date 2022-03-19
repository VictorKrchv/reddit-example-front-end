import { RegisterUserBody } from '@api/user';
import { useAppDispatch } from '@app/store';
import { registerUserThunk } from '@features/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '@lib/constants';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

import { clearRegistrationError } from '../authSlice';

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
  const error = useSelector((state) => state.auth.registration.error);
  const isLoading = useSelector((state) => state.auth.registration.isLoading);

  const form = useForm<FormValues>({ resolver: yupResolver(validationSchema) });

  const handleSubmit = form.handleSubmit((values: FormValues) => {
    dispatch(registerUserThunk(values));
  });

  const clearError = () => dispatch(clearRegistrationError());

  return { error, isLoading, form, handleSubmit, clearError };
};
