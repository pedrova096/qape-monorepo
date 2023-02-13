import type { User, UserResponse } from '../database/models/users.model';
import { isEmpty } from '../utility/common';
import { RequestError } from '../utility/errorClass';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UsersService from './users.service';
import { JWT_SECRET } from '../config/environments';

export type DataStoredInToken = {
  id: number;
};

class AuthService {
  public usersService = UsersService;
  public users = this.usersService.users;

  public findUserById(userId: number) {
    return this.usersService.findUserById(userId);
  }

  public async signIn(userData: {
    email: string;
    password: string;
  }): Promise<{ token: string; user: UserResponse }> {
    if (isEmpty(userData)) {
      throw new RequestError({
        status: 400,
        message: 'email o contraseña no es valido',
        code: 'EMAIL_PASSWORD_INVALID',
      });
    }

    const findUser = await this.users.findOne({
      where: { email: userData.email },
    });

    if (!findUser) {
      throw new RequestError({
        status: 400,
        message: 'email o contraseña no es valido',
        code: 'EMAIL_PASSWORD_INVALID',
      });
    }

    const isPasswordMatching = await bcrypt.compare(
      userData.password,
      findUser.password
    );

    if (!isPasswordMatching) {
      throw new RequestError({
        status: 400,
        message: 'email o contraseña no es valido',
        code: 'EMAIL_PASSWORD_INVALID',
      });
    }

    const tokenData = this.createToken(findUser);

    return { token: tokenData, user: this.usersService.userMapper(findUser) };
  }

  public async signUp(userData: User): Promise<UserResponse> {
    const createdUser = await this.usersService.createUser(userData);

    return createdUser;
  }

  public createToken(user: User): string {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const expiresIn = 60 * 60;

    return jwt.sign(dataStoredInToken, JWT_SECRET, { expiresIn });
  }
}

export default new AuthService();
