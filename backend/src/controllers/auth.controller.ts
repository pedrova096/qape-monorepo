import { RequestHandler } from 'express';

import authService from '../service/auth.service';

export const signIn: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.signIn(req.body);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const signUp: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.signUp(req.body);

    res.json(result);
  } catch (err) {
    next(err);
  }
};
