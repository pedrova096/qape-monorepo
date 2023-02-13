import { Model, Sequelize, DataTypes } from 'sequelize';
import { UserModel } from './users.model';

export type Item = {
  id: number;
  type: 'earphones' | 'headphones' | 'speakers';
  brand: string;
  model: string;
  price: number;
  description: string;
  hasLeft: boolean;
  hasRight: boolean;
  hasCharger: boolean;
  isNew: boolean;
  userId: number;
  // status: Available, Sold, Reserved, Deleted
  status: 'AVL' | 'SLD' | 'RSV' | 'DEL';
};

export type ItemResponse = Item;

export class ItemModel extends Model<Item> {
  public id!: number;
  public type!: Item['type'];
  public brand!: string;
  public model!: string;
  public price!: number;
  public description!: string;
  public hasLeft!: boolean;
  public hasRight!: boolean;
  public hasCharger!: boolean;
  public isNew!: boolean;
  public userId!: number;
  public status!: Item['status'];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize) {
  ItemModel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['earphones', 'headphones', 'speakers']],
            msg: 'El tipo debe ser uno de los siguientes: earphones, headphones, speakers',
          },
        },
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: 'El precio debe ser mayor a 0',
          },
        },
      },
      description: {
        type: DataTypes.STRING,
      },
      hasLeft: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      hasRight: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      hasCharger: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isNew: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: UserModel,
          key: 'id',
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'AVL',
        validate: {
          isIn: {
            args: [['AVL', 'SLD', 'RSV', 'DEL']],
            msg: 'El estado debe ser uno de los siguientes: AVL, SLD, RSV, DEL',
          },
        },
      },
    },
    {
      tableName: 'items',
      sequelize,
    }
  );

  ItemModel.belongsTo(UserModel, { foreignKey: 'userId' });

  return ItemModel;
}
