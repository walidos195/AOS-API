import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { PreviousRouteService } from '../services/previous-route.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  authStatus: boolean;
  logSub: Subscription;
  previous: string;
  constructor(private authService: AuthService, private prService: PreviousRouteService, private UserService: UserService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
    this.previous = this.prService.getPreviousUrl();
  }
  OnSignIn(form: NgForm) {

    const username = form.value['_username'];
    const password = form.value['_password'];
    this.logSub = this.authService.post(username, password).subscribe((response: any[]) => {
      if (response['error'] === 0) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {

          description: 'Utilisateur non trouvé'
        };
        this.dialog.open(DialogComponent, dialogConfig);
      }
      else if (response['error'] === 1) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {

          description: 'Connexion refusée. Nom de compte ou mot de passe incorrect'
        };
        this.dialog.open(DialogComponent, dialogConfig);

      }
      else if (response['error'] === -1) {

        this.UserService.setUser(response);
        this.UserService.emitUserSubject();
        this.authService.signIn().then(
          () => {
            this.authStatus = this.authService.isAuth;
            this.authService.emitAuthSubject();
            if (this.previous === "/auth") {
              this.router.navigate(['profil']);
            }
            else {
              this.router.navigate([this.previous]);
            }

          }
        );
      }



    });

  }
  OnSignOut() {
    this.authService.signOut();
    this.authService.emitAuthSubject();
    this.authStatus = this.authService.isAuth;
    this.router.navigate(['annonces']);



  }
}
