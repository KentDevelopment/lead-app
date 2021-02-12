import { Injectable } from '@angular/core'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  /** Create various config options for each message */
  snackBarConfig: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  }

  snackBarInfo: MatSnackBarConfig = {
    ...this.snackBarConfig,
    panelClass: 'snack-bar-info',
  }

  snackBarSuccess: MatSnackBarConfig = {
    ...this.snackBarConfig,
    duration: 5000,
    panelClass: 'snack-bar-success',
  }

  snackBarWarning: MatSnackBarConfig = {
    ...this.snackBarConfig,
    duration: null,
    panelClass: 'snack-bar-warning',
  }

  snackBarError: MatSnackBarConfig = {
    ...this.snackBarConfig,
    duration: null,
    panelClass: 'snack-bar-error',
  }

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Show a success message
   *
   * @param message
   */
  showSuccess(message: string) {
    this.snackBar.open(message, '', this.snackBarSuccess)
  }

  /**
   * Show an info message
   *
   * @param message
   */
  showInfo(message: string) {
    this.snackBar.open(message, '', this.snackBarInfo)
  }

  /**
   * Show a warning message
   *
   * @param message
   */
  showWarning(message: string) {
    this.snackBar.open(message, 'Dismiss', this.snackBarWarning)
  }

  /**
   * Show an error message
   *
   * @param message
   */
  showError(message: string) {
    this.snackBar.open(message, 'Ok', this.snackBarError)
  }
}
