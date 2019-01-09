import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore'
import { Environment } from '@environments/environment'
import { Log, LogText } from '@interfaces/log'
import { Marvel, Results } from '@interfaces/marvel'
import { User } from '@interfaces/user'
import { AuthService } from '@services/auth.service'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class FirestoreService {
  usersCollection: AngularFirestoreCollection<User>

  users$: Observable<User[]>
  localUsers$: Observable<User[]>
  orderedUsers$: Observable<User[]>
  logs$: Observable<Log[]>

  position: number
  validPicture = []

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
    private auth: AuthService
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
        this.getLogs()
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
        this.getLogs()
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
        this.getLogs()
      }

      this.apiMarvel().subscribe((res: Results[]) => {
        for (const thumb of res) {
          if (
            thumb.thumbnail.path !==
              'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' &&
            thumb.thumbnail.extension !== 'gif'
          ) {
            thumb.thumbnail.path += '/standard_medium'
            this.validPicture.push(thumb)
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
      .collection<Log>('logs', res => res.orderBy('date', 'desc'))
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

    return this.http.get(endpointApi).pipe(
      map(
        (res: Marvel): Results[] => {
          return res.data.results
        }
      )
    )
  }

  // LOG FUNCTION
  addLogText(logObj: LogText) {
    const logsCollection: AngularFirestoreCollection<
      LogText
    > = this.afs.collection('logs')
    logsCollection.add(logObj).catch(error => error)
  }

  async addLog(logObj: Log) {
    const logsCollection: AngularFirestoreCollection<Log> = this.afs.collection(
      'logs'
    )
    try {
      return logsCollection.add(logObj)
    } catch (error) {
      return error
    }
  }
}
