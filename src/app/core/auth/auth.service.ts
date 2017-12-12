import { EmailPasswordCredentials } from './email-password-credentials';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/switchMap'
import { AFSDecorator } from '@app/shared/afs.decorator';

@Injectable()
export class AuthService {
  public static get COLLECTION_NAME(): string { return 'users'; }
  user: Observable<User>;
  authState: AngularFireAuth = null;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private afsd: AFSDecorator<User>,
    private router: Router) {
    this.loadCurrentUser();
  }

  private loadCurrentUser() {
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afsd.getDocument(AuthService.COLLECTION_NAME, user.uid).valueChanges()
        } else {
          return Observable.of(null);
        }
      });
  }

  emailSignUp(credentials: EmailPasswordCredentials): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((user: firebase.User) => {
        this.afsd.createDocument(AuthService.COLLECTION_NAME, user.uid, { email: user.email });
      })
      .catch(error => { throw error; });
  }

  emailLogin(credentials: EmailPasswordCredentials): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .catch(error => { throw error; });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      window.location.reload();
    });
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
      .catch((error) => { throw error; })
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  private updateUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    return userRef.set(data)
  }
}
