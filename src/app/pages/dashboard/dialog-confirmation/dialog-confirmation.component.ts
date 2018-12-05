import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material'

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogConfirmationComponent>) {}

  ngOnInit() {}

  noClicked(): void {
    this.dialogRef.close(false)
  }

  updatePoints() {
    this.dialogRef.close(true)
  }
}
