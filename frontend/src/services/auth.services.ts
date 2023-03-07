import { apiService } from './api';

export type SignUpData = {
  name: string;
  email: string;
  password: string;
};

export const signUp = (data: SignUpData) => {
  return apiService.post({
    endpoint: 'auth/sign-up',
    data,
  });
};

export type SignInData = {
  email: string;
  password: string;
};

export type SignInResponse = {
  token: string | null;
  user?: {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
};

export const signIn = (data: SignInData) => {
  return apiService.post<SignInResponse>({
    endpoint: 'auth/sign-in',
    data,
  });
};
