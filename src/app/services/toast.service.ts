import { Injectable } from '@angular/core'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material'

@Injectable({
	providedIn: 'root'
})
export class ToastService {
	snackBarConfig: MatSnackBarConfig = {
		duration: 5000,
		horizontalPosition: 'right',
		verticalPosition: 'top'
	}

	snackBarInfo: MatSnackBarConfig = {
		...this.snackBarConfig,
		panelClass: 'snackBarInfo'
	}

	snackBarSuccess: MatSnackBarConfig = {
		...this.snackBarConfig,
		duration: 4000,
		panelClass: 'snackBarSuccess'
	}

	snackBarWarning: MatSnackBarConfig = {
		...this.snackBarConfig,
		duration: null,
		panelClass: 'snackBarWarning'
	}

	snackBarError: MatSnackBarConfig = {
		...this.snackBarConfig,
		duration: null,
		panelClass: 'snackBarError'
	}

	constructor(public snackBar: MatSnackBar) {}

	showSuccess(message) {
		this.snackBar.open(message, '', this.snackBarSuccess)
	}

	showInfo(message) {
		this.snackBar.open(message, '', this.snackBarInfo)
	}

	showWarning(message) {
		this.snackBar.open(message, 'Dismiss', this.snackBarWarning)
	}

	showError(message) {
		this.snackBar.open(message, 'Ok', this.snackBarError)
	}
}
