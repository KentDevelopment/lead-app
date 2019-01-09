import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { User } from '@interfaces/user'
import { AuthService } from '@services/auth.service'

@Component({
  selector: 'app-leave-incognito',
  templateUrl: './leave-incognito.component.html',
  styleUrls: ['./leave-incognito.component.scss']
})
export class LeaveIncognitoComponent {
  user: User
  isLoading = false

  constructor(
    private auth: AuthService,
    private dialogRef: MatDialogRef<LeaveIncognitoComponent>
  ) {
    this.auth.user$.subscribe(data => {
      this.user = data
    })
  }

  closeDialog(): void {
    this.dialogRef.close()
  }

  leaveIncognito() {
    this.isLoading = true

    this.auth
      .leaveIncognito(this.user)
      .then(() => {
        this.dialogRef.close()
      })
      .catch(error => error)
      .finally(() => {
        this.isLoading = false
      })
  }
}
