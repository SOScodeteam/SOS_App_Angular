import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { DbService } from './db.service';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: DbService,
    private router: Router,
    private storage: Storage,
    private gplus: GooglePlus,
    private platform: Platform,
    private loadingController: LoadingController
  ) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => (user ? db.doc$(`users/${user.uid}`) : of(null)))
    );
  }

  async anonymousLogin(){
    const credential = await this.afAuth.signInAnonymously();
    return await this.updateUserData(credential.user);
  }

  private updateUserData(user)  {
    const path = `users/${user.uid}`;

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      isAnonymous: user.isAnonymous,
      roles: user.roles
    };

    return this.db.updateAt(path, data)
  }

  async logOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  async uid() {
    return this.user$
      .pipe(
        take(1),
        map(u => u && u.uid)
      )
      .toPromise();
  }



  async googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async nativeGoogleLogin(): Promise<any> {
    const gplusUser = await this.gplus.login({
      webClientId: 'ADD WEB CLIENT ID HERE!',
      offline: true,
      scopes: 'profile email'
    });

    return await this.afAuth.signInWithCredential(
      auth.GoogleAuthProvider.credential(gplusUser.idToken)
    );
  }

    ///// Role-based Authorization //////
    isRegistered(user: User): boolean {
      const allowed = ['admin', 'instructor', 'student', 'sos']
      return this.checkAuthorization(user, allowed)
    }


    isAdmin(user: User): boolean {
      const allowed = ['admin']
      return this.checkAuthorization(user, allowed)
    }

    isInstructor(user: User): boolean {
      const allowed = ['instructor']
      return this.checkAuthorization(user, allowed)
    }

    isStudent(user: User): boolean {
      const allowed = ['student']
      return this.checkAuthorization(user, allowed)
    }

    isSOS(user: User): boolean {
      const allowed = ['sos']
      return this.checkAuthorization(user, allowed)
    }
  
  
    // determines if user has matching role
    private checkAuthorization(user: User, allowedRoles: string[]): boolean {
      if (!user) return false
      for (const role of allowedRoles) {
        if ( user.roles[role] ) {
          return true
        }
      }
      return false
    }
  
  
}
