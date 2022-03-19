import { userApi } from '@api';
import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '@lib/constants';
import { useHistory, useLocation } from 'react-router-dom';

const PARAM_CODE = 'forgotCode';

interface FormValues {
  newPassword: string;
  passwordConfirmation: string;
}

const validationSchema = yup.object().shape({
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

export const useResetPassword = ({
  onPasswordUpdate,
  onError,
}: {
  onPasswordUpdate: () => void;
  onError: () => void;
}) => {
  const { search } = useLocation();
  const history = useHistory();
  const [code, setCode] = React.useState('');
  const [error, setError] = React.useState('');

  const form = useForm<FormValues>({ resolver: yupResolver(validationSchema) });

  // TODO: вынести в хук/функцию
  const getCodeInParams = React.useCallback(() => {
    const params = new URLSearchParams(search);
    setCode(params.get(PARAM_CODE) ?? '');
    params.delete(PARAM_CODE);
    history.replace({ search: params.toString() });
  }, []);

  const resetPassword = React.useCallback(
    (newPassword: string) => userApi.resetPassword({ code, newPassword }),
    [code],
  );

  const handleSubmit = form.handleSubmit(({ newPassword }: FormValues) => {
    resetPassword(newPassword)
      .then((isSend) => {
        isSend && onPasswordUpdate();
      })
      .catch((e: ApiError) => {
        if (e.message === 'The password must not be the same as the old one.') {
          form.setError('newPassword', { message: e.message });
          return;
        }

        onError();
      });
  });

  const hasCode = !!code;

  return {
    form,
    handleSubmit,
    hasCode,
    getCodeInParams,
    error,
  };
};
