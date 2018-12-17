import { Component } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'
import { User } from '@interfaces/user'
import { FirestoreService } from '@services/firestore.service'
import { take } from 'rxjs/operators'
import { DashboardService } from '../dashboard.service'

// import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component'
// import { MatDialog, MatDialogRef } from '@angular/material'
import { FormControl } from '@angular/forms'
import { ToastService } from '@services/toast.service'

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent {
  // dialogRef: MatDialogRef<DialogConfirmationComponent>
  pointsInputForm = new FormControl('')

  constructor(
    public fss: FirestoreService,
    // public dialog: MatDialog,
    public toast: ToastService,
    private dashboardService: DashboardService,
    private afs: AngularFirestore
  ) {}

  // Add Points to one user onChange - Update the user value at the DB
  update(user: User, newPoints: number) {
    const userDoc: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    )

    const userData$ = userDoc.valueChanges().pipe(take(1))

    userData$.subscribe(userRef => {
      const addedPoints = newPoints - userRef.points
      const points = Number(newPoints)

      if (addedPoints > 700) {
        return this.toast.showError(`Please add less than 700 points`)
      }

      const newData: User = {
        points
      }

      this.dashboardService.updateData(userDoc, newData)
      this.dashboardService.logData(points, addedPoints, userRef)
    })
  }

  // openDialogConfirmation(): void {
  //   this.dialogRef = this.dialog.open(DialogConfirmationComponent, {
  //     autoFocus: false
  //   })
  // }
}
