import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { FormComponent } from './form/form.component';
import { BaseFieldComponent } from './fields/base-field/base-field.component';
import { InputComponent } from './fields/input/input.component';

export const firebaseConfig = firebaseSecrets;

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FormComponent,
    BaseFieldComponent,
    InputComponent,
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
