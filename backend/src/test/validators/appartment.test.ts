import 'mocha';
import { expect } from 'chai';
import * as moment from 'moment';
import * as validator from '../../validators/appartment';

describe('Appartment validator', () => {
  it('Valid should pass', () => {
    validator.createValidator({
      location: 'Bs As',
      size: 1,
      night: 100,
      month: 100.50,
    });
  });

  it('Missing attributes should throw error', () => {
    try {
      validator.createValidator({});
    } catch (err) {
      expect(err.errors).eql({
        location: '"location" is required',
        size: '"size" is required',
        night: '"night" is required',
        month: '"month" is required',
      });
      return;
    }
    throw new Error('Should have thrown error');
  });

  it('Wrong types should throw error', () => {
    try {
      validator.createValidator({
        location: true,
        size: null,
        night: 'dsa',
        month: 'dsa',
      });
    } catch (err) {
      expect(err.errors).eql({
        location: '"location" must be a string',
        size: '"size" must be a number',
        night: '"night" must be a number',
        month: '"month" must be a number',
      });
      return;
    }
    throw new Error('Should have thrown error');
  });
});
