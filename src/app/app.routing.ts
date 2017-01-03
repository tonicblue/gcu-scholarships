import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';

export const rootRouterConfig: Routes = [
    { path: '',                         component: HomeComponent,           pathMatch: 'full'   },
    { path: 'login',                    component: LoginComponent           },
    { path: 'form/:slug',               component: FormComponent            },
];
