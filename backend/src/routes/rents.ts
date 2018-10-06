import { Request, Response, NextFunction, Router } from 'express';
import models from './../models';
import { createValidator } from './../validators/rent';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body, user } = req;
    await createValidator(body);


  } catch (err) {
    return next(err);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    const rents = await models.Appartment.findAll({
      where: { user_id: user.id },
      order: [['id', 'DESC']],
      limit: 100,
    });

    return res.send(rents);
  } catch (err) {
    return next(err);
  }
});

export default router;
