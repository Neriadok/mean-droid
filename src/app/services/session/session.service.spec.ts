import {SessionService} from './session.service';
import {Mock} from 'ts-mockery';
import {Router} from '@angular/router';
import {StorageService} from '../storage/storage.service';

describe('SessionService', () => {
  const service = new SessionService(Mock.of<Router>(), Mock.of<StorageService>());
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
