import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule, MdIconRegistry } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularFireModule, FIREBASE_PROVIDERS, defaultFirebase, AngularFire, AuthMethods, AuthProviders } from 'angularfire2';

import { RouterModule } from "@angular/router";
import { rootRouterConfig } from "./app.routing";

import { UserService } from './user.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { firebaseSecrets } from '../secrets';

export const firebaseConfig = firebaseSecrets;

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    RouterModule.forRoot(rootRouterConfig)
  ],
  bootstrap: [AppComponent],
  providers: [
    UserService
  ]
})
export class AppModule { }
