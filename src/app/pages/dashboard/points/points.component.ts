import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { ConfirmPointsComponent } from '@dialogs/confirm-points/confirm-points.component'
import { User } from '@interfaces/user'
import { DbService } from '@services/db.service'
import { FirestoreService } from '@services/firestore.service'
import { ToastService } from '@services/toast.service'
import { DashboardService } from '../dashboard.service'

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
})
export class PointsComponent implements OnInit {
  dialogRef: MatDialogRef<ConfirmPointsComponent>
  pointsFormControl = new FormControl(null)

  constructor(
    public fss: FirestoreService,
    private dialog: MatDialog,
    private toast: ToastService,
    private dashboardService: DashboardService,
    private db: DbService
  ) {}

  ngOnInit() {
    this.pointsFormControl.valueChanges.subscribe((val) => {
      if (val > 2000) {
        this.toast.showInfo(`😲 That's a really high score`)
      }
    })
  }

  checkPoints(user: User) {
    const originalPoints = user.points
    const newPoints: number = this.pointsFormControl.value
    const limitPoints = 200
    const addedPoints = newPoints - originalPoints

    if (addedPoints > limitPoints) {
      this.openDialog(user.displayName)
      this.dialogRef.afterClosed().subscribe((acceptedChanges) => {
        if (acceptedChanges) {
          this.updatePoints(user, newPoints, addedPoints)
        } else {
          window.location.reload()
        }
      })
    } else {
      this.updatePoints(user, newPoints, addedPoints)
    }
  }

  private updatePoints(user: User, newPoints: number, addedPoints: number) {
    this.db
      .updateAt(`users/${user.uid}`, { points: Number(newPoints) })
      .then(() => {
        if (addedPoints) {
          this.dashboardService.logData(newPoints, addedPoints, user)
        }
      })
      .catch((err) => {
        this.toast.showError(err)
      })
  }

  private openDialog(userName: string): void {
    this.dialogRef = this.dialog.open(ConfirmPointsComponent, {
      autoFocus: false,
      data: {
        userPoints: this.pointsFormControl.value,
        userName,
      },
    })
  }
}
