import { Injectable } from '@angular/core';

import { Subscription } from 'rxjs/Rx';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AngularFireAuth, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class UserService {
  public user_: FirebaseObjectObservable<IUser> = null;
  public user$: Subscription;
  public user: IUser = null;

  constructor(private af: AngularFire) {
    af.auth.subscribe((authData) => {
      console.log('AuthData', authData);
      if(authData === null){
        this.user_ = null;
        this.user = null;
        if(this.user$ && typeof this.user$.unsubscribe === 'function'){
          this.user$.unsubscribe();
          this.user$ = null;
        }
      }else{
        this.user_ = af.database.object('/users/' + authData.uid, { preserveSnapshot: true })
        this.user$ = this.user_.subscribe((user: any) => {
          if(!user.exists()){
            this.user = {
              name: authData.auth.displayName,
              email: authData.auth.email,
              avatar: authData.auth.photoURL,
              shared: {}
            };
            this.user_.set(this.user);
          }else{
            this.user = user.val();
          }
        });
      }
    });
  }

  public isLoggedIn(): Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      var sub = this.af.auth.subscribe((authData) => {
        if(authData){
          resolve(true);
        }else{
          resolve(false);
        }
        sub.unsubscribe();
      });
    });
  }
}

export interface IUser {
  name: string;
  email: string;
  avatar: string;
  shared: { [key: string]: any };
}