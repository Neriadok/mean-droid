import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {<%= classify(name) %>Component} from './<%= dasherize(name) %>.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  declarations: [<%= classify(name) %>Component],
  exports: [<%= classify(name) %>Component]
})
export class <%= classify(name) %>ComponentModule { }
