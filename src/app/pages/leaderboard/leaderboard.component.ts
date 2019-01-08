import { AboutComponent } from './dialogs/about/about.component'
import { AuthService } from '@services/auth.service'
import { Component, TemplateRef } from '@angular/core'
import { FirestoreService } from '@services/firestore.service'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent {
  dialogRef: TemplateRef<AboutComponent>

  constructor(
    public auth: AuthService,
    public fss: FirestoreService,
    private dialog: MatDialog
  ) {}

  openDialog(): void {
    this.dialog.open(AboutComponent, {
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
