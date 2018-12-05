import { Component } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'
import { User } from '@interfaces/user'
import { FirestoreService } from '@services/firestore.service'
import { take } from 'rxjs/operators'
import { DashboardService } from '../dashboard.service'
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component'
import { MatDialog, MatDialogRef } from '@angular/material'
import { FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent {
  dialogRef: MatDialogRef<DialogConfirmationComponent>
  pointsInputForm = new FormControl('', Validators.required)

  constructor(
    public fss: FirestoreService,
    public dialog: MatDialog,
    private dashboardService: DashboardService,
    private afs: AngularFirestore
  ) {}

  // Add Points to one user onChange - Update the user value at the DB
  update(user: User, newPoints: number, confirmed?: boolean) {
    console.log('CONFIRMED', confirmed)

    const userDoc: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    )

    const userData$ = userDoc.valueChanges().pipe(take(1))

    userData$.subscribe(userRef => {
      const addedPoints = newPoints - userRef.points
      const points = confirmed ? newPoints : userRef.points
      console.log('POINTS', points)

      this.dashboardService.updateData(userDoc, { points })
      if (confirmed) {
        this.dashboardService.logData(points, addedPoints, userRef)
      } else {
        this.pointsInputForm.updateValueAndValidity()
        // this.pointsInputForm.reset(this.pointsInputForm);
        // console.log('THIS.POINTSINPUTFORM', this.pointsInputForm)
      }
    })
  }

  openDialogConfirmation(user: User, newPoints: number): void {
    this.dialogRef = this.dialog.open(DialogConfirmationComponent, {
      autoFocus: false
    })

    this.dialogRef.beforeClose().subscribe((confirmed: boolean) => {
      this.update(user, newPoints, confirmed)
    })
  }
}
