import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { Environment } from '@environments/environment'
import { User } from '@interfaces/user'
import { ToastService } from '@services/toast.service'
import { auth } from 'firebase/app'
import { Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'

@Injectable()
export class AuthService {
  user$: Observable<User>

  constructor(
    private http: HttpClient,
    private toast: ToastService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    // Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user =>
        user ? this.afs.doc<User>(`users/${user.uid}`).valueChanges() : of(null)
      )
    )
  }

  // Google Auth
  async googleLogin(domain: string) {
    try {
      const provider = new auth.GoogleAuthProvider()
      provider.setCustomParameters({
        hd: domain
      })
      return await this.oAuthLogin(provider)
    } catch (error) {
      return error
    }
  }

  private async oAuthLogin(provider: auth.GoogleAuthProvider) {
    try {
      let credential
      credential = await this.afAuth.auth.signInWithPopup(provider)
      const userDomain = credential.user.email.slice(
        credential.user.email.indexOf('@')
      )
      if (credential.additionalUserInfo.isNewUser === true) {
        if (userDomain === ('@student.kent.edu.au' || '@kent.edu.au')) {
          this.setUserDoc(credential.user)
        } else {
          throw new Error(
            'Please use an email with @student.kent.edu.au or @kent.edu.au'
          )
        }
      } else {
        this.router.navigate(['/leaderboard']).then(() => {
          this.toast.showInfo(
            'It may take up to 3 business days for your points to be applied'
          )
        })
      }
    } catch (error) {
      this.router.navigate(['/login'])
      this.toast.showError(error.message)
    }
  }

  // Sets user data to firestore after succesful login
  private async setUserDoc(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    )

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL || 'assets/placeholders/placeholder-user.svg',
      role: 'user',
      points: 0,
      incognitoMode: true,
      termsAndConditions: true
    }

    try {
      return await userRef.set(data, { merge: false })
    } catch (error) {
      return error
    }
  }

  // Update properties on the user document
  updateCampus(user: User, campus: string) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
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
        return this.toast.showInfo(
          'It may take up to 3 business days for your points to be applied'
        )
      })
      .catch(error => {
        this.toast.showError(error.message)
      })
  }

  sendEmail(user: User) {
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

  async leaveIncognito(user: User) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    )

    const data: User = {
      incognitoMode: false
    }

    try {
      await userRef.set(data, { merge: true })
      this.toast.showInfo('Incognito mode has been disabled')
      this.router.navigate(['/leaderboard'])
    } catch (error) {
      return error
    }
  }

  async signOut() {
    await this.afAuth.auth.signOut()
    return this.router.navigate(['/'])
  }
}
