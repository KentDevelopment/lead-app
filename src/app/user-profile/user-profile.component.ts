import { Component, OnInit, TemplateRef } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog, MatSnackBar } from '@angular/material'
import {
	AngularFirestore,
	AngularFirestoreDocument
} from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { Ng2ImgToolsService } from 'ng2-img-tools'
import { Observable } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { User } from '../core/interfaces/user'
import { AuthService } from './../core/auth.service'

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
	dialogRef: any
	downloadURL: Observable<string>
	item: Observable<User>
	uploadPercent: Observable<number>
	user: any
	userForm: FormGroup
	version: string = environment.version

	constructor(
		private afs: AngularFirestore,
		private fb: FormBuilder,
		private ng2ImgToolsService: Ng2ImgToolsService,
		private storage: AngularFireStorage,
		public auth: AuthService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar
	) {
		this.auth.user$.subscribe(data => {
			this.user = data
		})

		this.userForm = this.fb.group({
			displayName: [{ value: '', disabled: true }],
			email: [{ value: '', disabled: true }],
			password: ['']
		})
	}

	ngOnInit() {}

	uploadFile(event) {
		// TODO: if image < 120x120 prompt an error: image it's too small
		let imgCompressed

		const file = event.target.files[0]
		const filePath = `users/${this.user.uid}`
		const storageRef = this.storage.ref(filePath)

		this.ng2ImgToolsService.resizeExactCrop([file], 130, 130).subscribe(
			imgResized => {
				imgCompressed = new File([imgResized], this.user.uid)

				const task = this.storage.upload(filePath, imgCompressed)

				this.uploadPercent = task.percentageChanges()

				task
					.snapshotChanges()
					.pipe(
						finalize(() => {
							this.downloadURL = storageRef.getDownloadURL()
							this.downloadURL.subscribe(ref => {
								this.update(this.user, ref).catch(err => console.error(err))
							})
						})
					)
					.subscribe()
			},
			error => {
				console.error('ERROR', error)
			}
		)
	}

	update(user: User, downloadURL) {
		// Sets user data to firestore on login
		const userRef: AngularFirestoreDocument<any> = this.afs.doc(
			`users/${user.uid}`
		)

		const data: User = {
			photoURL: downloadURL
		}

		return userRef.update(data).catch(err => {
			console.error('Update error', err)
		})
	}

	confirmIncognito() {
		this.auth
			.leaveIncognito(this.user)
			.then(() => {
				this.dialogRef.close()
			})
			.catch(err => console.error(err))
	}

	// Dialog Box
	openDialog(leaveIncognito: TemplateRef<any>): void {
		this.dialogRef = this.dialog.open(leaveIncognito, {
			autoFocus: false
		})
	}

	closeDialog() {
		this.dialogRef.close()
	}

	showError(title, message?, action?: string) {
		this.snackBar.open(
			`${title}
			${message}`,
			action,
			{
				horizontalPosition: 'right',
				verticalPosition: 'top',
				duration: 4000
			}
		)
	}
}
