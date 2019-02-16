import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  authStatus:boolean;
  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit() {
    this.authService.authSubject.subscribe((r)=>{this.authStatus=r;});
    this.authService.emitAuthSubject();
  }
  
  OnSignOut(){
    this.authService.signOut();
    this.authService.emitAuthSubject();
        this.authStatus=this.authService.isAuth;
        this.router.navigate(['auth']);
        
      
    
  }

}
