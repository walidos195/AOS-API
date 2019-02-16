import { Pipe, PipeTransform } from '@angular/core';
import { Advert } from './services/advert.service';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(value: Advert[], search): any {
    //let [search] = args;

    if(search===undefined){
      return value;
    }
    else{
      if(value!==undefined){
      return value.filter(advert => {
        return advert.title.toLowerCase().search(search.toLowerCase())!==-1;
      });
    }
    else{
      return value;
    }
    } 
  }

}
