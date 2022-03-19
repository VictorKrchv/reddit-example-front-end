import { UpdateUserPasswordBody, userApi } from '@api';
import { yupResolver } from '@hookform/resolvers/yup';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '@lib/constants';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface FormValues extends UpdateUserPasswordBody {
  passwordConfirmation: string;
}

const validationSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required()
    .min(MIN_PASSWORD_LENGTH)
    .max(MAX_PASSWORD_LENGTH),
  newPassword: yup
    .string()
    .required()
    .min(MIN_PASSWORD_LENGTH)
    .max(MAX_PASSWORD_LENGTH),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

export const useUpdateUserPassword = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  const form = useForm<FormValues>({ resolver: yupResolver(validationSchema) });

  const changePassword = React.useCallback(
    async (body: UpdateUserPasswordBody) => {
      userApi
        .changeUserPassword(body)
        .then(onSuccess)
        .catch(({ message }: ApiError) => {
          if (message === 'Invalid old password') {
            form.setError('oldPassword', { message });
          }
          if (message === 'The password must not be the same as the old one.') {
            form.setError('newPassword', { message });
          }
        });
    },
    [],
  );

  const handleSubmit = form.handleSubmit(
    ({ newPassword, oldPassword }: FormValues) => {
      changePassword({ newPassword, oldPassword });
    },
  );

  return { form, handleSubmit };
};
