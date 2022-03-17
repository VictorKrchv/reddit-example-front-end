import { httpClient } from '@api/http-client';
import { User } from '@features/auth';
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

export const userApi = {
  registerUser,
  getCurrentUser,
  checkEmailFormRegistration,
};
