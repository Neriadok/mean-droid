import {equal} from "assert";
import * as fetch from "node-fetch"
import {status} from "../../../src/configuration";
import {getFakeUserData, getRegistratedUserData} from "../test";

const endpoint = 'http://localhost/api/user';

describe('User endpoint', () => {
  describe('when POST requested', () => {
    it('should registrate an user', assertUserRegistration, 30000);
    it('should not registrate repeated email', assertEmailRepeatError);
  });
});

async function assertUserRegistration(){
  const user = getFakeUserData();
  const response = await fetch(endpoint,{
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

async function assertEmailRepeatError(){
  const user = await getRegistratedUserData();
  const response = await fetch(endpoint,{
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  });
  equal(response.status, status.conflict, 'incorrect response status.');

}
