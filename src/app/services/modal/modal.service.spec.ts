import {ModalService} from './modal.service';
import {Mock} from 'ts-mockery';
import {ComponentFactoryResolver} from '@angular/core';

describe('ModalService', () => {
    const service = new ModalService(Mock.of<ComponentFactoryResolver>());
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
