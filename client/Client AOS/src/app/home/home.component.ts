import { Component, OnInit } from '@angular/core';
import { Advert, AdvertService } from '../services/advert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  advert:Advert[];
  search:string="";
  constructor(private adService:AdvertService,private route:Router) { }

  ngOnInit() {
    this.advert=this.adService.getAdverts();
    
  }

}
