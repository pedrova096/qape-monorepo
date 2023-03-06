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
