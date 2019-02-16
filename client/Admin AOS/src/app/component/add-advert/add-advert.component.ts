import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertService } from '../../services/advert.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';


export interface Advert {
  id: number;
  title: string;
  description: string;
  detail: string;
  type: string;
  date: string;
  begin: string;
  duree: string;
  time: string;
  code: string;
}

@Component({
  selector: 'app-add-advert',
  templateUrl: './add-advert.component.html',
  styleUrls: ['./add-advert.component.css']
})
export class AddAdvertComponent implements OnInit {
  id:number;
  annonce: Advert;
  advertSub: Subscription;
  contrats = [{ 'name':'CDD'}, { 'name': 'CDI'}, {'name': 'stage'}];
 
  advertForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    detail: new FormControl(''),
    type: new FormControl(''),
    begin: new FormControl(''),
    duree: new FormControl('')
  });
  constructor(private route: ActivatedRoute,private router: Router, private adservice: AdvertService) { }

  ngOnInit() {
  
   
    
  }

 
  onSubmit(){
    var g=this.adservice.addAdvert(this.advertForm.value);
    g.subscribe((response: Advert[]) =>
     {
      console.log(response);  
       const dist='/component/viewad/'+response[0].id+'';
    this.router.navigate([dist]);});
  }
  onReturn(){
    const dist='/component/advert';
    this.router.navigate([dist]);
  }
  onView(){
  }
}
