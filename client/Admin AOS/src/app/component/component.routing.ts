import { Routes } from '@angular/router';


import { AdvertComponent } from './advert/advert.component';
import { EditadComponent } from './editad/editad.component';
import { ViewAdvertComponent } from './view-advert/view-advert.component';
import { AddAdvertComponent } from './add-advert/add-advert.component';
import { UserComponent } from './user/user.component';

export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'advert',
        component: AdvertComponent,
        data: {
          title: 'Les annonces:',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Annonces' }
          ]
        }
      },
      {
        path: 'editad/:id',
        component: EditadComponent,
        data: {
          title: 'Modification de l\'annonce:',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Annonces', url: '/component/advert' },
            { title: 'Modification' }
          ]
        }
      },
      {
        path: 'viewad/:id',
        component: ViewAdvertComponent,
        data: {
          title: 'Visulaliser  l\'annonce:',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Annonces', url: '/component/advert' },
            { title: 'View' }
          ]
        }
      },
      {
        path: 'add',
        component: AddAdvertComponent,
        data: {
          title: 'Ajouter une nouvelle annonce:',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Annonces', url: '/component/advert' },
            { title: 'New' }
          ]
        }
      },
      {
        path: 'user/:username',
        component: UserComponent,
        data: {
          title: 'Consultation du profil',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Profil' }
          ]
        }
      }
    ]
  }
];
