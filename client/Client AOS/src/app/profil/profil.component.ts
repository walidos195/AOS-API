import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  user:User[];
  constructor(private userService:UserService) { }
  ngOnInit() {
    
    this.userService.userSubject.subscribe((r)=>{
        this.userService.setUser(r);
    }
  );
  this.user=this.userService.getUser();
  }

}
