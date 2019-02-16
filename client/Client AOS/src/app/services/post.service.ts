import { Subject, Observable, Subscription } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { UserService } from "./user.service";
import { AdvertService } from "./advert.service";





@Injectable()

export class PostService {

  postSub: Subscription;

  constructor(private http: HttpClient, private userService: UserService, private advertService: AdvertService) { }
  Post(username: string, idAdvert: string) {
    let httpParams = new HttpParams()
      .set('username', username)
      .set('idadvert', idAdvert);
    return this.http.put<any[]>('https://api.railsinfo.fr/Application', {
      params: httpParams,
    });
  }
  isPost(username: string, idAdvert: string) {
    let httpParams = new HttpParams()
      .set('username', username)
      .set('idadvert', idAdvert);
    return this.http.get<any[]>('https://api.railsinfo.fr/Application', {
      params: httpParams,
    });

  }


}