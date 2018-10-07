import { expect } from 'chai';
import * as _ from 'lodash';
import * as supertest from 'supertest';
import * as config from 'config';
import models from 'models';

const server = config.get('server');
const request = supertest(`${server.host}:${server.port}`);

describe('Auth endpoints', () => {
  it('/api/auth/me should return error when not loggedin', async () => {
    const { status } = await request.get('/api/auth/me');
    expect(status).equal(401);
  });

  it('/api/auth/login should create a new user and login', async () => {
    const { status, body } = await request.post('/api/auth/login')
      .send({
        username: 'username1',
      });

    expect(status).equal(200);
    expect(body).to.have.property('id');
    expect(body).to.have.property('token');
    expect(body.token).to.be.a('string');
    expect(body.username).equal('username1');
  });

  it('/api/auth/login should reuse a user and login', async () => {
    let { status, body } = await request.post('/api/auth/login')
      .send({
        username: 'username2',
      });

    expect(status).equal(200);
    expect(body).to.have.property('id');
    expect(body).to.have.property('token');
    expect(body.token).to.be.a('string');
    expect(body.username).equal('username2');

    const { id } = body;

    ({ status, body } = await request.post('/api/auth/login')
      .send({
        username: 'username2',
      }));

    expect(status).equal(200);
    expect(body).to.have.property('id');
    expect(body).to.have.property('token');
    expect(body.token).to.be.a('string');
    expect(body.username).equal('username2');
    expect(body.id).equal(id);
  });

  it('/api/auth/me should return user when loggedin', async () => {
    const res = await request.post('/api/auth/login')
      .send({
        username: 'username3',
      });

    const { status, body } = await request.get('/api/auth/me')
      .set('Authorization', `Bearer ${res.body.token}`);
    expect(status).equal(200);
    expect(body.username).equal('username3');
  });
});
