

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { OwlModule } from 'ngx-owl-carousel';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatCheckboxModule, MatDialogModule, MatPaginatorModule} from '@angular/material';
import { AppComponent } from './app.component';
import { AdvertComponent } from './advert/advert.component';
import { AdvertService } from "./services/advert.service";
import { AuthComponent } from './auth/auth.component';
import { AdvertViewComponent } from './advert-view/advert-view.component';
import { Routes, RouterModule } from "@angular/router";
import { AuthService } from './services/auth.service';
import { AdvertSoloComponent } from './advert-solo/advert-solo.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthGard } from './services/auth-gard.service';
import { EditannonceComponent } from './editannonce/editannonce.component';
import { SanitizeHtmlPipePipe } from './sanitize-html-pipe.pipe';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoadGard } from './services/load-gard.service';
import { LoadComponent } from './load/load.component';
import { LimitePipe } from './limite.pipe';
import { ProfilComponent } from './profil/profil.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {PreviousRouteService} from './services/previous-route.service';
import { UserComponent } from './user/user.component';
import { DialogComponent } from './dialog/dialog.component';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { FilterPipe } from './filter.pipe';
import { ContratPipe } from './contrat.pipe';
import { OrderModule } from 'ngx-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ValidatorService } from './services/validator.service';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
const appRoutes : Routes=[
  {path:'annonces', canActivate:[LoadGard] ,component : AdvertViewComponent},
  {path:'annonces/:search', canActivate:[LoadGard] ,component : AdvertViewComponent},
  {path:'annonce/:id',canActivate:[LoadGard],component : AdvertSoloComponent},
  {path:'edit' ,component : EditannonceComponent},
  {path:'auth', component : AuthComponent},
  {path:'register', redirectTo : '/auth'},
  {path:'profil',canActivate:[AuthGard], component : ProfilComponent},
  {path:'about', component : AboutComponent},
  {path:'load', component : LoadComponent},
  {path:'contact', component : ContactComponent},
  {path:'home',canActivate:[LoadGard], component : HomeComponent},
  {path:'not-found', component : FourOhFourComponent},
  {path:'**', redirectTo : '/not-found'},
];
@NgModule({
  declarations: [
    AppComponent,
    AdvertComponent,
    AuthComponent,
    AdvertViewComponent,
    AdvertSoloComponent,
    FourOhFourComponent,
    EditannonceComponent,
    SanitizeHtmlPipePipe,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    AboutComponent,
    HomeComponent,
    LoadComponent,
    LimitePipe,
    ProfilComponent,
    UserComponent,
    DialogComponent,
    FilterPipe,
    ContratPipe,
    RegisterComponent,
    LoginComponent,
    ControlMessagesComponent
  ],
  imports: [CollapseModule.forRoot(),
    MatCheckboxModule,
    BrowserModule,
    OwlModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    OrderModule,
    RouterModule.forRoot(appRoutes),
    MatDialogModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [ AdvertService,PreviousRouteService,
    AuthService,AuthGard,LoadGard,PostService,UserService,ValidatorService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
