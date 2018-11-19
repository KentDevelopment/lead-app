import { Component } from '@angular/core'
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material'

import { AuthService } from '@core/authentication/auth.service'
import { FirestoreService } from '@core/firestore.service'

import { take } from 'rxjs/operators'

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'
import { IUser } from '@core/interfaces/user'
import { ILogText } from '@core/interfaces/log'

@Component({
  selector: 'app-reset-points',
  templateUrl: './reset-points.component.html',
  styleUrls: ['./reset-points.component.scss']
})
export class ResetPointsComponent {
  myTime: any = new Date()

  constructor(
    public dialogRef: MatDialogRef<ResetPointsComponent>,
    public auth: AuthService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public fss: FirestoreService,
    private afs: AngularFirestore
  ) {}

  deletePoints() {
    const dateToReset = '01 Jan 2019 00:00:00 GMT+1000'
    const dateToResetParsed = Date.parse(dateToReset)
    const myTimeParsed = Date.parse(this.myTime)

    if (myTimeParsed <= dateToResetParsed) {
      this.showWarning(`Please come back after ${dateToReset}`, 'Dismiss')
    } else {
      this.fss.localUsers$.pipe(take(1)).subscribe(users => {
        for (const user of users) {
          const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${user.uid}`
          )

          const data: IUser = {
            points: 0
          }

          userRef.update(data).catch(err => {
            this.showError(`Ops, it looks like something has gone wrong`, err)
          })
        }
      })

      this.auth.user$.subscribe(admin => {
        const dataObj: ILogText = {
          log: `All points have been successfully deleted at ${this.myTime}`,
          adminName: admin.displayName,
          date: new Date().getTime()
        }
        this.fss.addLogText(dataObj)
      })

      this.showSuccess(`All points have been successfully deleted`)
    }
    this.dialogRef.close()
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  // Alerts
  showSuccess(message, action?: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000
    })
  }

  showWarning(message, action?: string) {
    this.snackBar.open(`${message}`, action, {
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  showError(title, message?, action?: string) {
    this.snackBar.open(
      `${title}
       ${message}`,
      action,
      {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 4000
      }
    )
  }
}
