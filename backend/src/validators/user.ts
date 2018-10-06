import * as Joi from 'joi';
import validate from './index';

const loginSchema = Joi.object().keys({
  username: Joi.string().required(),
});

export const loginValidator = data => validate(data, loginSchema);
