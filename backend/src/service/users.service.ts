import DB from '../database';
import type { User } from '../database/models/users.model';
import { isEmpty } from '../utility/common';
import { RequestError } from '../utility/errorClass';

class UserService {
  public users = DB.Users;

  public async findAllUsers(): Promise<User[]> {
    const allUser: User[] = await this.users.findAll();
    return allUser;
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) {
      throw new RequestError({
        status: 400,
        message: 'UserId no es valido',
        code: 'USER_ID_INVALID',
      });
    }

    const findUser = await this.users.findByPk(userId);

    if (!findUser) {
      throw new RequestError({
        status: 404,
        message: 'User no existe',
        code: 'USER_NOT_EXISTS',
      });
    }

    return findUser.toJSON();
  }

  public async createUser(userData: User): Promise<User> {
    if (isEmpty(userData)) {
      throw new RequestError({
        status: 400,
        message: 'data recibida esta vacía',
        code: 'USER_PAYLOAD_EMPTY',
      });
    }

    const findUser = await this.users.findOne({
      where: { email: userData.email },
    });

    if (findUser) {
      throw new RequestError({
        status: 400,
        message: `El email ${userData.email} ya existe`,
        code: 'USER_EMAIL_ALREADY_EXISTS',
      });
    }

    const createUserData = await this.users.create({
      ...userData,
    });

    return createUserData.toJSON();
  }

  public async updateUser(
    userId: number,
    userData: Partial<User>
  ): Promise<User> {
    if (isEmpty(userData)) {
      throw new RequestError({
        status: 400,
        message: 'data recibida esta vacía',
        code: 'USER_PAYLOAD_EMPTY',
      });
    }

    const findUser = await this.findUserById(userId);

    const [countRowsEdited, rowsEdited] = await this.users.update(
      { ...userData },
      { where: { id: findUser.id }, returning: true }
    );

    const [updatedUserData] = rowsEdited;

    return updatedUserData.toJSON();
  }

  public async deleteUser(userId: number): Promise<User> {
    const findUser = await this.findUserById(userId);

    await this.users.destroy({ where: { id: findUser.id }, cascade: true });

    return findUser;
  }
}

export default new UserService();
