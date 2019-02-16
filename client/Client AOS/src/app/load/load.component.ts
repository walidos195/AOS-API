import { Component, OnInit } from '@angular/core';
import { AdvertService } from '../services/advert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { PreviousRouteService } from '../services/previous-route.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})
export class LoadComponent implements OnInit {
  return:string='';
  constructor(private adservice:AdvertService,private prout:ActivatedRoute,private route:Router) { }
subs:Subscription;
  ngOnInit() {
    
    this.prout.queryParams
    .subscribe(params => this.return = params['return'] || '');
    
      const counter = interval(1000);
     this.subs= counter.subscribe(
        (value) => {
          if(this.adservice.getAdverts()===undefined){
            this.adservice.setIsLoad(false);
          }
          else{
            this.adservice.setIsLoad(true);
            
            this.route.navigate([this.return]);
            this.subs.unsubscribe();
          }
        },
        (error) => {
          console.log('Uh-oh, an error occurred! : ' + error);
        },
        () => {
          console.log('Observable complete!');
        }
      );
      
  }
  

}
