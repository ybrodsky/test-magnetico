
import axios from 'axios';
import { toast } from 'react-toastify';
import * as _ from 'lodash';

const BASEURL = process.env.REACT_APP_API_URL;
const USERS_URL = process.env.REACT_APP_USERS_URL;

const catchError = (error) => {
  const { status, data } = error.response;

  switch (status) {
    case 401:
      toast.error('Inicia sesion para continuar');
      localStorage.clear('token');
      window.location.href = '/login';
      break;
    default: {
      toast.error(data.message || data.error);
    }
  }

  throw error;
}

const request = ({ method, params, body, path }) => {
  const options = {
    method,
    url: `${BASEURL}${path}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  if (params) {
    options.params = params;
  }

  if (body) {
    options.data = body;
  }

  return axios(options).catch(catchError);
}

export function login(body) {
  return request({
    body,
    method: 'POST',
    path: '/api/auth/login',
  });
}

export function listAppartments() {
  return request({
    method: 'GET',
    path: '/api/appartments',
  });
}

export function getAppartment(id) {
  return request({
    method: 'GET',
    path: `/api/appartments/${id}`,
  });
}

export function createAppartment(body) {
  return request({
    body,
    method: 'POST',
    path: '/api/appartments',
  });
}

export function updateAppartment(id, body) {
  return request({
    body,
    method: 'PUT',
    path: `/api/appartments/${id}`,
  });
}

export function createRent(body) {
  return request({
    body,
    method: 'POST',
    path: '/api/rents',
  });
}

export function listRents() {
  return request({
    method: 'GET',
    path: '/api/rents',
  });
}
