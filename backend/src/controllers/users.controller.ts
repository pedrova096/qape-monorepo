import { RequestHandler } from 'express';

const users: Array<{ name: string; email: string; phoneNumber: number }> = [];

export const createUser: RequestHandler = (req, res) => {
  const newUser = req.body;

  const position = users.push(newUser) - 1;

  res.json({ userIndex: position });
};

export const getUsers: RequestHandler = (req, res) => {
  res.json(users);
};

export const getUserByIndex: RequestHandler = (req, res) => {
  try {
    const userIndex = parseInt(req.params.index);

    const user = users[userIndex];

    if (user) {
      res.json(user);
    } else {
      res.status(400).send('no hay usuario con ese index');
    }
  } catch (error) {
    res.status(500).send('error obteniendo ese usuario');
  }
};
