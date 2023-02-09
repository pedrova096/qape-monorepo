import Sequelize from 'sequelize';
import UserModel from './models/users.model';

const sequelize = new Sequelize.Sequelize('db_uri', {
  timezone: '-03:00',
});

sequelize.authenticate();

const DB = {
  Users: UserModel(sequelize),
  sequelize, // connection instance (RAW queries)
};

export default DB;
