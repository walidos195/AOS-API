import { Subject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

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

export class ApplicationService {

    constructor(private http: HttpClient) { }



  

    getApplications(idAdvert:string): Observable<any[]> {
        let httpParams = new HttpParams()
        .set('idadvert', idAdvert);
        return this.http.get<Advert[]>('https://api.railsinfo.fr/Applications', {
            params: httpParams,
        })
        .catch(this.handleError);
    }



    setAdvert(id,advert): Observable<any[]> {
        return this.http.put<Advert[]>('https://api.railsinfo.fr/Application/'+id+'',advert)
        .catch(this.handleError);
    }  
    addAdvert(advert): Observable<any[]> {
        return this.http.post<Advert[]>('https://api.railsinfo.fr/Application',advert)
        .catch(this.handleError);
    }
    private handleError (error: Response | any) {
        console.error('ApiService::handleError', error);
        alert("Erreur "+error.status+": "+error.statusText);
        return Observable.throw(error);
      }

}