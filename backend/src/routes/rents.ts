import { Request, Response, NextFunction, Router } from 'express';
import * as createError from 'http-errors';
import models from './../models';
import { createValidator } from './../validators/rent';
import Rent from './../logic/Rent';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body, user } = req;
    await createValidator(body);

    const appartment = await models.Appartment
      .findById(body.appartment_id, { raw: true });

    if (!appartment) {
      throw createError(400, 'The appartment does not exists');
    }

    const previousRents = await models.Rent.count({
      where: {
        appartment_id: body.appartment_id,
        user_id: user.id,
      },
    });

    const rent = new Rent({
      appartment,
      user,
      data: body,
      userRentedBefore: !!previousRents,
    });
    const data = rent.setSubtotal().setDiscount().getData();

    const created = await models.Rent.create(data);

    return res.send(created);
  } catch (err) {
    return next(err);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    const rents = await models.Rent.findAll({
      where: { user_id: user.id },
      order: [['id', 'DESC']],
      limit: 100,
      raw: true,
    });

    return res.send(rents);
  } catch (err) {
    return next(err);
  }
});

export default router;
