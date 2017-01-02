import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AngularFireAuth, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  forms_: FirebaseListObservable<IFormDescription[]> = null;
  forms$: Subscription = null;

  constructor(private af: AngularFire) { }

  ngOnInit() {
    this.forms_ = this.af.database.list('/forms', { preserveSnapshot: true });
  }
}

export interface IFormDescription {
  brief: string;
  title: string;
}
