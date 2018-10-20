import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { map, first, tap, subscribeOn } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  authState: any = null;
  constructor(public afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;

    });

  }
  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }
  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState.displayName : null;
  }
  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // get currentUserObservable(): any {
  //   return this.afAuth.authState.pipe(first())
  // }

  private updateUserData(name) {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features

    const path = `users/${this.currentUserId}`; // Endpoint on firebase
    const data = {
      email: this.authState.email,
      name: name
    };

    const userDb = this.db.object(path).update(data);
    const userState = this.afAuth.auth.currentUser.updateProfile({
      displayName: `${name}`,
      photoURL: ''
    });
    return Promise.all([userDb, userState]).then(() => {
      console.log('Updates succesfull');
      return true;
    });
  }

  async emailSignUp(credentials) {
    const email = credentials.email;
    const password = credentials.password;
    const name = credentials.name;
    try {
      const userData = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      console.log('authState', this.authState);
      // this.authState.displayName = name;
      const user = userData.user;
      const idToken = await user.getIdToken();
      localStorage.setItem('token', idToken);
      console.log('token: ', idToken);
      return await this.updateUserData(name);
    } catch (error) {
      console.log(error);
      return false;
    }
  }


  async emailLogin(credentials) {
    const email = credentials.email;
    const password = credentials.password;
    try {
      console.log('authState: ', this.authState);
      const userData = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      console.log('userData', userData);
      // return this.updateUserData(userData);
      // let user = userData.user;
      const idToken = await userData.user.getIdToken();
      localStorage.setItem('token', idToken);
      console.log('token: ', idToken);
      console.log('authState: ', this.authState);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  signOut(): void {
    this.afAuth.auth.signOut()
      .then(() => {
        // this.authState = null;
        this.router.navigate(['/']);
        localStorage.removeItem('token');
      });
  }

  // check if we have valid jwt token in local storage
  isLoggedIn() {
    // return tokenNotExpired(); // direct method  from angular2-jwt

    // indirect method
    // let jwtHelper = new JwtHelper();
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    // let expirationDate = jwtHelper.getTokenExpirationDate(token);
    const isExpired = jwtHelper.isTokenExpired(token);
    // console.log('Expiration', expirationDate);
    // console.log('isExpired', isExpired);
    return !isExpired;
  }
  private getToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    // let decodetToken = new JwtHelper().decodeToken(token);
    const decodetToken = new JwtHelperService().decodeToken(token);
    // console.log(JSON.parse(decodetToken));
    console.log(decodetToken);
    return decodetToken;
  }

}
