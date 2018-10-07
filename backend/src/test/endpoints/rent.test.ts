import { expect } from 'chai';
import * as _ from 'lodash';
import * as supertest from 'supertest';
import * as config from 'config';
import * as moment from 'moment';

const server = config.get('server');
const request = supertest(`${server.host}:${server.port}`);

describe('Rent endpoints', () => {
  let token;
  let appartment;
  let user;

  before(async () => {
    let res = await request.post('/api/auth/login')
      .send({
        username: 'username6',
      });
    expect(res.status).equal(200);
    token = res.body.token;
    user = res.body;

    res = await request.post('/api/appartments')
      .send({
        location: 'Bs As',
        size: 100,
        night: 1500,
        month: 45000,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).equal(200);
    appartment = res.body;
  });

  it('POST /api/rents should return error when not loggedin', async () => {
    const { status } = await request.post('/api/rents').send({});
    expect(status).equal(401);
  });

  it('GET /api/rents should return error when not loggedin', async () => {
    const { status } = await request.get('/api/rents');
    expect(status).equal(401);
  });

  it('POST /api/rents should return validation error on wrong data', async () => {
    const { status, body } = await request.post('/api/rents')
      .send({})
      .set('Authorization', `Bearer ${token}`);

    expect(status).equal(400);
    expect(body.errors).eql({
      appartment_id: '"appartment_id" is required',
      checkin: '"checkin" is required',
      checkout: '"checkout" is required',
    });
  });

  it('POST /api/rents should return error on unexistent appartment', async () => {
    const { status, body } = await request.post('/api/rents')
      .send({
        appartment_id: 0,
        checkin: moment().add(10, 'days').format('YYYY-MM-DD'),
        checkout: moment().add(12, 'days').format('YYYY-MM-DD'),
      })
      .set('Authorization', `Bearer ${token}`);

    expect(status).equal(400);
    expect(body.error).equal('The appartment does not exists');
  });

  it('POST /api/rents should create a new rent, no discount', async () => {
    const { status, body } = await request.post('/api/rents')
      .send({
        appartment_id: appartment.id,
        checkin: moment().add(10, 'days').format('YYYY-MM-DD'),
        checkout: moment().add(12, 'days').format('YYYY-MM-DD'),
      })
      .set('Authorization', `Bearer ${token}`);

    expect(status).equal(200);
    expect(body.user_id).equal(user.id);
    expect(body.appartment_id).equal(appartment.id);
    expect(body.subtotal).equal(3000);
    expect(body.discount).equal(0);
  });

  it('POST /api/rents should create a new rent, rented before 5% discount', async () => {
    const { status, body } = await request.post('/api/rents')
      .send({
        appartment_id: appartment.id,
        checkin: moment().add(15, 'days').format('YYYY-MM-DD'),
        checkout: moment().add(17, 'days').format('YYYY-MM-DD'),
      })
      .set('Authorization', `Bearer ${token}`);

    expect(status).equal(200);
    expect(body.user_id).equal(user.id);
    expect(body.appartment_id).equal(appartment.id);
    expect(body.subtotal).equal(3000);
    expect(body.discount).equal(150);
  });

  it('POST /api/rents should create a new rent, > 4 days discount', async () => {
    const res = await request.post('/api/auth/login')
      .send({
        username: 'username7',
      });
    expect(res.status).equal(200);

    const { status, body } = await request.post('/api/rents')
      .send({
        appartment_id: appartment.id,
        checkin: moment().add(20, 'days').format('YYYY-MM-DD'),
        checkout: moment().add(25, 'days').format('YYYY-MM-DD'),
      })
      .set('Authorization', `Bearer ${res.body.token}`);

    expect(status).equal(200);
    expect(body.user_id).equal(res.body.id);
    expect(body.appartment_id).equal(appartment.id);
    expect(body.subtotal).equal(7500);
    expect(body.discount).equal(375);
  });

  it('POST /api/rents should create a new rent, > 15 days discount', async () => {
    const res = await request.post('/api/auth/login')
      .send({
        username: 'username8',
      });
    expect(res.status).equal(200);

    const { status, body } = await request.post('/api/rents')
      .send({
        appartment_id: appartment.id,
        checkin: moment().add(30, 'days').format('YYYY-MM-DD'),
        checkout: moment().add(46, 'days').format('YYYY-MM-DD'),
      })
      .set('Authorization', `Bearer ${res.body.token}`);

    expect(status).equal(200);
    expect(body.user_id).equal(res.body.id);
    expect(body.appartment_id).equal(appartment.id);
    expect(body.subtotal).equal(24000);
    expect(body.discount).equal(3600);
  });

  it('POST /api/rents should use monthly price when period is 30 days', async () => {
    const res = await request.post('/api/auth/login')
      .send({
        username: 'username9',
      });
    expect(res.status).equal(200);

    const { status, body } = await request.post('/api/rents')
      .send({
        appartment_id: appartment.id,
        checkin: moment().add(50, 'days').format('YYYY-MM-DD'),
        checkout: moment().add(80, 'days').format('YYYY-MM-DD'),
      })
      .set('Authorization', `Bearer ${res.body.token}`);

    expect(status).equal(200);
    expect(body.user_id).equal(res.body.id);
    expect(body.appartment_id).equal(appartment.id);
    expect(body.subtotal).equal(45000);
    expect(body.discount).equal(6750);
  });

  it('POST /api/rents should use monthly price when period is 30 days and regular price of the remaining days', async () => {
    const res = await request.post('/api/auth/login')
      .send({
        username: 'username10',
      });
    expect(res.status).equal(200);

    const { status, body } = await request.post('/api/rents')
      .send({
        appartment_id: appartment.id,
        checkin: moment().add(50, 'days').format('YYYY-MM-DD'),
        checkout: moment().add(90, 'days').format('YYYY-MM-DD'),
      })
      .set('Authorization', `Bearer ${res.body.token}`);

    expect(status).equal(200);
    expect(body.user_id).equal(res.body.id);
    expect(body.appartment_id).equal(appartment.id);
    expect(body.subtotal).equal(60000);
    expect(body.discount).equal(9000);
  });

  it('GET /api/rents should return a list of rents', async () => {
    const { status, body } = await request.get('/api/rents')
      .set('Authorization', `Bearer ${token}`);

    expect(status).equal(200);
    expect(body).to.be.an('array');
    body.forEach((rent) => {
      expect(rent.user_id).equal(user.id);
      expect(rent).to.have.property('subtotal');
      expect(rent).to.have.property('discount');
      expect(rent).to.have.property('checkin');
      expect(rent).to.have.property('checkout');
    });
  });
});
