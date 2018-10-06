import * as createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;
      isAuthenticated?: Function;
    }
  }
}

export default function (req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }

  return next(createError(401, 'You are not logged in'));
}
