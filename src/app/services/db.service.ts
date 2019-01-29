import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
// import { Observable } from 'rxjs'
// import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private afs: AngularFirestore) {}

  // collection$(path, query?): Observable<any> {
  //   return this.afs
  //     .collection(path, query)
  //     .snapshotChanges()
  //     .pipe(
  //       map(actions => {
  //         return actions.map(a => {
  //           const data: object = a.payload.doc.data()
  //           const id = a.payload.doc.id
  //           return { id, ...data }
  //         })
  //       })
  //     )
  // }
  //
  // doc$(path) {
  //   return this.afs
  //     .doc(path)
  //     .snapshotChanges()
  //     .pipe(
  //       map(doc => {
  //         const data: object = doc.payload.data()
  //         const id = doc.payload.id
  //         const ref = doc.payload.ref
  //
  //         return data
  //         // return { id, ref, ...data }
  //       })
  //     )
  // }

  updateAt(path: string, data: object): Promise<any> {
    const segments = path.split('/').filter(v => v)
    if (segments.length % 2) {
      // Odd is always a collection
      return this.afs.collection(path).add(data)
    } else {
      // Even is always document
      return this.afs.doc(path).set(data, { merge: true })
    }
  }

  delete(path: string) {
    return this.afs.doc(path).delete()
  }
}
