import {Component, OnInit, ComponentRef} from '@angular/core';

@Component({
    selector: 'app-modal-message',
    templateUrl: './modal-message.component.html',
    styleUrls: ['./modal-message.component.scss']
})
export class ModalMessageComponent implements OnInit {
    public message;
    public actions: Array<any>;
    public closeAllowed;
    private componentRef: ComponentRef<any>;

    constructor () {
    }

    ngOnInit () {
    }

    public initialize (componentRef: ComponentRef<any>, message, actions = [], closeAllowed = false) {
        this.componentRef = componentRef;
        this.message = message;
        this.actions = actions;
        this.closeAllowed = closeAllowed;
    }

    public runActionMethod (actionMethod = () => {}) {
        actionMethod ();
        this.componentRef.destroy();
    }

    public close () {
        if (this.closeAllowed) {
            this.componentRef.destroy();
        }
    }

}
