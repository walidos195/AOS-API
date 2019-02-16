import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdvertService } from '../../services/advert.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.css']
})

export class AdvertComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  p: number = 1;
  y: number = 3;
  display: string = 'list';
  ymax;
  order: string = '';
  reverse: boolean = false;
  advertSub: Subscription;
  subs: any;
  annonces: any[];
  filters: any[] = Array();
  search: string = '';
  rmc: string = undefined;
  addc: string = undefined;
  contrat: Array<string> = new Array<string>();
  ftitle: string = '';
  fdispo: any;
  empty: boolean = false;
  closeResult: string;

  constructor(private adservice: AdvertService, private router: Router, private modalService: NgbModal) { }
  ngOnInit() {
    this.sub();
  }


  private sub() {
    this.advertSub = this.adservice.getAdvert().subscribe((response: any[]) => {
      this.annonces = response;
      this.ymax = response.length;
      
      if (this.annonces.length == 0) {
        this.empty = true;
      }
    });
  }
  contratpush(contrat: string) {

    if (!this.inArray(this.contrat, contrat)) {
      this.contrat.push(contrat);
      this.contrat = this.contrat.filter(obj => obj !== "contrate");
      this.addc = contrat;
      this.rmc = undefined;
    }
    else {
      this.contrat = this.contrat.filter(obj => obj !== contrat);
      this.rmc = contrat;
      this.addc = undefined;
    }
  }


  addFilter(value: string) {
    if (this.inArray(this.filters, value)) {
      this.delete(this.filters, value);
      if (this.filters.length == 0) {
        this.collapseOff();
      }
      if (value == 'title') {
        this.ftitle = "";
      }
      if (value == 'dispo') {
        this.fdispo = undefined;
      }
      if (value == 'contrat') {
        this.contrat = new Array<string>();
      }
    }
    else {
      this.filters.push(value);
      this.collapseOn();

    }
  }
  closeFilter() {
    this.collapseOff();
    this.ftitle = "";
    this.fdispo = undefined;
    this.contrat = new Array<string>();

  }
  Display(display: number) {
    if (display == 0) {
      this.y = 3;
      this.display = "list";
    }
    else if (display == 1) {
      this.display = "mosaic";
      this.y = 6;
    }
    else
      this.display = "list";
  }
  ngOnDestroy() {
    this.advertSub.unsubscribe();
  }

  Order(value: string) {

    if (this.order == value) {

      if (this.reverse == true) {
        this.reverse = false;

      }
      else {
        this.reverse = true;

      }

    }
    this.order = value;

  }

  delete(array: any[], key: string) {
    const index = array.indexOf(key, 0);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
  inArray(array: any[], value: any) {
    if (array === undefined) { return false; }
    else { return array.some(e => e === value); }

  }
  collapseOn() {
    this.isCollapsed = false;
  }
  collapseOff() {
    this.isCollapsed = true;
  }
  goTo(page: string, id: number) {
    if (page == 'edit') {
      const dist = '/component/editad/' + id + '';
      this.router.navigate([dist]);
    }
    if (page == 'view') {
      const dist = '/component/viewad/' + id + '';
      this.router.navigate([dist]);
    }
    if (page == 'delete') {
      this.deleteAd(id);
      const dist = '/component/advert/';
      this.router.navigate([dist]);
    }
    if (page == "add") {
      const dist = '/component/add';
      this.router.navigate([dist]);
    }
  }

  deleteAd(id: number) {
    var g = this.adservice.deleteAdvert(id);
    g.subscribe((response: any[]) => {
      this.sub();
    });
  }

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
      this.goTo(action, id) ;
    }

  }
}


