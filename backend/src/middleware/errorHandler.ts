import { Request, Response, NextFunction } from 'express';
import HTTPStatusCode from '../config/httpStatusCode';
import { RequestError } from '../utility/errorClass';

const errorHandler = (
  err: RequestError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof RequestError) {
    return res.status(err.HttpStatusCode).json(err.toJSON());
  }

  return res
    .status(HTTPStatusCode.InternalServerError)
    .json({ message: (<Error>err).message });
};

export default errorHandler;
