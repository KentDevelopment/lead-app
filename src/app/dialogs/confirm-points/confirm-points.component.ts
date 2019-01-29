import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-confirm-points',
  templateUrl: './confirm-points.component.html',
  styleUrls: ['./confirm-points.component.scss']
})
export class ConfirmPointsComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<ConfirmPointsComponent>) {}

  ngOnInit() {}

  noClicked(): void {
    this.dialogRef.close(false)
  }

  updatePoints() {
    this.dialogRef.close(true)
  }
}
