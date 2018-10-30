import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore'

import { AuthService } from '@core/authentication/auth.service'
import { ICourse } from '@core/interfaces/course'
import { ILog } from '@core/interfaces/log'
import { IUser } from '@core/interfaces/user'

import { Observable } from 'rxjs'

@Injectable()
export class FirestoreService {
  usersCollection: AngularFirestoreCollection<IUser>
  orderedUsers$Collection: AngularFirestoreCollection<IUser>
  coursesCollection: AngularFirestoreCollection<ICourse>
  logsCollection: AngularFirestoreCollection<ILog>

  users$: Observable<IUser[]>
  localUsers$: Observable<IUser[]>
  orderedUsers$: Observable<IUser[]>
  courses$: Observable<ICourse[]>
  logs$: Observable<ILog[]>

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
          .collection<IUser>('users', res =>
            res.where('campus', '==', 'Sydney').orderBy('points', 'desc')
          )
          .valueChanges()
        this.orderedUsers$ = afs
          .collection<IUser>('users', res =>
            res.orderBy('campus', 'desc').orderBy('displayName', 'asc')
          )
          .valueChanges()
        this.logs$ = afs
          .collection<ILog>('logs', res => res.orderBy('date', 'desc'))
          .valueChanges()
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
        this.logs$ = afs
          .collection<ILog>('logs', res => res.orderBy('date', 'desc'))
          .valueChanges()
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
        this.logs$ = afs
          .collection<ILog>('logs', res => res.orderBy('date', 'desc'))
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
      const data: ILog = {
        log,
        adminName: ref.displayName,
        date: new Date().getTime()
      }

      logRef.add(data).catch(error => error)
    })
  }
}
