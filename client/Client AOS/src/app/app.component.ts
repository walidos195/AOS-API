import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Subscription, interval } from 'rxjs';
import { AdvertService, Advert } from './services/advert.service';
import { HttpErrorResponse } from '@angular/common/http'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  
  advert: Advert[];
  advertSub: Subscription;
  subs: any;
  constructor(private adservice: AdvertService) { }
  ngOnInit() {
    this.sub();
    const counter = interval(30000);
    this.subs= counter.subscribe(  
      () => {
        this.sub();
    },
    (error) => {
      console.log('Uh-oh, an error occurred! : ' + error);
    },
    () => {
      console.log('Observable complete!');
    }
  );
    
    
this.adservice.emitAnnonceSubject();
   


  }
 

  private sub() {
    this.advertSub = this.adservice.getAdvert().subscribe((response: any[]) => {
      this.adservice.setadvert(response);
    });
  }

  ngOnDestroy() {
    this.advertSub.unsubscribe();
  }
}