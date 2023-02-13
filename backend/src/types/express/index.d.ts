import type { UserResponse } from '../../database/models/users.model';

declare global {
  namespace Express {
    export interface Request {
      user: UserResponse;
    }
  }
}
