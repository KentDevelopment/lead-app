import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import {
	AngularFirestore,
	AngularFirestoreCollection
} from 'angularfire2/firestore'
import { Observable } from 'rxjs'

import { AuthService } from './../core/auth.service'

import { User } from './interfaces/user'
import { Course } from './interfaces/course'
import { Log } from './interfaces/log'

@Injectable()
export class FirestoreService {
	usersCollection: AngularFirestoreCollection<User>
	orderedUsers$Collection: AngularFirestoreCollection<User>
	coursesCollection: AngularFirestoreCollection<Course>
	logsCollection: AngularFirestoreCollection<Log>

	users$: Observable<User[]>
	localUsers$: Observable<User[]>
	orderedUsers$: Observable<User[]>
	courses$: Observable<Course[]>
	logs$: Observable<Log[]>

	position: any
	validPicture: any = []

	constructor(
		public afs: AngularFirestore,
		private auth: AuthService,
		public http: HttpClient
	) {
		this.auth.user$.subscribe(userRef => {
			if (
				userRef.email === 'lyndall.benton@kent.edu.au' ||
				userRef.email === 'k170535@student.kent.edu.au'
			) {
				this.localUsers$ = afs
					.collection<User>('users', res =>
						res.where('campus', '==', 'Sydney').orderBy('points', 'desc')
					)
					.valueChanges()
				this.orderedUsers$ = afs
					.collection<User>('users', res =>
						res.orderBy('campus', 'desc').orderBy('displayName', 'asc')
					)
					.valueChanges()
				this.logs$ = afs
					.collection<Log>('logs', res => res.orderBy('date', 'desc'))
					.valueChanges()
			} else if (userRef.campus === 'Sydney') {
				this.localUsers$ = afs
					.collection<User>('users', res =>
						res.where('campus', '==', 'Sydney').orderBy('points', 'desc')
					)
					.valueChanges()
				this.orderedUsers$ = afs
					.collection<User>('users', res =>
						res.where('campus', '==', 'Sydney').orderBy('displayName', 'asc')
					)
					.valueChanges()
				this.logs$ = afs
					.collection<Log>('logs', res => res.orderBy('date', 'desc'))
					.valueChanges()
			} else {
				this.localUsers$ = afs
					.collection<User>('users', res =>
						res.where('campus', '==', 'Melbourne').orderBy('points', 'desc')
					)
					.valueChanges()
				this.orderedUsers$ = afs
					.collection<User>('users', res =>
						res.where('campus', '==', 'Melbourne').orderBy('displayName', 'asc')
					)
					.valueChanges()
				this.logs$ = afs
					.collection<Log>('logs', res => res.orderBy('date', 'desc'))
					.valueChanges()
			}

			this.apiMarvel().subscribe((res: any) => {
				for (const result of res.data.results) {
					if (
						result.thumbnail.path !==
							'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' &&
						result.thumbnail.extension !== 'gif'
					) {
						this.validPicture.push(result)
					}
				}

				this.localUsers$.subscribe((users: any) => {
					this.users$ = users
					for (const user of users) {
						if (user.incognitoMode === true) {
							this.generateNumber()
							user.photoURL =
								this.validPicture[this.position].thumbnail.path +
								'.' +
								this.validPicture[this.position].thumbnail.extension
							user.displayName = this.validPicture[this.position].name
							if (userRef.displayName === user.displayName) {
								userRef.photoURL =
									this.validPicture[this.position].thumbnail.path +
									'.' +
									this.validPicture[this.position].thumbnail.extension
							}
						}
					}
				})
			})
		})
	}

	generateNumber() {
		const randomNumber = Math.floor(Math.random() * 100)
		// console.log('RANDOMNUMBER', randomNumber)
		if (randomNumber < this.validPicture.length) {
			this.position = randomNumber
		} else {
			this.generateNumber()
		}
	}

	// MARVEL API
	apiMarvel() {
		const apikey = '5227aa2518375785b9d1179a789368c4'
		const offset = Math.floor(Math.random() * 1400)
		const limit = 15

		const endpointApi = `https://gateway.marvel.com:443/v1/public/characters?offset=${offset}&limit=${limit}&apikey=${apikey}`

		return this.http.get(endpointApi)
	}

	// LOG FUNCTION
	addLog(log) {
		const logRef: AngularFirestoreCollection<any> = this.afs.collection('logs')

		this.auth.user$.subscribe(ref => {
			const data: Log = {
				log: log,
				adminName: ref.displayName,
				date: new Date().getTime()
			}

			logRef
				.add(data)
				.then(() => {
					console.log('Log successfully added')
					return
				})
				.catch(err => {
					console.error(`Ops, it looks like something has gone wrong...`, err)
				})
		})
	}
}
