import * as createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import models from './../models';

const SECRET = config.get('jwtSecret');

export default async function (req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = req;
    const user = await models.User.findOne({
      where: { username: body.username },
      raw: true,
    });

    if (!user) {
      return next(createError(400, 'Wrong username'));
    }

    const token = jwt.sign({
      id: user.id,
      username: user.username,
    }, SECRET, {
      expiresIn: 604800,
    });

    return res.send({ ...user, token });
  } catch (err) {
    return next(err);
  }
}
