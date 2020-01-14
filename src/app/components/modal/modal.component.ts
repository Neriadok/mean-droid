import {Component, ComponentRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public componentRef: ComponentRef<any>;
  public data: any;
  public closeAllowed;

  constructor() { }

  ngOnInit() {
  }

  public initialize (componentRef: ComponentRef<any>, data, closeAllowed = true) {
    this.componentRef = componentRef;
    this.data = data;
    this.closeAllowed = closeAllowed;
  }

  public close () {
    if (this.closeAllowed) this.componentRef.destroy();
  }

}
