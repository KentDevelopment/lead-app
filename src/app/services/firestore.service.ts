import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { Environment } from '@environments/environment'
import { Log, LogReset } from '@interfaces/log'
import { Marvel, Results } from '@interfaces/marvel'
import { User } from '@interfaces/user'
import { AuthService } from '@services/auth.service'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
// import { DbService } from './db.service';

@Injectable()
export class FirestoreService {
  users$: Observable<User[]>
  usersByPoints$: Observable<User[]>
  usersByName$: Observable<User[]>
  logs$: Observable<Log[]>

  position: number
  validPicture = []

  constructor(
    // private db: DbService,
    private afs: AngularFirestore,
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.auth.user$.subscribe(userRef => {
      if (
        userRef.email === 'lyndall.benton@kent.edu.au' ||
        userRef.email === 'k170535@student.kent.edu.au'
      ) {
        this.usersByPoints$ = afs
          .collection<User>('users', ref => ref.orderBy('points', 'desc'))
          .valueChanges()
        this.usersByName$ = afs
          .collection<User>('users', ref =>
            ref.orderBy('campus', 'desc').orderBy('displayName', 'asc')
          )
          .valueChanges()
        this.getLogs()
      } else {
        this.usersByPoints$ = afs
          .collection<User>('users', ref =>
            ref.where('campus', '==', userRef.campus).orderBy('points', 'desc')
          )
          .valueChanges()
        this.usersByName$ = afs
          .collection<User>('users', ref =>
            ref
              .where('campus', '==', userRef.campus)
              .orderBy('displayName', 'asc')
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

        this.usersByPoints$.subscribe((users: any) => {
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
    const publicKey = Environment.marvel.publicKey
    const baseUrl = Environment.marvel.baseUrl
    const offset = Math.floor(Math.random() * 1400)
    const limit = 20

    const endpointApi = `${baseUrl}characters?offset=${offset}&limit=${limit}&apikey=${publicKey}`

    return this.http.get(endpointApi).pipe(
      map((res: Marvel): Results[] => {
        return res.data.results
      })
    )
  }

  // LOG FUNCTION
  async addLog(refObj: LogReset | Log) {
    this.auth.user$.subscribe(adminData => {
      const dataObj = {
        ...refObj,
        adminId: adminData.uid,
        adminName: adminData.displayName
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
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data: Log = a.payload.doc.data()
            return data
          })
        })
      ))
  }
}
