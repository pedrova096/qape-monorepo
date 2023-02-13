import type { User, UserResponse } from '../database/models/users.model';
import { isEmpty } from '../utility/common';
import { RequestError } from '../utility/errorClass';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UsersService from './users.service';

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

  public createToken(user: User): string {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey = 'secret';
    const expiresIn = 60 * 60;

    return jwt.sign(dataStoredInToken, secretKey, { expiresIn });
  }
}

export default new AuthService();
