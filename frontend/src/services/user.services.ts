import { apiService } from './api';

export type UserResponse = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export const getUserById = (userId: number) => {
  return apiService.get<UserResponse>({
    endpoint: `users/${userId}`,
  });
};
