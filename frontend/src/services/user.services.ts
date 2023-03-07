import { apiService } from './api';

export type UserResponse = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateRequest = {
  name: string;
  email: string;
  password?: string;
};

export const getUserById = (userId: number) => {
  return apiService.get<UserResponse>({
    endpoint: `users/${userId}`,
  });
};

export const updateUser = (user: UpdateRequest) => {
  return apiService.patch<UserResponse>({
    endpoint: `users`,
    data: user,
  });
};
