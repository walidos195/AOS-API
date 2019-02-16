import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {User} from '../models/User.model';
import { UserService } from '../services/user.service';
import { PasswordValidation } from '../validator/PasswordValidation';
import { ValidatorService } from '../services/validator.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PreviousRouteService } from '../services/previous-route.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  previous: string;
  userForm: FormGroup;
  authStatus: boolean;
  logSub: Subscription;
  constructor(private router: Router,private prService:PreviousRouteService, private validatorService:ValidatorService ,private formBuilder: FormBuilder,private userService:UserService,private authService:AuthService) {
    this.initForm();
   }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
    this.previous = this.prService.getPreviousUrl();
  }
  initForm(){
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['',[ Validators.required, ValidatorService.emailValidator]],
      password: ['', [Validators.required,ValidatorService.passwordValidator,ValidatorService.confirmPasswordValidator]],
      confirmpass : ['', [Validators.required,ValidatorService.confirmPasswordValidator]]
    });

  }
  onSubmitForm(){
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue['username'],
      formValue['email'],
      formValue['password'],
      formValue['confirmpass']
    );
    this.logSub = this.authService.signup(formValue['username'], formValue['email'],formValue['password']).subscribe((response: any[]) => {
     

        this.userService.setUser(response);
        this.userService.emitUserSubject();
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
      



    });
    console.log(newUser);
  }
}
