import {of as observableOf, Observable} from 'rxjs'
import {switchMap} from 'rxjs/operators'

import {Injectable} from '@angular/core'
import {Router} from '@angular/router'

import {firebase} from '@firebase/app'
import '@firebase/auth'

import {AngularFireAuth} from 'angularfire2/auth'
import {
	AngularFirestore,
	AngularFirestoreDocument
} from 'angularfire2/firestore'

import {ToastrService} from 'ngx-toastr'

import {User} from './interfaces/user'

@Injectable()
export class AuthService {
	user$: Observable<User>

	constructor(
		private afAuth: AngularFireAuth,
		private afs: AngularFirestore,
		private router: Router,
		private toastr: ToastrService
	) {
		// Get auth data, then get firestore user document || null
		this.user$ = this.afAuth.authState.pipe(
			switchMap(user => {
				// console.log('USER', user)
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
		return this.oAuthLogin(provider)
	}

	private oAuthLogin(provider) {
		return this.afAuth.auth
			.signInWithPopup(provider)
			.then(credential => {
				if (credential.additionalUserInfo.isNewUser === true) {
					this.setUserDoc(credential.user) // create initial user document
				} else if (credential.additionalUserInfo.isNewUser !== true) {
					this.user$.subscribe(ref => {
						if (!ref.campus) {
							return
						}
					})
				} else {
					this.router.navigate(['/leaderboard'])
				}
			})
			.catch(err => {
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
			termsAndConditions: true
		}

		return userRef.set(data, {merge: false})
	}

	// Update properties on the user document
	updateUser(user: User, data: any) {
		this.afs
			.doc(`users/${user.uid}`)
			.update(data)
			.then(() => {
				this.router.navigate(['/leaderboard'])
			})
			.catch(err => {
				// Error occurred. Inspect error.code.
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
			.set(data, {merge: true})
			.then(() => {
				this.showInfo('Incognito mode has been disabled')
				this.router.navigate(['/leaderboard'])
			})
			.catch(err => console.error('ERR', err))
	}

	signOut() {
		this.afAuth.auth.signOut().then(() => {
			this.router.navigate(['/login'])
		})
	}

	// Alerts
	showError(title, message?) {
		this.toastr.error(message, title)
	}

	showInfo(title, message?) {
		this.toastr.info(message, title)
	}
}
