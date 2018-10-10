import { Injectable } from '@angular/core'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material'
import { Router } from '@angular/router'
import { firebase } from '@firebase/app'
import '@firebase/auth'
import { AngularFireAuth } from '@angular/fire/auth'
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'
import { Observable, of as observableOf } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { User } from '../interfaces/user'

@Injectable()
export class AuthService {
  user$: Observable<User>
  credential: any

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
    public snackBar: MatSnackBar
  ) {
    // Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return observableOf(null)
        }
      })
    )
  }

  // Google Auth
  googleLogin(domain) {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({
      hd: domain
    })
    return this.oAuthLogin(provider).catch(err => console.error(err))
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        const userDomain = credential.user.email.slice(
          credential.user.email.indexOf('@')
        )
        if (credential.additionalUserInfo.isNewUser === true) {
          if (userDomain === ('@student.kent.edu.au' || '@kent.edu.au')) {
            this.setUserDoc(credential.user)
              .then(() => {
                return this.showInfo(
                  'It may take up to 3 business days for your points to be applied'
                )
              })
              .catch(err => {
                this.router.navigate(['/login'])
                console.error(err)
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
            .catch(err => {
              this.router.navigate(['/login'])
              console.error(err)
            })
        }
      })
      .catch(err => {
        console.error(err)
        this.showError('Something went wrong...', err.message)
      })
  }

  // Sets user data to firestore after succesful login
  private setUserDoc(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    )

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL || 'assets/placeholders/placeholder-user.png',
      role: 'user',
      points: 0,
      incognitoMode: true,
      termsAndConditions: true,
      campus: ''
    }

    return userRef.set(data, { merge: false }).catch(err => console.error(err))
  }

  // Update properties on the user document
  updateUser(user: User, data: any) {
    this.afs
      .doc(`users/${user.uid}`)
      .update(data)
      .then(() => {
        this.router.navigate(['/leaderboard']).catch(err => console.error(err))
      })
      .catch(err => {
        // Error occurred. Inspect error.code.
        console.error(err)
        this.showError('Something went wrong...', err.message)
      })
  }

  public leaveIncognito(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    )

    const data: User = {
      incognitoMode: false
    }
    return userRef
      .set(data, { merge: true })
      .then(() => {
        this.showInfo('Incognito mode has been disabled')
        this.router.navigate(['/leaderboard']).catch(err => console.error(err))
      })
      .catch(err => console.error(err))
  }

  signOut() {
    this.afAuth.auth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']).catch(err => console.error(err))
      })
      .catch(err => console.error(err))
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
