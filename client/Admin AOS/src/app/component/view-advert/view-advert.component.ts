import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdvertService, Advert } from '../../services/advert.service';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-advert',
  templateUrl: './view-advert.component.html',
  styleUrls: ['./view-advert.component.css']
})
export class ViewAdvertComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router, private adservice: AdvertService,  private modalService: NgbModal) { }

  id:number;
  annonce: any;
  advertSub: Subscription;
  ready:boolean=false;
  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.sub(this.id);
  }
  private sub(id:number) {
    this.adservice.getAdvertId(id).subscribe(response => {
     this.annonce = response;
     this.ready=true;}
   );
   
 }
 onUpdate(){ const dist='/component/editad/'+this.id;
 this.router.navigate([dist]);}
 
 onReturn(){ 
  const dist='/component/advert';
this.router.navigate([dist]);}


open(content, action, id) {
    
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.doAction(result, action, id);
  }, (reason) => {
  });

}

private doAction(reason: any, action, id) {

  if (reason === ModalDismissReasons.ESC) {
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  } else {
    this.deleteAd(id);
      
  }

}
deleteAd(id: number) {
  var g = this.adservice.deleteAdvert(id);
  g.subscribe((response: any[]) => {
    const dist = '/component/advert/';
      this.router.navigate([dist]);
  });
}
}
