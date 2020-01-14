import { Component, Input } from '@angular/core';
import {FormGroup, ValidatorFn} from '@angular/forms';

export interface InputComponentValueDefinition {
    key: string;
    label?: string;
    value?: any;
}

export interface InputComponentDefinition extends InputComponentValueDefinition {
    type: string;
    id?: string;
    style?: CSSStyleDeclaration;
    labelStyle?: CSSStyleDeclaration;
    containerStyle?: CSSStyleDeclaration;
    validators?: Array<ValidatorFn>;
    options?: Array<InputComponentValueDefinition>;
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
}
