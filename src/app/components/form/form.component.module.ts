import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {FormComponent} from './form.component';
import {ActionButtonComponentModule} from '../action-button/action-button.component.module';
import {InputComponentModule} from '../input/input.component.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponentModule,
    ActionButtonComponentModule,
    TranslateModule.forChild()
  ],
  declarations: [FormComponent],
  exports: [FormComponent]
})
export class FormComponentModule { }
