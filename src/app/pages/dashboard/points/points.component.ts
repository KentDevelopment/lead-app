import { Component } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'
import { User } from '@interfaces/user'
import { FirestoreService } from '@services/firestore.service'
import { take } from 'rxjs/operators'
import { DashboardService } from '../dashboard.service'

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent {
  constructor(
    public fss: FirestoreService,
    private dashboardService: DashboardService,
    private afs: AngularFirestore
  ) {}

  // Add Points to one user onChange - Update the user value at the DB
  update(user: User, newPoints: number) {
    const userDoc: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    )

    userDoc
      .valueChanges()
      .pipe(take(1))
      .subscribe(userRef => {
        const addedPoints = newPoints - userRef.points
        const points = newPoints

        const newData: User = {
          points
        }

        this.dashboardService.updateData(userDoc, newData)
        this.dashboardService.logData(points, addedPoints, userRef)
      })
  }
}
