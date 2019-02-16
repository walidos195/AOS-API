import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {ActivatedRoute } from '@angular/router';


export interface user {

  
     id: number,
     username: string,
     email: string,
     password: string,
     nom: string,
     prenom: string,
     telephone: string,
     skills: string,
     cv: string,
     lettre: string
  
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username: any;
  user :user[];
  empty: boolean;
  userSub: any;

  constructor(private userservice: UserService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub();
  }


  private sub() {
    this.username=this.route.snapshot.params['username'];
    this.userSub = this.userservice.getUser(this.username).subscribe((response:user[]) => {
      this.user = response;
      if (this.user.length == 0) {
        this.empty = true;
      }
    });
  }
}


