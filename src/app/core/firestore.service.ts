import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore'

import { AuthService } from '@core/authentication/auth.service'
import { ILog, ILogText } from '@core/interfaces/log'
import { IUser } from '@core/interfaces/user'
import { Observable } from 'rxjs'

import { Environment } from '@environments/environment'

@Injectable()
export class FirestoreService {
  usersCollection: AngularFirestoreCollection<IUser>

  users$: Observable<IUser[]>
  localUsers$: Observable<IUser[]>
  orderedUsers$: Observable<IUser[]>
  logs$: Observable<ILog[]>

  position: any
  validPicture: any = []

  constructor(
    public afs: AngularFirestore,
    public http: HttpClient,
    private auth: AuthService
  ) {
    this.auth.user$.subscribe(userRef => {
      if (
        userRef.email === 'lyndall.benton@kent.edu.au' ||
        userRef.email === 'k170535@student.kent.edu.au'
      ) {
        this.localUsers$ = afs
          .collection<IUser>('users', res =>
            res.where('campus', '==', 'Sydney').orderBy('points', 'desc')
          )
          .valueChanges()
        this.orderedUsers$ = afs
          .collection<IUser>('users', res =>
            res.orderBy('campus', 'desc').orderBy('displayName', 'asc')
          )
          .valueChanges()
        this.getLogs()
      } else if (userRef.campus === 'Sydney') {
        this.localUsers$ = afs
          .collection<IUser>('users', res =>
            res.where('campus', '==', 'Sydney').orderBy('points', 'desc')
          )
          .valueChanges()
        this.orderedUsers$ = afs
          .collection<IUser>('users', res =>
            res.where('campus', '==', 'Sydney').orderBy('displayName', 'asc')
          )
          .valueChanges()
        this.getLogs()
      } else {
        this.localUsers$ = afs
          .collection<IUser>('users', res =>
            res.where('campus', '==', 'Melbourne').orderBy('points', 'desc')
          )
          .valueChanges()
        this.orderedUsers$ = afs
          .collection<IUser>('users', res =>
            res.where('campus', '==', 'Melbourne').orderBy('displayName', 'asc')
          )
          .valueChanges()
        this.getLogs()
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

  getLogs() {
    return (this.logs$ = this.afs
      .collection<ILog>('logs', res => res.orderBy('date', 'desc'))
      .valueChanges())
  }

  generateNumber() {
    const randomNumber = Math.floor(Math.random() * 100)
    if (randomNumber < this.validPicture.length) {
      this.position = randomNumber
    } else {
      this.generateNumber()
    }
  }

  // MARVEL API
  apiMarvel() {
    const publicKey = Environment.marvel.publicKey
    const baseUrl = Environment.marvel.baseUrl
    const offset = Math.floor(Math.random() * 1400)
    const limit = 20

    const endpointApi = `${baseUrl}characters?offset=${offset}&limit=${limit}&apikey=${publicKey}`

    return this.http.get(endpointApi)
  }

  // LOG FUNCTION
  addLogText(logObj: ILogText) {
    const logsCollection: AngularFirestoreCollection<
      ILogText
    > = this.afs.collection('logs')
    logsCollection.add(logObj).catch(error => error)
  }

  async addLog(logObj: ILog) {
    const logsCollection: AngularFirestoreCollection<
      ILog
    > = this.afs.collection('logs')
    try {
      return logsCollection.add(logObj)
    } catch (error) {
      return error
    }
  }
}
