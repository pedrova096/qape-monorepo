import { RequestHandler } from 'express';
import usersService from '../service/users.service';

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const newUser = req.body;

    const result = await usersService.createUser(newUser);

    res.json({ created: result });
  } catch (error) {
    next(error);
  }
};

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const result = await usersService.findAllUsers();

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getUserById: RequestHandler = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);

    const user = await usersService.findUserById(userId);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserById: RequestHandler = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;

    const user = await usersService.updateUser(userId, userData);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUserById: RequestHandler = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);

    const user = await usersService.deleteUser(userId);

    res.json({ deleted: user });
  } catch (error) {
    next(error);
  }
};
