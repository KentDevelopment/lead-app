import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatDialogRef } from '@angular/material/dialog'

export interface DialogData {
  userPoints: string
  userName: string
}

@Component({
  selector: 'app-confirm-points',
  templateUrl: './confirm-points.component.html',
  styleUrls: ['./confirm-points.component.scss'],
})
export class ConfirmPointsComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmPointsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  noClicked(): void {
    this.dialogRef.close(false)
  }

  updatePoints() {
    this.dialogRef.close(true)
  }
}
