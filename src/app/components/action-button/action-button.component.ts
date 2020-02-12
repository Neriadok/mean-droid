import {Component, Input} from '@angular/core';

export interface ActionButtonComponentDefinition {
    key: string;
    type: 'danger' | 'warning' | 'success' | 'enfasis' | 'default';
    action: (args: any) => void;
    label?: string;
    icon?: string;
}

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent {
    @Input() definition: ActionButtonComponentDefinition;
    @Input() args: any;
    @Input() classes: Array<string>;

    public launchAction() {
        this.definition.action(this.args);
    }
}
