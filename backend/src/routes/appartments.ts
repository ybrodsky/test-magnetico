import { Request, Response, NextFunction, Router } from 'express';
import * as createError from 'http-errors';
import models from './../models';
import { createValidator } from './../validators/appartment';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    await createValidator(body);

    const created = await models.Appartment.create(body);

    return res.send(created);
  } catch (err) {
    return next(err);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await createValidator(body);

    const appartment = await models.Appartment.findById(id);

    if (!appartment) {
      throw createError(404, 'Not found');
    }

    const updated = await appartment.update(body);

    return res.send(updated);
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    const { id } = req.params;

    const appartment = await models.Appartment.findById(id, { raw: true });

    if (!appartment) {
      throw createError(404, 'Not found');
    }

    const rents = await models.Rent.count({
      where: {
        appartment_id: id,
        user_id: user.id,
      },
    });

    return res.send({
      userHasDiscount: rents > 0,
      ...appartment,
    });
  } catch (err) {
    return next(err);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const appartments = await models.Appartment.findAll({
      order: [['id', 'DESC']],
      limit: 100,
    });

    return res.send(appartments);
  } catch (err) {
    return next(err);
  }
});

export default router;
