import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {InputComponentDefinition} from '../input/input.component';
import {ActionButtonComponentDefinition} from '../action-button/action-button.component';

export interface FormComponentDefinition {
    key: string;
    title?: string;
    inputs: Array<InputComponentDefinition>;
    actions: Array<ActionButtonComponentDefinition>;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {
    @Input() definition: FormComponentDefinition;
    @Input() error: string;
    public form: FormGroup;

    ngOnChanges() {
        this.form = new FormGroup(this.getFormControls());
    }

    getFormControls() {
        return this.definition.inputs.reduce(this.intoFormControls, {});
    }

    private intoFormControls(group, input: InputComponentDefinition) {
        const value = input.value || '';
        const validators = input.validators || [];
        return {...group, [input.key]: new FormControl(value, validators)};
    }
}
