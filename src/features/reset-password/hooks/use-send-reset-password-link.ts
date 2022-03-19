import { userApi } from '@api';
import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const CALLBACK_URL = window.origin;
const PARAM_CODE = 'forgotCode';

interface FormValues {
  email: string;
}

const validationSchema = yup.object().shape({
  email: yup.string().required().email(),
});

export const useSendResetPasswordLink = ({
  onSendLink,
}: {
  onSendLink: () => void;
}) => {
  const form = useForm<FormValues>({ resolver: yupResolver(validationSchema) });

  const sendLink = React.useCallback(
    (email: string) =>
      userApi.sendResetPasswordLink({ callbackUrl: CALLBACK_URL, email }),
    [],
  );

  const handleSubmit = form.handleSubmit(async ({ email }: FormValues) => {
    const isSend = await sendLink(email);
    isSend && onSendLink();
  });

  return {
    form,
    handleSubmit,
    onSendLink,
  };
};
