import { Subject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";




@Injectable()

export class UserService {

    constructor(private http: HttpClient) { }


    getUsers(): Observable<any[]> {
        
        return this.http.get<any[]>('http://127.0.0.1:8000/Users') .catch(this.handleError);
    }
    getUser(username :string): Observable<any[]> {
        let lien= 'http://127.0.0.1:8000/User/'+username;
        return this.http.get<any[]>(lien)  .catch(this.handleError);
    }
    private handleError (error: Response | any) {
        console.error('ApiService::handleError', error);
        alert("Erreur "+error.status+": "+error.statusText);
        return Observable.throw(error);
      }

    
    

}