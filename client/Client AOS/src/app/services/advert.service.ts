import { Subject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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
  @Injectable()

export class AdvertService {
    
    constructor(private http:HttpClient){}



    advertSubject=new Subject<any[]>();
     private _advert: Advert[];
     private isLoad:boolean;
      public getIsLoad() {
          return this.isLoad;
      }
      public setIsLoad(value) {
          this.isLoad = value;
      }
      public setadvert(value: Advert[]) {
          this._advert = value;
      }
      public getAdverts(): Advert[] {
        
          return this._advert;
      }
      public setAdverts() {
        this.getAdvert().subscribe(
            (response:any[]) => {
            this._advert=response;
            }
          );
          this.emitAnnonceSubject();
      }
    emitAnnonceSubject(){
        this.advertSubject.next(this._advert);
    }
   
    getAdvert():Observable<any[]> {
        return    this.http.get<Advert[]>('https://api.railsinfo.fr/Annonce');}


}