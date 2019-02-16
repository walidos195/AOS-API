import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertService } from '../../services/advert.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
  selector: 'app-editad',
  templateUrl: './editad.component.html',
  styleUrls: ['./editad.component.css']
})
export class EditadComponent implements OnInit {
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
  constructor(private route: ActivatedRoute,private router: Router, private adservice: AdvertService, private modalService: NgbModal) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.sub(this.id);
   
   
    
  }

 
  private subr(id:number) {
     this.adservice.getAdvert().subscribe(response => 
      this.annonce = response.find(b=>b.id===+id)
      
    );
    
  }
  private sub(id:number) {
    this.advertSub = this.adservice.getAdvert().subscribe((response: Advert[]) => {
      this.annonce = response.find(b=>b.id===+id);
      this.advertForm.patchValue({
        title: this.annonce.title,
        description: this.annonce.description,
        detail: this.annonce.detail,
        type: this.annonce.type,
        begin: this.annonce.begin,
        duree: this.annonce.duree
      });
    });
  }
  onSubmit(content){
   
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      var g=this.adservice.setAdvert(this.id,this.advertForm.value);
     g.subscribe((response: Advert[]) => {this.onView(); });
    }, (reason) => {
    });
  }
  onReturn(){
    const dist='/component/advert';
    this.router.navigate([dist]);
  }
  onView(){
    this.router.navigate(['/component/viewad/'+this.id]);
  }

 

  
}
