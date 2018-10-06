import 'mocha';
import { expect } from 'chai';
import * as moment from 'moment';
import * as validator from '../../validators/rent';

describe('Rent validator', () => {
  it('Valid should pass', () => {
    validator.createValidator({
      appartment_id: 1,
      checkin: moment().add(10, 'days').format('YYYY-MM-DD'),
      checkout: moment().add(15, 'days').format('YYYY-MM-DD'),
    });
  });

  it('Missing attributes should throw error', () => {
    try {
      validator.createValidator({});
    } catch (err) {
      expect(err.errors).eql({
        appartment_id: '"appartment_id" is required',
        checkin: '"checkin" is required',
        checkout: '"checkout" is required',
      });
      return;
    }
    throw new Error('Should have thrown error');
  });

  it('Wrong types should throw error', () => {
    try {
      validator.createValidator({
        appartment_id: 'a',
        checkin: 'dsa',
        checkout: 'dsa',
      });
    } catch (err) {
      expect(err.errors).eql({
        appartment_id: '"appartment_id" must be a number',
        checkin: '"checkin" must be a valid ISO 8601 date',
        checkout: '"checkout" must be a valid ISO 8601 date',
      });
      return;
    }
    throw new Error('Should have thrown error');
  });
});
