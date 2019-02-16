import { Component, Input, OnInit } from '@angular/core';
import { AdvertService } from '../services/advert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss']
})
export class AdvertComponent implements OnInit {
  
  
  @Input()  id:number;
  @Input() title :string;
  @Input() description: string;
  @Input() etat: string;
  adverts:any[];
  advertSub:Subscription;
  constructor(private advertService:AdvertService,private http:HttpClient,private router: Router) { 
    
  }

  ngOnInit() {
    
    
    this.advertService.emitAnnonceSubject();
   
  }
  goToAd(id:number){
    const dist='/annonce/'+id;
    this.router.navigate([dist]);
  }
}