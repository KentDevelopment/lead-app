import { Component, OnInit, TemplateRef } from '@angular/core'
import { MatDialog } from '@angular/material'

import { AuthService } from '@core/authentication/auth.service'
import { FirestoreService } from '@core/firestore.service'

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  aboutLeadDialog: any

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    public fss: FirestoreService
  ) {}

  ngOnInit() {}

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
