import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore'

import { Log, NewLog } from '@interfaces/log'
import { User } from '@interfaces/user'
import { AuthService } from '@services/auth.service'
import { Observable } from 'rxjs'

import { Environment } from '@environments/environment'
import { Marvel, Results } from '@interfaces/marvel'
import { map } from 'rxjs/operators'
import { DbService } from './db.service'

@Injectable()
export class FirestoreService {
  usersCollection: AngularFirestoreCollection<User>

  users$: Observable<User[]>
  localUsers$: Observable<User[]>
  orderedUsers$: Observable<User[]>
  logs$: Observable<Log[]>

  position: number
  validPicture = []

  userData
  adminData

  logsCollectionRef = this.afs.collection('logs').ref

  constructor(
    private db: DbService,
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

    // this.userRef = afs.collection('users').doc('0QspwDQ2f1ZtJrWSrcfqOylc8uZ2').ref

    // let uRef: DocumentReference = this.afs
    // .collection<User>('users').snapshotChanges()
    // .pipe(
    //       map(actions => {
    //         console.log('ACTIONS', actions)
    //         return actions.map(a => {
    //           return a.payload.doc.ref
    // })}))

    // let userData = this.userRef.get().then(ref => {
    //   console.log('REF', ref.data)
    //   return ref.data
    //   // console.log('REF', ref.data.call())
    // })
    //
    // userData.then(res => {
    //   console.log('RES', res.arguments)
    // })

    // console.log('TEST', userData)
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
  async addLog(refObj: NewLog) {
    this.auth.user$.subscribe(adminData => {
      let dataObj: NewLog = {
        ...refObj,
        adminId: adminData.uid
      }

      try {
        return this.afs.collection('logs').add(dataObj)
      } catch (error) {
        return error
      }
    })
  }

  getLogs() {
    return (this.logs$ = this.afs
      .collection<Log>('logs', res => res.orderBy('date', 'desc'))
      .valueChanges()).pipe(
      map(res => {
        return res.map((logItem: any) => {
          // console.log('LOGITEM', logItem)

          this.db.doc$(`/users/${logItem.userId}`).subscribe(userData => {
            // console.log('USERDATA', userData)
            // this.userData = userData
          })

          this.db.doc$(`/users/${logItem.adminId}`).subscribe(adminData => {
            // console.log('ADMINDATA', adminData)
            // this.adminData = adminData
          })

          const newData: any = {
            ...logItem
          }
          return newData
        })
      })
    )
  }

  getLogsValue() {
    return this.afs
      .collection<Log>('logs', res => res.orderBy('date', 'desc'))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data: Object = a.payload.doc.data()
            const id = a.payload.doc.id
            const additionalData = {
              userId: 'string',
              userPicture: 'assets/placeholders/placeholder-user',
              userName: 'string',
              userEmail: 'string',
              userCampus: 'string',
              pointsCurrent: 123,
              message: 'string'
            }
            return data
            // return { id, ...additionalData, ...data }
          })
        })
      )
  }
}
