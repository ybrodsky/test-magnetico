import * as Joi from 'joi';

class ValidationError extends Error {
  errors: any;
  type: string = 'VALIDATION_ERROR';

  constructor(errors) {
    super('Validation failed');

    this.errors = errors;
  }
}

export default function validate(data, schema) {
  const result = Joi.validate(data, schema, { abortEarly: false });

  if (result.error) {
    const errors = result.error.details.reduce((acc, cur) => {

      const key = cur.path.join('.');

      acc[key] = cur.message;

      return acc;
    }, {});

    throw new ValidationError(errors);
  }
}
