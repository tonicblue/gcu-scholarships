import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';

import { AngularFire, FirebaseListObservable, AngularFireAuth, AuthProviders, AuthMethods } from 'angularfire2';

import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  isDarkTheme: boolean = false;

  constructor(private router: Router, private user: UserService){
    router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Scroll to top on new route
          window.scrollTo(0, 0);

          this.user.isLoggedIn().then((loggedIn) => {
            if(event.url !== '/login' && !loggedIn){
              this.router.navigate(['/login']);
            }else if(event.url === '/login' && loggedIn){
              this.router.navigate(['/']);
            }
          });
        }
    });
  }

  ngOnInit(){

  }
}
