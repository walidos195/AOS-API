import { Subject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface User {
    id: string;
    username: string;
    nom: string;
    prenom: string;
    email: string;
    last_login: string;
    roles: string;
    telephone: string;
    date_de_naissance: string;
}



@Injectable()

export class UserService {

    constructor(private http: HttpClient) { }



    userSubject = new Subject<any[]>();
    private user: User[]=[];
    private isLoad: boolean;
    public getIsLoad() {
        return this.isLoad;
    }
    public setIsLoad(value) {
        this.isLoad = value;
    }
    public setUser(value: User[]) {
        
        this.setUsername(value[0]['username']);
        this.setNom(value[0]['nom']);
        this.setPrenom(value[0]['prenom']);
        this.setEmail(value[0]['email']);
        this.setLastLogin(value[0]['last_login']);
        this.setRoles(value[0]['roles']);
        this.setTelephone(value[0]['telephone']);
        this.setId(value[0]['id']);
        
    }
    public getUser(): User[] {

        return this.user;
    }
    public getId(): string {

        return this.user['id'];
    }
    public setId(value: string) {

         this.user['id']=value;
    }
    public getUsername(): string {

        return this.user['username'];
    }
    public setUsername(value: string) {
         this.user['username']=value;
    }

    public getNom(): string {

        return this.user['nom'];
    }
    public setNom(value: string) {

        this.user['nom']=value;
   }
    public getPrenom(): string {

        return this.user['prenom'];
    }
    public setPrenom(value: string) {

        this.user['prenom']=value;
   }
    public getEmail(): string {

        return this.user['email'];
    }
    public setEmail(value: string) {

        this.user['email']=value;
   }
    public getLastLogin(): string {
        return this.user['last_login'];
    }
    public setLastLogin(value: string) {

        this.user['last_login']=value;
   }
    public getRoles(): string {
        return this.user['roles'];
    }
    public setRoles(value: string) {

        this.user['roles']=value;
   }
    public getTelephone(): string {
        return this.user['telephone'];
    }
    public setTelephone(value: string) {

        this.user['telephone']=value;
   }
    emitUserSubject() {
        this.userSubject.next(this.user);
    }



}