import DB from '../database';
import type {
  User,
  UserModel,
  UserResponse,
} from '../database/models/users.model';
import { isEmpty } from '../utility/common';
import { RequestError } from '../utility/errorClass';
import bcrypt from 'bcrypt';

class UserService {
  public users = DB.Users;

  public userMapper(userModel: UserModel): UserResponse {
    const { password, ...user } = userModel.toJSON();
    return user;
  }

  public async findAllUsers(): Promise<UserResponse[]> {
    const allUser = await this.users.findAll();
    return allUser.map(this.userMapper);
  }

  public async findUserById(userId: number): Promise<UserResponse> {
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

    return this.userMapper(findUser);
  }

  public async createUser(userData: User): Promise<UserResponse> {
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

    return this.userMapper(createUserData);
  }

  public async updateUser(
    userId: number,
    userData: Partial<User>
  ): Promise<UserResponse> {
    if (isEmpty(userData)) {
      throw new RequestError({
        status: 400,
        message: 'data recibida esta vacía',
        code: 'USER_PAYLOAD_EMPTY',
      });
    }

    const findUser = await this.findUserById(userId);

    if (userData.password) {
      userData.password = bcrypt.hashSync(
        userData.password,
        bcrypt.genSaltSync(10)
      );
    }

    const [countRowsEdited, rowsEdited] = await this.users.update(
      { ...userData },
      { where: { id: findUser.id }, returning: true }
    );

    const [updatedUserData] = rowsEdited;

    return this.userMapper(updatedUserData);
  }

  public async deleteUser(userId: number): Promise<UserResponse> {
    const findUser = await this.findUserById(userId);

    await this.users.destroy({ where: { id: findUser.id }, cascade: true });

    return findUser;
  }
}

export default new UserService();
