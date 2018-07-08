import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';

import { ToastrService } from 'ngx-toastr';

import { User } from './../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  public user: Observable<User>;
  public uid$: string;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore,
    private router: Router,
    private toastr: ToastrService) {
      //// Get auth data, then get firestore user document || null
      this.user = this.angularFireAuth.authState
        .switchMap(user => {
          if (user) {
            this.uid$ = user.uid;
            return this.angularFireStore.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return Observable.of(null);
          }
        });
    }

  ngOnInit() {
  }

  public googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.angularFireAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.router.navigate(['/profile']);
        this.showSuccess();
        this.setUserData(credential.user); // create initial user document in firestore
      });
  }

  private setUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.angularFireStore.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      phone: user.phone || null,
      displayName: user.displayName,
      status: true,
      roles: {
        subscriber: true
      },
      created: user.created || null,
      updated: user.updated || null,
    };
    return userRef.set(data, { merge: true });
  }


  public signOut() {
    this.angularFireAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
      this.showInfo();
    });
  }

  public emailLogin(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.updateStatus(true, user.uid);
        this.router.navigate(['/profile']);
        this.showSuccess();
      })
      .catch((error) => this.handleError(error) );
  }

  emailSignUp(data: any, email: string, password: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.router.navigate(['/profile']);
        this.toastr.success(
          'Your account has been created successfully. Thank you!',
          'Welcome...!',
          { timeOut: 7000 }
        );
        data.uid = credential.user.uid;
        // Object.defineProperty(data, 'uid', { value: credential.user.uid, writable : true, enumerable : true, configurable : true });
        return this.setUserData(data); // create initial user document in firestore
      })
      .catch(error => this.handleError(error) );
  }


  // Sends email allowing user to reset password
  public resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => {
        // this._flashMessagesService.show('Password update email sent', { cssClass: 'alert-danger', timeout: 3000 });
      }).catch((error) => this.handleError(error));
  }

  private showSuccess() {
    this.toastr.success(
      'Your login has been successfully. Thank you!',
      'Welcome...!',
      { timeOut: 7000 }
    );
  }

  private showInfo() {
    this.toastr.info(
      'Your logout was successfully. Hope to see you soon. Thank you!',
      'Logout Successfully!',
      { timeOut: 7000 }
    );
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    // this._flashMessagesService.show(error.message, { cssClass: 'alert-danger', timeout: 3000 });
  }

  updateName(name: string, uid: string) {
    const userRef: AngularFirestoreDocument<User> = this.angularFireStore.doc(`users/${uid}`);
    return userRef.update({
      'displayName': name,
    }).then(() => {
      // this._flashMessagesService.show('Username updated successfully', { cssClass: 'alert-success', timeout: 3000 });
    }).catch((error) => this.handleError(error));
  }

  updatePhone(phone: string, uid: string) {
    const userRef: AngularFirestoreDocument<User> = this.angularFireStore.doc(`users/${uid}`);
    return userRef.update({
      'phone': phone,
    }).then(() => {
      // this._flashMessagesService.show('Phone number updated successfully', { cssClass: 'alert-success', timeout: 3000 });
    }).catch((error) => this.handleError(error));
  }

  updateStatus(status: boolean, uid: string) {
    const userRef: AngularFirestoreDocument<User> = this.angularFireStore.doc(`users/${uid}`);
    return userRef.update({
      'status': status,
    });
  }
}
