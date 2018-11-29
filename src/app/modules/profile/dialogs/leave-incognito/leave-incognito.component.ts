import { Component } from '@angular/core'

import { MatDialogRef } from '@angular/material'
import { AuthService } from '@services/auth.service'

import { IUser } from '@core/interfaces/user'

@Component({
	selector: 'app-leave-incognito',
	templateUrl: './leave-incognito.component.html',
	styleUrls: ['./leave-incognito.component.scss']
})
export class LeaveIncognitoComponent {
	user: IUser
	isLoading = false

	constructor(
		public auth: AuthService,
		private dialogRef: MatDialogRef<LeaveIncognitoComponent>
	) {
		this.auth.user$.subscribe(data => {
			this.user = data
		})
	}

	onNoClick(): void {
		this.dialogRef.close()
	}

	leaveIncognito() {
		this.isLoading = true

		this.auth
			.leaveIncognito(this.user)
			.then(() => {
				this.dialogRef.close()
			})
			.catch(error => error)
			.finally(() => {
				this.isLoading = false
			})
	}
}
