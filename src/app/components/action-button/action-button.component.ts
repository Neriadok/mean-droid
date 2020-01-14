import {Component, Input} from '@angular/core';

export interface ActionButtonComponentDefinition {
    key: string;
    type: 'danger' | 'warning' | 'success' | 'enfasis' | 'default';
    action: (args: any) => void;
    label: string;
}

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent {
    @Input() definition: ActionButtonComponentDefinition;
    @Input() args: any;

    public launchAction() {
        this.definition.action(this.args);
    }
}
