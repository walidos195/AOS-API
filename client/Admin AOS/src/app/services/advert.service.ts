import { Subject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/catch';
import { Router } from "@angular/router";
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

    constructor(private http: HttpClient,private router:Router) { }



  

    getAdvert(): Observable<any[]> {

        return this.http.get<Advert[]>('https://api.railsinfo.fr/Annonce'   )
      .catch(this.handleError);
    }

    getAdvertId(id): Observable<any[]> {
        return this.http.get<Advert[]>('https://api.railsinfo.fr/Annonce/'+id+'')
        
          .catch(this.handleError);
    }
    setAdvert(id,advert): Observable<any[]> {
        return this.http.put<Advert[]>('https://api.railsinfo.fr/Annonce/'+id+'',advert)
          .catch(this.handleError);;
    }  
    addAdvert(advert): Observable<any[]> {
        return this.http.post<Advert[]>('https://api.railsinfo.fr/Annonce',advert  )
          .catch(this.handleError);
    }
    deleteAdvert(id): Observable<any[]> {
        return this.http.delete<Advert[]>('https://api.railsinfo.fr/Annonce/'+id+'' )
          .catch(this.handleError);
    }
    
      private handleError (error: Response | any) {
        console.error('ApiService::handleError', error);
        alert("Erreur "+error.status+": "+error.statusText);
        return Observable.throw(error);
      }
     

}