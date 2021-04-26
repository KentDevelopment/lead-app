import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private afs: AngularFirestore) {}

  /**
   * Update a path in the database
   *
   * @param path A valid path to Cloud Firestore
   * @param data The values to be updated
   */
  updateAt(path: string, data: object): Promise<any> {
    const segments = path.split('/').filter((v) => v)
    if (segments.length % 2) {
      // Odd is always a collection
      return this.afs.collection(path).add(data)
    } else {
      // Even is always document
      return this.afs.doc(path).set(data, { merge: true })
    }
  }

  /**
   * Delete a path in the database
   *
   * @param path A valid path to Cloud Firestore
   */
  delete(path: string) {
    return this.afs.doc(path).delete()
  }
}
