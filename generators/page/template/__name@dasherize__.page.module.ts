import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";
import {<%= classify(name) %>Page} from './<%= dasherize(name) %>.page';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
          {path: '<%= dasherize(name) %>', component: <%= classify(name) %>Page, canActivate: []},
        ]
    )
  ],
  declarations: [<%= classify(name) %>Page],
  exports: [<%= classify(name) %>Page]
})
export class <%= classify(name) %>PageModule { }
