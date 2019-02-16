import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';
import { AdvertComponent } from './advert/advert.component';
import { AdvertService } from '../services/advert.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { LimitePipe } from '../limite.pipe';
import { FilterPipe } from '../filter.pipe';
import { ContratPipe } from '../contrat.pipe';
import { TitlePipe } from '../title.pipe';
import {  FdatePipe } from '../fdate.pipe';
import { EditadComponent } from './editad/editad.component';
import { ViewAdvertComponent } from './view-advert/view-advert.component';
import { AddAdvertComponent } from './add-advert/add-advert.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicationService } from '../services/application.service';
import { UserComponent } from './user/user.component';
import { UserService } from '../services/user.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,ReactiveFormsModule,
    NgbModule,NgxPaginationModule,OrderModule
  ],
  declarations: [
    AdvertComponent, 
    EditadComponent, 
    AddAdvertComponent,
    ViewAdvertComponent,
    ApplicationComponent,
    UserComponent,
    LimitePipe,FilterPipe,ContratPipe,TitlePipe,FdatePipe
  ],
  providers: [ AdvertService,ApplicationService,UserService]
})
export class ComponentsModule {}
