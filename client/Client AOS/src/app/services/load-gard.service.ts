import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AdvertService } from './advert.service';
import { PreviousRouteService } from './previous-route.service';

@Injectable()

export class LoadGard implements CanActivate {
    constructor(private adService: AdvertService,private prout:PreviousRouteService, private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
           
        if (this.adService.getIsLoad()==true) {
            return true;
        }
        else {
            this.router.navigate(['load'],{
                queryParams: {
                  return: state.url
                }
              });
        }
        
    }



}