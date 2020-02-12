import { NgModule } from '@angular/core';
import {<%= classify(name) %>Pipe} from './<%= dasherize(name) %>.pipe';

@NgModule({
  declarations: [<%= classify(name) %>Pipe],
  exports: [<%= classify(name) %>Pipe]
})
export class <%= classify(name) %>PipeModule { }
