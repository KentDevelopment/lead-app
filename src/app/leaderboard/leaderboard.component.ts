import {Component, OnInit, TemplateRef} from '@angular/core'
import {FormGroup, FormBuilder} from '@angular/forms'

import {AuthService} from './../core/auth.service'
import {FirestoreService} from './../core/firestore.service'

import {MatDialog} from '@angular/material'

@Component({
	selector: 'app-leaderboard',
	templateUrl: './leaderboard.component.html',
	styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
	userForm: FormGroup

	isActive = 'points'

	users: any
	authUser: any
	oneUser: any
	secrets: any = []

	myDate: Date = new Date()

	dialogRef: any

	constructor(
		public auth: AuthService,
		private fb: FormBuilder,
		public fss: FirestoreService,
		public dialog: MatDialog
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
		this.dialogRef = this.dialog.open(aboutLead)
	}

	closeDialog() {
		this.dialogRef.close()
	}
}
