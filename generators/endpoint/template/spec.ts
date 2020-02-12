import * as fetch from 'node-fetch';
import {equal} from 'assert';
import {status} from '../../../src/configuration';

const endpoint = 'http://localhost/api/<%= dasherize(name) %>';
const fakeData = {
  key: 'test'
};

describe('<%= classify(name) %> endpoint', () => {
  it('should add, list, edit and delete <%= classify(name) %>Model', assertEndpoint);
});

async function assertEndpoint() {
  try {
    await assertDelete();
    console.log('Object already existed');
  } catch (e) {}
  await assertPost();
  await assertGet();
  await assertPut();
  await assertDelete();
}

function assertIsTestingData(object) {
  expect(object).toBeTruthy();
  expect(object).toHaveProperty('key', 'test');
  //TODO define assertions
}

async function assertGet() {
  const response = await fetch(endpoint, { method: 'GET' });
  equal(response.status, status.ok, 'incorrect response status.');
  const <%= dasherize(name) %>List = await response.json();
  const <%= dasherize(name) %> = <%= dasherize(name) %>List.find(({key}) => key === fakeData.key);
  assertIsTestingData(<%= dasherize(name) %>);
}

async function assertPost() {
  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(fakeData),
    headers: { 'Content-Type': 'application/json' }
  });
  equal(response.status, status.ok, 'incorrect response status.');
  const <%= dasherize(name) %> = await response.json();
  assertIsTestingData(<%= dasherize(name) %>);
}

async function assertPut() {
  const response = await fetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(fakeData),
    headers: { 'Content-Type': 'application/json' }
  });
  equal(response.status, status.ok, 'incorrect response status.');
  const <%= dasherize(name) %> = await response.json();
  assertIsTestingData(<%= dasherize(name) %>);
}

async function assertDelete() {
  const response = await fetch(endpoint, {
    method: 'DELETE',
    body: JSON.stringify(fakeData),
    headers: { 'Content-Type': 'application/json' }
  });
  equal(response.status, status.ok, 'incorrect response status.');
}
