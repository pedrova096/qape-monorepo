import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import HTTPStatusCode from '../config/httpStatusCode';
import authService, { DataStoredInToken } from '../service/auth.service';
import { RequestError } from '../utility/errorClass';

const authJWT: RequestHandler = async (req, res, next) => {
  try {
    const authorization =
      (req.cookies && req.cookies['Authorization']) ||
      (req.header('Authorization')
        ? req.header('Authorization')!.split('Bearer ')[1]
        : null);

    if (authorization) {
      const secretKey = 'secret';
      const verificationResponse = jwt.verify(
        authorization,
        secretKey
      ) as DataStoredInToken;
      const userId = verificationResponse.id;
      const findUser = await authService.findUserById(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(
          new RequestError({
            status: HTTPStatusCode.Unauthorized,
            message: 'Error en el token de autorización',
            code: 'USER_NOT_FOUND',
          })
        );
      }
    } else {
      next(
        new RequestError({
          status: HTTPStatusCode.NotFound,
          message: 'Token de autorización faltante',
          code: 'MISSING_AUTH_HEADER',
        })
      );
    }
  } catch (error) {
    console.log({ error });
    next(
      new RequestError({
        status: HTTPStatusCode.Unauthorized,
        message: 'Error en el token de autorización',
        code: 'INVALID_JWT_TOKEN',
      })
    );
  }
};

export default authJWT;
