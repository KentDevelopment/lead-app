import { Component, OnInit, TemplateRef } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog } from '@angular/material'
import { AuthService } from './../core/auth.service'
import { FirestoreService } from './../core/firestore.service'

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  authUser: any
  dialogRef: any
  isActive = 'points'
  myDate: Date = new Date()
  userForm: FormGroup
  users: any

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    public dialog: MatDialog,
    public fss: FirestoreService
  ) {
    this.userForm = this.fb.group({
      displayName: [''],
      email: [''],
      password: ['']
    })
  }

  ngOnInit() {}

  toggle(ref) {
    this.isActive = ref
  }

  // Dialog Box
  openDialog(aboutLead: TemplateRef<any>): void {
    this.dialogRef = this.dialog.open(aboutLead, {
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
