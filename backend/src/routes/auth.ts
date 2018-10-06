import * as createError from 'http-errors';
import { Request, Response, NextFunction, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import models from './../models';
import { loginValidator } from './../validators/user';

const SECRET = config.get('jwtSecret');
const router = Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;

    await loginValidator(body);

    const [user] = await models.User.findOrCreate({
      where: { username: body.username },
      raw: true,
    });

    const token = jwt.sign({
      id: user.id,
      username: user.username,
    }, SECRET, {
      expiresIn: 604800,
    });

    return res.send({
      token,
      id: user.id,
      username: user.username,
    });
  } catch (err) {
    return next(err);
  }
});

router.get('/me', (req: Request, res: Response) => {
  return res.send(req.user);
});

export default router;
