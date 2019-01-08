import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent {
  constructor(private dialogRef: MatDialogRef<DialogConfirmationComponent>) {}

  noClicked(): void {
    this.dialogRef.close(false)
  }

  updatePoints() {
    this.dialogRef.close(true)
  }
}
