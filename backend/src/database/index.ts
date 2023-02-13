import Sequelize from 'sequelize';
import UserModel from './models/users.model';
import { POSTGRES_URI } from '../config/environments';

const sequelize = new Sequelize.Sequelize(POSTGRES_URI, {
  timezone: '-03:00',
});

sequelize.authenticate();

const DB = {
  Users: UserModel(sequelize),
  sequelize, // connection instance (RAW queries)
};

export default DB;
