import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ActionButtonComponent} from './action-button.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  declarations: [ActionButtonComponent],
  exports: [ActionButtonComponent]
})
export class ActionButtonComponentModule { }
