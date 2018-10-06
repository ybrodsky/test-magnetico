import * as Joi from 'joi';
import validate from './index';

const createSchema = Joi.object().keys({
  appartment_id: Joi.number().integer().required(),
  checkin: Joi.date().iso().min('now').required(),
  checkout: Joi.date().iso().min(Joi.ref('checkin')).required(),
});

export const createValidator = data => validate(data, createSchema);
