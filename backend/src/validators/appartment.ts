import * as Joi from 'joi';
import validate from './index';

const createSchema = Joi.object().keys({
  location: Joi.string().required(),
  size: Joi.number().integer().required(),
  night: Joi.number().required().min(1),
  month: Joi.number().required().min(1),
});

export const createValidator = data => validate(data, createSchema);
