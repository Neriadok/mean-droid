import * as fetch from 'node-fetch';
import {getRegistratedUserData} from '../test-utils';
import {equal} from 'assert';
import {status} from '../../../src/configuration';

const endpoint = 'http://localhost/api/session';

describe('Session endpoint', () => {
  describe('when GET requested', () => {
    it('should return new user token', assertSessionRefresh, 30000);
  });
  describe('when POST requested', () => {
    it('should return tokenized user when email logged', assertLoginWithMail);
    it('should return not found user when wrong email', assertWrongEmailLogin);
    it('should return not found user when wrong password', assertWrongPasswordLogin);
  });
});

async function assertSessionRefresh() {
  const user = await getRegistratedUserData();
  const response = await fetch(endpoint, {
    method: 'GET',
    params: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
      'auth': user.token
    },
  });
  equal(response.status, status.ok, 'incorrect response status.');

  const body = await response.json();
  expect(body).toHaveProperty('token');
}

async function assertLoginWithMail() {
  const user = await getRegistratedUserData();
  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  });
  equal(response.status, status.ok, 'incorrect response status.');

  const body = await response.json();
  expect(body).toHaveProperty('email');
  expect(body).toHaveProperty('perms');
  expect(body).toHaveProperty('token');
}

async function assertWrongPasswordLogin() {
  const user = await getRegistratedUserData();
  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({...user, password: 'wrong'}),
    headers: { 'Content-Type': 'application/json' },
  });
  equal(response.status, status.unauthorized, 'incorrect response status.');
}

async function assertWrongEmailLogin() {
  const user = await getRegistratedUserData();
  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({...user, email: 'wrong'}),
    headers: { 'Content-Type': 'application/json' },
  });
  equal(response.status, status.unauthorized, 'incorrect response status.');
}
