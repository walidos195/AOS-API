import { Subject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()



export class AuthService {
    isAuth = false;
    authSubject = new Subject<any>();
    constructor(private http: HttpClient) { }
    signIn() {
        return new Promise(
            (resolve, reject) => {
                setTimeout(
                    () => {
                        this.isAuth = true;
                        resolve(true);
                    }, 1000
                );
            }
        );
    }
    emitAuthSubject() {
        this.authSubject.next(this.isAuth);
    }
    getAuth() {
        return this.isAuth;
    }
    post(username: string, password: string): Observable<any[]> {
        return this.http.post<any[]>('https://api.railsinfo.fr/NgLogin', {
            _username: username,
            _password: password
        });

    }
    signup(username: string, mail: string, password: string): Observable<any[]> {
        return this.http.post<any[]>('https://api.railsinfo.fr/NgRegister', {
            _username: username,
            _email:mail,
            _password: password
        });

    }
    signOut() {

        this.isAuth = false;

    }
}
