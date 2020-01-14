import * as fetch from 'node-fetch';
import {equal} from "assert";
import {status} from "../../../src/configuration";

const endpoint = 'http://localhost/api/<%= dasherize(name) %>';

describe('Session endpoint', () => {
  describe('when GET requested', () => {
    it('should return', assertGet);
  });
  describe('when POST requested', () => {
    it('should return', assertPost);
  });
  describe('when PUT requested', () => {
    it('should return', assertPut);
  });
  describe('when PATCH requested', () => {
    it('should return', assertPatch);
  });
  describe('when DELETE requested', () => {
    it('should return', assertDelete);
  });
});

async function assertGet() {
  const response = await fetch(endpoint, { method: 'GET' });
  equal(response.status, status.empty, 'incorrect response status.');
}

async function assertPost() {
  const response = await fetch(endpoint, { method: 'POST' });
  equal(response.status, status.empty, 'incorrect response status.');
}

async function assertPut() {
  const response = await fetch(endpoint, { method: 'PUT' });
  equal(response.status, status.empty, 'incorrect response status.');
}

async function assertPatch() {
  const response = await fetch(endpoint, { method: 'PATCH' });
  equal(response.status, status.empty, 'incorrect response status.');
}

async function assertDelete() {
  const response = await fetch(endpoint, { method: 'DELETE' });
  equal(response.status, status.empty, 'incorrect response status.');
}
