import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material'
import { Router } from '@angular/router'
import { IUser } from '@core/interfaces/user'
import { Environment } from '@environments/environment'
import { firebase } from '@firebase/app'
import '@firebase/auth'
import { Observable, of as observableOf } from 'rxjs'
import { switchMap } from 'rxjs/operators'

@Injectable()
export class AuthService {
  user$: Observable<IUser>

  snackBarOptions: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top',
    duration: 5000
  }

  snackBarErrorOptions: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public snackBar: MatSnackBar,
    public http: HttpClient
  ) {
    // Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges()
        } else {
          return observableOf(null)
        }
      })
    )
  }

  // Google Auth
  async googleLogin(domain) {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({
      hd: domain
    })
    try {
      return this.oAuthLogin(provider)
    } catch (error) {
      return error
    }
  }

  private async oAuthLogin(provider) {
    try {
      const credential = await this.afAuth.auth.signInWithPopup(provider)
      const userDomain = credential.user.email.slice(
        credential.user.email.indexOf('@')
      )
      if (credential.additionalUserInfo.isNewUser === true) {
        if (userDomain === ('@student.kent.edu.au' || '@kent.edu.au')) {
          this.setUserDoc(credential.user).catch(error => {
            this.router.navigate(['/login'])
            return error
          })
        } else {
          this.router.navigate(['/login'])
          this.showError(
            `It looks like ${credential.user.email} is not valid`,
            `Please try to login again`
          )
        }
      } else {
        this.router
          .navigate(['/leaderboard'])
          .then(() => {
            return this.showInfo(
              'It may take up to 3 business days for your points to be applied'
            )
          })
          .catch(error_1 => {
            this.router.navigate(['/login'])
            return error_1
          })
      }
    } catch (error_2) {
      this.showError('Something went wrong...', error_2.message)
    }
  }

  // Sets user data to firestore after succesful login
  private async setUserDoc(user) {
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(
      `users/${user.uid}`
    )

    const data: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL || 'assets/placeholders/placeholder-user.png',
      role: 'user',
      points: 0,
      incognitoMode: true,
      termsAndConditions: true
    }

    try {
      return userRef.set(data, { merge: false })
    } catch (error) {
      return error
    }
  }

  // Update properties on the user document
  updateCampus(user: IUser, campus: string) {
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(
      `users/${user.uid}`
    )

    userRef
      .set({ campus }, { merge: true })
      .then(() => {
        this.sendEmail(user)
      })
      .then(() => {
        this.router.navigate(['/leaderboard'])
      })
      .then(() => {
        return this.showInfo(
          'It may take up to 3 business days for your points to be applied'
        )
      })
      .catch(error => {
        this.showError('Something went wrong...', error.message)
      })
  }

  sendEmail(user) {
    this.http
      .post(Environment.firebaseEmailAPI, {
        uid: user.uid
      })
      .subscribe(
        res => {
          return res
        },
        error => {
          return error
        }
      )
  }

  async leaveIncognito(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    )

    const data: IUser = {
      incognitoMode: false
    }

    try {
      await userRef.set(data, { merge: true })
      this.showInfo('Incognito mode has been disabled')
      this.router.navigate(['/leaderboard'])
    } catch (error) {
      return error
    }
  }

  signOut() {
    this.afAuth.auth
      .signOut()
      .then(() => {
        this.router.navigate(['/login'])
      })
      .catch(error => error)
  }

  // Alerts
  showInfo(message, action?: string) {
    this.snackBar.open(`${message}`, action, this.snackBarOptions)
  }

  showError(title, message?) {
    this.snackBar.open(
      `${title}
			${message}`,
      'Dismiss',
      this.snackBarErrorOptions
    )
  }
}
