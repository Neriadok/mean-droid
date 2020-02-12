import { Component, Input } from '@angular/core';
import {FormGroup, ValidatorFn} from '@angular/forms';

export interface InputComponentValueDefinition {
    key: string;
    label?: string;
    value?: string | number | boolean;
}

export interface InputComponentDefinition extends InputComponentValueDefinition {
    type: string;
    icon?: string;
    id?: string;
    placeholder?: string;
    style?: CSSStyleDeclaration;
    labelStyle?: CSSStyleDeclaration;
    containerStyle?: CSSStyleDeclaration;
    validators?: Array<ValidatorFn>;
    options?: Array<InputComponentValueDefinition>;
    max?: number;
    min?: number;
    step?: number;
    maxLength?: number;
    minLength?: number;
    accept?: string;
    classes?: Array<string>;
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
    @Input() definition: InputComponentDefinition;
    @Input() form: FormGroup;
    private isValid() {
        return this.form.controls[this.definition.key].valid;
    }
    private isUnset(value) {
        return value === undefined || value === null;
    }
}
