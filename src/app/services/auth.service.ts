import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { Environment } from '@environments/environment'
import { User } from '@interfaces/user'
import { ToastService } from '@services/toast.service'
import { auth } from 'firebase/app'
import { Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { DbService } from './db.service'

@Injectable()
export class AuthService {
  user$: Observable<User>

  constructor(
    private http: HttpClient,
    private toast: ToastService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private db: DbService
  ) {
    // Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) =>
        user ? this.afs.doc<User>(`users/${user.uid}`).valueChanges() : of(null)
      )
    )
  }

  /**
   * Create a new Google Auth with a custom domain
   *
   * @param domain Use either @student.kent.edu.au or @kent.edu.au
   */
  async googleSignin(domain: string) {
    try {
      const provider = new auth.GoogleAuthProvider()
      provider.setCustomParameters({
        hd: domain,
      })
      await this.oAuthLogin(provider)
    } catch (error) {
      console.error('AuthService -> googleSignin -> error', error)
      return error
    }
  }

  /** Verify the user credentials and authenticate the signIn */
  private async oAuthLogin(provider: auth.GoogleAuthProvider) {
    try {
      const credential = await this.afAuth.auth.signInWithPopup(provider)

      const userDomain = credential.user.email.slice(
        credential.user.email.indexOf('@')
      )

      if (credential.additionalUserInfo.isNewUser === true) {
        if (
          userDomain === '@student.kent.edu.au' ||
          userDomain === '@kent.edu.au'
        ) {
          this.updateUserData(credential.user)
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

  /** Set the user data to Cloud Firestore after succesful login */
  private async updateUserData(user: User) {
    try {
      const userData: User = {
        campus: null,
        displayName: user.displayName,
        email: user.email,
        incognitoMode: true,
        photoURL: user.photoURL || 'assets/placeholders/placeholder-user.svg',
        points: 0,
        role: 'user',
        termsAndConditions: true,
        uid: user.uid,
      }

      return await this.db.updateAt(`users/${user.uid}`, userData)
    } catch (error) {
      return error
    }
  }

  /**
   * Update campus on the user document
   *
   * @param user Current logged user
   * @param campus User campus can be Sydney or Melbourne
   */
  updateCampus(user: User, campus: string) {
    this.db
      .updateAt(`users/${user.uid}`, { campus })
      .then(() => {
        this.sendEmail(user)
        this.router.navigate(['/leaderboard'])
      })
      .then(() => {
        return this.toast.showInfo(
          'It may take up to 3 business days for your points to be applied'
        )
      })
      .catch((error) => {
        this.toast.showError(error.message)
      })
  }

  /**
   * Triggers an email after successful Signup
   *
   * @param user Current logged user information
   */
  sendEmail(user: User) {
    this.http
      .post(Environment.firebaseEmailAPI, {
        uid: user.uid,
      })
      .subscribe(
        (res) => {
          return res
        },
        (error) => {
          return error
        }
      )
  }

  /**
   * Disable incognito mode for that user
   *
   * @param user Current logged user
   */
  async leaveIncognito(user: User) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    )

    const data: User = {
      incognitoMode: false,
    }

    try {
      await userRef.set(data, { merge: true })
      this.toast.showInfo('Incognito mode has been disabled')
      this.router.navigate(['/leaderboard'])
    } catch (error) {
      return error
    }
  }

  /** Sign out the current user and redirect to the root */
  async signOut() {
    await this.afAuth.auth.signOut()
    return this.router.navigate(['/'])
  }
}
