import { Pipe, PipeTransform } from '@angular/core';
import { Advert } from './services/advert.service';

@Pipe({
  name: 'fdate'
})
export class FdatePipe implements PipeTransform {
 fdisp: Date;
  transform(value: Advert[], fdispo): any {
    //let [search] = args;
    if (fdispo === undefined) {
      
      return value;
    }
    else {
      if (value !== undefined) {
        this.fdisp=new Date(fdispo.year,fdispo.month-1,fdispo.day);
        return value.filter(advert => {
          return this.compareDates(new Date(advert.date),this.fdisp);
        });
      }
      else {
        return value;
      }
    }
  }
  compareDates(date1: Date, date2: Date) {
    //date1 données
    //date2 filtre
    if (date1.getFullYear() == date2.getFullYear()) {
      if (date1.getMonth() == date2.getMonth()) {
        if (date1.getDate() >= date2.getDate()) {
          return true;
        }
        else if (date1.getDate() < date2.getDate()) {
          return false;
        }
      }
      else if (date1.getMonth() > date2.getMonth()) {
        return true;
      }
      else if (date1.getMonth() < date2.getMonth()) {
        return false;
      }
    }
    else if (date1.getFullYear() > date2.getFullYear()) {
      return true;
    }
    else if (date1.getFullYear() < date2.getFullYear()) {
      return false;
    }
  }
}