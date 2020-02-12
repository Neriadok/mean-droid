import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {InputComponentDefinition} from '../input/input.component';
import {ActionButtonComponentDefinition} from '../action-button/action-button.component';

export interface InputGroup {
    key: string;
    title?: string;
    inputs: Array<InputComponentDefinition>;
    actions?: Array<ActionButtonComponentDefinition>;
}


export interface FormComponentDefinition  extends InputGroup {
    sections?: Array<InputGroup>;
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
    private openedSections: Array<string> = [];

    ngOnChanges() {
        this.form = this.definition ? new FormGroup(this.getFormControls()) : null;
    }

    getFormControls() {
        const inputs = (this.definition.sections || []).reduce(this.intoFormInputs, this.definition.inputs);
        return inputs.reduce(this.intoFormControls, {});
    }

    public openSection(section: string) {
        if (this.isOpenSection(section)) {
            this.openedSections = this.openedSections.filter((opened) => opened !== section);
        } else {
            this.openedSections = [...this.openedSections, section];
        }
    }

    public isOpenSection(section: string): boolean {
        return this.openedSections.includes(section);
    }

    private intoFormInputs(formInputs, {inputs}: InputGroup) {
        return [...formInputs, ...inputs];
    }

    private intoFormControls(group, input: InputComponentDefinition) {
        const value = input.value || '';
        const validators = input.validators || [];
        return {...group, [input.key]: new FormControl(value, validators)};
    }
}
