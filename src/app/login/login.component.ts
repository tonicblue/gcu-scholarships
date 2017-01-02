import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire, FirebaseListObservable, AngularFireAuth, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string = null;

  constructor(private af: AngularFire, private router: Router) {

  }

  ngOnInit() {
  }

  sso(provider) {
    provider = AuthProviders[provider];
    var that = this;
    this.af.auth.login({ provider: provider, method: AuthMethods.Popup }).then(response => {
      console.log('Logged in with ', provider, response);
      that.router.navigate(['/']);
    }).catch(err => {
      console.error('Error logging in', provider, err);
      this.message = err.message;
    });
  }

}
