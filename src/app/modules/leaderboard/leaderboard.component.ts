import { Component, TemplateRef } from '@angular/core'
import { MatDialog } from '@angular/material'

import { AuthService } from '@services/auth.service'
import { FirestoreService } from '@services/firestore.service'

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent {
  aboutLeadDialog: any

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    public fss: FirestoreService
  ) {}

  // Dialog Box
  openDialog(aboutLead: TemplateRef<any>): void {
    this.aboutLeadDialog = this.dialog.open(aboutLead, {
      position: {
        top: '2vh'
      },
      minHeight: '70vh',
      maxWidth: '96vw',
      maxHeight: '96vh',
      autoFocus: false
    })
  }
}
