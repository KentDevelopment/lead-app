import { Component } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material'

import { AuthService } from '@services/auth.service'
import { FirestoreService } from '@services/firestore.service'
import { ToastService } from '@services/toast.service'

import { take } from 'rxjs/operators'

import {
	AngularFirestore,
	AngularFirestoreDocument
} from '@angular/fire/firestore'
import { ILogText } from '@core/interfaces/log'
import { IUser } from '@core/interfaces/user'

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
		public toast: ToastService,
		public dialog: MatDialog,
		public fss: FirestoreService,
		private afs: AngularFirestore
	) {}

	deletePoints() {
		const dateToReset = '01 Jan 2019 00:00:00 GMT+1000'
		const dateToResetParsed = Date.parse(dateToReset)
		const myTimeParsed = Date.parse(this.myTime)

		if (myTimeParsed <= dateToResetParsed) {
			this.toast.showWarning(`Please come back after ${dateToReset}`)
		} else {
			this.fss.localUsers$.pipe(take(1)).subscribe(users => {
				for (const user of users) {
					const userRef: AngularFirestoreDocument<any> = this.afs.doc(
						`users/${user.uid}`
					)

					const data: IUser = {
						points: 0
					}

					userRef.update(data).catch(error => {
						this.toast.showError(error)
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

			this.toast.showSuccess(`All points have been successfully deleted`)
		}
		this.dialogRef.close()
	}

	onNoClick(): void {
		this.dialogRef.close()
	}
}
