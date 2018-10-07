import { expect } from 'chai';
import * as _ from 'lodash';
import * as supertest from 'supertest';
import * as config from 'config';

const server = config.get('server');
const request = supertest(`${server.host}:${server.port}`);

describe('Appartment endpoints', () => {
  let token;

  before(async () => {
    const { status, body } = await request.post('/api/auth/login')
      .send({
        username: 'username5',
      });
    expect(status).equal(200);
    token = body.token;
  });

  it('POST /api/appartments should return error when not loggedin', async () => {
    const { status } = await request.post('/api/appartments').send({});
    expect(status).equal(401);
  });

  it('PUT /api/appartments/:id should return error when not loggedin', async () => {
    const { status } = await request.put('/api/appartments/1').send({});
    expect(status).equal(401);
  });

  it('GET /api/appartments should return error when not loggedin', async () => {
    const { status } = await request.get('/api/appartments');
    expect(status).equal(401);
  });

  it('GET /api/appartments/:id should return error when not loggedin', async () => {
    const { status } = await request.get('/api/appartments/1');
    expect(status).equal(401);
  });

  it('POST /api/appartments should create a new appartment', async () => {
    const { status, body } = await request.post('/api/appartments')
      .send({
        location: 'Bs As',
        size: 100,
        night: 1500,
        month: 10000,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(status).equal(200);
    expect(body.location).equal('Bs As');
    expect(body.size).equal(100);
    expect(body.night).equal(1500);
    expect(body.month).equal(10000);
  });

  it('POST /api/appartments should return error on wrong validation', async () => {
    const { status, body } = await request.post('/api/appartments')
      .send({
        size: 100,
        night: 1500,
        month: 10000,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(status).equal(400);
    expect(body.errors).eql({
      location: '"location" is required',
    });
  });

  it('PUT /api/appartments/1 should update an appartment', async () => {
    const res = await request.post('/api/appartments')
      .send({
        location: 'Bs As',
        size: 100,
        night: 1500,
        month: 10000,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).equal(200);
    const { id } = res.body;

    const { status, body } = await request.put(`/api/appartments/${id}`)
      .send({
        location: 'Capital',
        size: 100,
        night: 1500,
        month: 10000,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(status).equal(200);
    expect(body.location).equal('Capital');
    expect(body.size).equal(100);
    expect(body.night).equal(1500);
    expect(body.month).equal(10000);
  });

  it('PUT /api/appartments/1 unexistant should return error', async () => {
    const { status } = await request.put('/api/appartments/0')
      .send({
        location: 'Capital',
        size: 100,
        night: 1500,
        month: 10000,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(status).equal(404);
  });

  it('GET /api/appartments/1 unexistant should return error', async () => {
    const { status } = await request.get('/api/appartments/0')
      .set('Authorization', `Bearer ${token}`);

    expect(status).equal(404);
  });

  it('GET /api/appartments/1 should return an appartment', async () => {
    const res = await request.post('/api/appartments')
      .send({
        location: 'Bs As',
        size: 100,
        night: 1500,
        month: 10000,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).equal(200);
    const { id } = res.body;

    const { status, body } = await request.get(`/api/appartments/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(status).equal(200);
    expect(body.userHasDiscount).equal(false);
    expect(body.location).equal('Bs As');
    expect(body.size).equal(100);
    expect(body.night).equal(1500);
    expect(body.month).equal(10000);
  });

  it('GET /api/appartments should return a list of appartments', async () => {
    const res = await request.post('/api/appartments')
      .send({
        location: 'Bs As',
        size: 100,
        night: 1500,
        month: 10000,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).equal(200);

    const { status, body } = await request.get('/api/appartments')
      .set('Authorization', `Bearer ${token}`);

    expect(status).equal(200);
    expect(body).to.be.an('array');
    body.forEach((ap) => {
      expect(ap).to.have.property('location');
      expect(ap).to.have.property('size');
      expect(ap).to.have.property('night');
      expect(ap).to.have.property('month');
    });
  });
});
