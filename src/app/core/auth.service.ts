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

import {MatSnackBar} from '@angular/material'
import {User} from './interfaces/user'

@Injectable()
export class AuthService {
	user$: Observable<User>

	constructor(
		private afAuth: AngularFireAuth,
		private afs: AngularFirestore,
		private router: Router,
		public snackBar: MatSnackBar
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
		return this.oAuthLogin(provider).catch(err => console.error(err))
	}

	private oAuthLogin(provider) {
		return this.afAuth.auth
			.signInWithPopup(provider)
			.then(credential => {
				// console.log('CREDENTIAL', credential)
				const userDomain = credential.user.email.slice(
					credential.user.email.indexOf('@')
				)
				// console.log('DOMAIN', userDomain)

				if (credential.additionalUserInfo.isNewUser === true) {
					if (userDomain === ('@student.kent.edu.au' || '@kent.edu.au')) {
						this.setUserDoc(credential.user).catch(err => console.error(err)) // create initial user document
					} else {
						// console.log('ELSE')
						this.router.navigate(['/login'])
						this.showError(
							`It looks like ${userDomain} is not valid`,
							`Please try to login again`
						)
					}
				} else if (!credential.additionalUserInfo.isNewUser) {
					this.user$.subscribe(ref => {
						if (!ref.campus) {
							return
						}
					})
				} else {
					this.router
						.navigate(['/leaderboard'])
						.catch(err => console.error(err))
				}
			})
			.catch(err => {
				console.error(err)
				this.showError('Something went wrong...', err.message)
			})

		// this.afAuth.auth.getRedirectResult().then(res => {
		// 	console.log('RES', res)
		// })
		// .catch(err => {
		// 			console.error(err)
		// 			this.showError('Something went wrong...', err.message)
		// 		})
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

		return userRef.set(data, {merge: false}).catch(err => console.error(err))
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
			.set(data, {merge: true})
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
		this.snackBar.open(`${message}`, action, {
			horizontalPosition: 'right',
			verticalPosition: 'top'
		})
	}
	showError(title, message?, action?: string) {
		this.snackBar.open(
			`${title}
			${message}`,
			action,
			{
				horizontalPosition: 'right',
				verticalPosition: 'top',
				duration: 4000
			}
		)
	}
}
