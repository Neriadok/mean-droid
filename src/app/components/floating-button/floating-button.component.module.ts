import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {FloatingButtonComponent} from './floating-button.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  declarations: [FloatingButtonComponent],
  exports: [FloatingButtonComponent]
})
export class FloatingButtonComponentModule { }
