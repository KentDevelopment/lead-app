import { Component } from '@angular/core'

import { MatDialogRef } from '@angular/material'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  constructor(private dialogRef: MatDialogRef<AboutComponent>) {}

  closeModal(): void {
    this.dialogRef.close()
  }
}
