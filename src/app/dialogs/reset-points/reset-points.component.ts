import { Component } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'
import { MatDialogRef } from '@angular/material/dialog'
// import { LogText } from '@interfaces/log'
import { User } from '@interfaces/user'
import { AuthService } from '@services/auth.service'
import { FirestoreService } from '@services/firestore.service'
import { ToastService } from '@services/toast.service'
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-reset-points',
  templateUrl: './reset-points.component.html',
  styleUrls: ['./reset-points.component.scss']
})
export class ResetPointsComponent {
  myTime: any = new Date()

  constructor(
    private dialogRef: MatDialogRef<ResetPointsComponent>,
    private auth: AuthService,
    private fss: FirestoreService,
    private toast: ToastService,
    private afs: AngularFirestore
  ) {}

  deletePoints() {
    const dateToReset = '01 Jan 2020 00:00:00 GMT+1000'
    const dateToResetParsed = Date.parse(dateToReset)
    const myTimeParsed = Date.parse(this.myTime)

    if (myTimeParsed <= dateToResetParsed) {
      this.toast.showWarning(`Please come back after ${dateToReset}`)
      this.dialogRef.close()
    } else {
      this.fss.localUsers$.pipe(take(1)).subscribe(users => {
        for (const user of users) {
          const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${user.uid}`
          )

          const data: User = {
            points: 0
          }

          userRef
            .update(data)
            .then(() => {
              this.auth.user$.subscribe(admin => {
                console.log('ADMIN', admin)
                // const dataObj: LogText = {
                //   log: `All points have been successfully deleted at ${
                //     this.myTime
                //   }`,
                //   adminName: admin.displayName,
                //   date: new Date().getTime()
                // }
                // this.fss.addLogText(dataObj)
                this.toast.showSuccess(
                  `All points have been successfully deleted`
                )
              })
            })
            .catch(error => {
              this.toast.showError(error)
            })
            .finally(() => {
              this.dialogRef.close()
            })
        }
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
}
