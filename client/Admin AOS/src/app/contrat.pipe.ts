import { Pipe, PipeTransform } from '@angular/core';
import { Advert } from './services/advert.service';
import { defaultComparator } from '@angular/common/src/pipes/keyvalue_pipe';

@Pipe({
  name: 'contrat'
})
export class ContratPipe implements PipeTransform {
  ad2: Advert[] = [];
  ad3: Advert[] = [];
  transform(value: any[],contrat:Array<string>,ad:any[]): any {
    const ann=ad;
  
      
      if (contrat.length == 0) {
       
        return value;
      }else{
        
      value=ann.filter(advert => {
       
        return contrat.indexOf(advert.type.toLowerCase()) !== -1;
      });

    }


      return value;
    }
    
    
   
  }



