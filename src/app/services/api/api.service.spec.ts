import {ApiService} from './api.service';
import {Mock} from 'ts-mockery';
import {SessionService} from '../session/session.service';

describe('ApiService', () => {
  const service = new ApiService(Mock.of<SessionService>());
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
