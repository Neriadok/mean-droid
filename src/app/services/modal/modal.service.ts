import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import {ModalMessageComponent} from '../../components/modal-message/modal-message.component';
import {ModalComponent} from '../../components/modal/modal.component';

@Injectable()
export class ModalService {

    constructor(private factoryResolver: ComponentFactoryResolver) {}

  showMessage(containerView: ViewContainerRef, message, actions = [], allowClose = true) {
    const factory = this.factoryResolver.resolveComponentFactory(ModalMessageComponent);
    const component = factory.create(containerView.injector);
    component.instance.initialize(component, message, actions, allowClose);
    containerView.insert(component.hostView);
  }

  showModalComponent(containerView: ViewContainerRef, modalComponentClass: new (...args) => ModalComponent, data, allowClose = true) {
    const factory = this.factoryResolver.resolveComponentFactory(modalComponentClass);
    const component = factory.create(containerView.injector);
    component.instance.initialize(component, data, allowClose);
    containerView.insert(component.hostView);
  }

}
