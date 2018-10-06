import * as config from 'config';
import * as faker from 'faker';
import * as _ from 'lodash';
import * as moment from 'moment';
import models from './../models';
import * as nock from 'nock';

export function authSuccess(times = 1, role = 'admin'): any {
  nock.cleanAll();

  return nock(config.get('auth'))
    .get('')
    .times(times)
    .reply(200, JSON.stringify({
      id: 1,
      role_id: 1,
      name: 'Yael',
      surname: 'Brodsky',
      username: 'brodskyy88',
      email: 'brodskyy88@gmail.com',
      hotels_profile_id: '8',
      packages_profile_id: '5a4fcaf1f4e792014793f1ba',
      activities_profile_id: '1',
      flights_profile_id: '0',
      active: true,
      Role: {
        id: 1,
        name: 'Admin',
        slug: role,
      },
    }));
}

export function authFailure(times = 1): any {
  nock.cleanAll();

  return nock(config.get('auth'))
    .get('')
    .times(times)
    .reply(401);
}

export function getPaymentData() {
  return {
    process_date: moment().toISOString(),
    cards: [{
      index: 1,
      holder: 'Pepe Argento',
      number: '4545454545454545',
      month: '10',
      year: '19',
      code: '010',
      Card: {
        id: 1,
        name: 'Visa',
      },
      Bank: {
        id: 2,
        name: 'Patagonia',
      },
    }],
    items: [{
      merchant_id: '1231',
      gateway: 'payments',
      installments: 12,
      installmentCoefficient: 1.01,
      amount: 100,
      amount_convert: 1500,
      currency: 'USD',
      currency_payment: 'ARS',
      exchange_type: 'amadeus',
      _searchHash: '32123',
      card_index: 1,
      pnr_info: {
        reservation: {
          companyId: '1A',
          controlNumber: 'SCLCQ3',
          date: '090218',
          time: '2205',
        },
      },
    }],
  };
}

export function createPayment(data: any = {}): Promise<any> {
  const defaults = {
    user_id: 1,
    payload: getPaymentData(),
  };

  return models.Payment.create(_.extend(defaults, data));
}
