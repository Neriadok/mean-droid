import {StorageService} from './storage.service';

describe('StorageService', () => {
    const service = new StorageService();
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
