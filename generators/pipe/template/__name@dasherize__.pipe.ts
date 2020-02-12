import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: '<%= camelize(name) %>'
})
export class <%= classify(name) %>Pipe implements PipeTransform {

  transform(value: string, ...args): any {
    return value.concat(...args);
  }

}
