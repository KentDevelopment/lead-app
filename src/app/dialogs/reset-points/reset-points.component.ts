import { DatePipe } from '@angular/common'
import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { LogReset } from '@interfaces/log'
import { AuthService } from '@services/auth.service'
import { DbService } from '@services/db.service'
import { FirestoreService } from '@services/firestore.service'
import { ToastService } from '@services/toast.service'
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-reset-points',
  templateUrl: './reset-points.component.html',
  styleUrls: ['./reset-points.component.scss']
})
export class ResetPointsComponent {
  constructor(
    private dialogRef: MatDialogRef<ResetPointsComponent>,
    private auth: AuthService,
    private fss: FirestoreService,
    private toast: ToastService,
    private datePipe: DatePipe,
    private db: DbService
  ) {}

  deletePoints() {
    const dateToReset = Date.parse('01 Jan 2020 00:00:00 GMT+1000')
    const myDate = Date.now()

    if (myDate <= dateToReset) {
      const displayResetDate = this.datePipe.transform(
        dateToReset,
        'mediumDate'
      )
      this.toast.showWarning(`Please come back after ${displayResetDate}`)
      return this.closeDialog()
    } else {
      this.fss.usersByName$.pipe(take(1)).subscribe(users => {
        for (const user of users) {
          this.db
            .updateAt(`users/${user.uid}`, { points: 0 })
            .then(() => {
              this.auth.user$.subscribe(admin => {
                const resetDate = this.datePipe.transform(myDate, 'medium')
                const dataObj: LogReset = {
                  message: `successfully deleted all points on ${resetDate}`,
                  adminName: admin.displayName,
                  date: new Date().getTime()
                }
                // TODO: Adjust the obj format to record the log
                this.fss.addLog(dataObj)
                this.toast.showSuccess(
                  `All points have been successfully deleted`
                )
              })
            })
            .catch(error => {
              this.toast.showError(error)
            })
            .finally(() => {
              this.closeDialog()
            })
        }
      })
    }
  }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
