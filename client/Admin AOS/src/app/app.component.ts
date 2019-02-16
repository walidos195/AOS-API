import { Component, OnInit, OnDestroy } from '@angular/core';
import { Advert, AdvertService } from './services/advert.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  advert: Advert[];
  advertSub: Subscription;
  subs: any;
  constructor() { }
  ngOnInit() {
    
    
    
   


  }
 
}
