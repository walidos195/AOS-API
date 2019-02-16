import { Component, OnInit } from '@angular/core';
import { AdvertService } from '../services/advert.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-advert-view',
  templateUrl: './advert-view.component.html',
  styleUrls: ['./advert-view.component.scss']
})
export class AdvertViewComponent implements OnInit {


  p: number = 1;
  annonces: any[];
  annonceSubscription: Subscription;
  search: string;
  contrat: Array<string> = new Array<string>();
  fullcontrats: Array<string> = new Array<string>();
  order: string = '';
  reverse: boolean = false;
  rmc:string=undefined;
  addc:string=undefined;
  constructor(private annonceService: AdvertService, private route: ActivatedRoute, private userService: UserService) {

  }


  ngOnInit() {
this.fullcontrats=Array('stage','cdd','cdi');
    this.search = this.route.snapshot.params['search'];
    this.annonces = this.annonceService.getAdverts();
    this.annonceService.emitAnnonceSubject();

  }

  contratpush(contrat: string) {
    
    if (!this.inContrat(contrat)) {
     this.contrat.push(contrat);
     this.contrat=this.contrat.filter(obj => obj !== "contrate");
     this.addc=contrat;
     this.rmc=undefined;
    }
    else{
      this.contrat = this.contrat.filter(obj => obj !== contrat);
      this.rmc=contrat;
      this.addc=undefined;
    }
  }

  inContrat(contrat: string): boolean {
    let bol=this.contrat.some(element=>element==contrat);
    return bol;
  }
}
