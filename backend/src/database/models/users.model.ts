import { Model, Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type UserResponse = Omit<User, 'password'>;

export class UserModel extends Model<User> {
  public id!: number;
  public email!: string;
  public name!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize) {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(128),
        validate: {
          len: {
            args: [6, 128],
            msg: 'Email debe tener de 6 a 128 caracteres de longitud',
          },
          isEmail: {
            msg: 'Email debe ser valido',
          },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          len: [6, 100],
        },
      },
    },
    {
      tableName: 'users',
      sequelize,
    }
  );

  UserModel.beforeSave((user) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    }
  });

  return UserModel;
}
