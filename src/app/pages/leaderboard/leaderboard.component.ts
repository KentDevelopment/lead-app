import { Component, TemplateRef } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { AuthService } from '@services/auth.service'
import { FirestoreService } from '@services/firestore.service'
import { AboutComponent } from './dialogs/about/about.component'

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
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
      maxWidth: '96vw',
      autoFocus: false,
    })
  }
}
