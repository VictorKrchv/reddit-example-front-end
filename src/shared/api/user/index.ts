import { httpClient } from '@api/http-client';
import { User } from '@entities/session';
import { Tokens } from '@lib/token';

export interface RegisterUserBody {
  email: string;
  password: string;
}

const registerUser = (body: RegisterUserBody): Promise<Tokens> => {
  return httpClient.post(`users/register`, body);
};

interface CheckEmailForRegistrationResponse {
  noValid: boolean;
  exists: boolean;
}

const checkEmailFormRegistration = (
  email: string,
): Promise<CheckEmailForRegistrationResponse> => {
  return httpClient.get(`users/email/single?email=${email}`);
};

const getCurrentUser = (): Promise<User> => {
  return httpClient.get(`users/me`);
};

export interface UpdateUserPasswordBody {
  oldPassword: string;
  newPassword: string;
}

const changeUserPassword = (body: UpdateUserPasswordBody): Promise<boolean> => {
  return httpClient.post('users/update-password', body);
};

interface SendResetPasswordLinkBody {
  callbackUrl: string;
  email: string;
}

const sendResetPasswordLink = (
  body: SendResetPasswordLinkBody,
): Promise<boolean> => {
  return httpClient.post('users/reset-password/links', body);
};

interface ResetPasswordBody {
  code: string;
  newPassword: string;
}

const resetPassword = (body: ResetPasswordBody): Promise<boolean> => {
  return httpClient.post('users/reset-password', body);
};

export const userApi = {
  registerUser,
  getCurrentUser,
  checkEmailFormRegistration,
  changeUserPassword,
  sendResetPasswordLink,
  resetPassword,
};
