import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limite'
})
export class LimitePipe implements PipeTransform {

  transform(value: any, max: number): any {
    return value.substring(0,max);
  }

}
