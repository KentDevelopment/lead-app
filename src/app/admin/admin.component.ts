import { Component, OnInit, TemplateRef } from '@angular/core'
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms'
import { MatDialog, MatSnackBar } from '@angular/material'
import {
	AngularFirestore,
	AngularFirestoreCollection,
	AngularFirestoreDocument
} from 'angularfire2/firestore'
import { take } from 'rxjs/operators'
import { Course } from '../core/interfaces/course'
import { User } from '../core/interfaces/user'
import { FirestoreService } from './../core/firestore.service'

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
	addPointsForm: FormGroup
	coursesForm: FormGroup
	dialogRef: any
	isActive = 'points'
	myTime: any = new Date()

	constructor(
		private fss: FirestoreService,
		private fb: FormBuilder,
		private afs: AngularFirestore,
		public dialog: MatDialog,
		public snackBar: MatSnackBar
	) {
		this.addPointsForm = this.fb.group({
			uid: this.fb.array([]),
			points: Number['']
		})

		this.coursesForm = this.fb.group({
			title: ['', Validators.required],
			points: ['', Validators.required],
			url: ['', Validators.required],
			location: ['', Validators.required],
			date: ['', Validators.required],
			campus: ['', Validators.required]
		})
	}

	ngOnInit() {}

	// Toggle the menu
	toggle(ref) {
		this.isActive = ref
	}

	// Add Points to one user onChange - Update the user value at the DB
	update(user, event) {
		const userRef: AngularFirestoreDocument<any> = this.afs.doc(
			`users/${user.uid}`
		)

		const data: User = {
			points: Number(event.target.value)
		}

		userRef
			.update(data)
			.then(() => {
				this.fss.addLog(`${user.displayName} has ${data.points} pts`)
				this.showSuccess(`User ${user.displayName} has ${data.points} pts`)
			})
			.catch(err => {
				this.showError(`Ops, it looks like something has gone wrong`, err)
				console.error(err)
			})
	}

	// Push or remove item from the array
	onChange(uid: string, isChecked: boolean) {
		const pointsFormArray = <FormArray>this.addPointsForm.controls.uid

		if (isChecked) {
			pointsFormArray.push(new FormControl(uid))
		} else {
			const index = pointsFormArray.controls.findIndex(x => x.value === uid)
			pointsFormArray.removeAt(index)
		}
	}

	// Add Points in Bulk
	addPoints(user) {
		for (const userUid of this.addPointsForm.value.uid) {
			const userRef: AngularFirestoreDocument<any> = this.afs.doc(
				`users/${userUid}`
			)

			const item = userRef.valueChanges().pipe(take(1))

			item.subscribe(ref => {
				const totalPoints: number = Number(ref.points) + Number(user.points)

				const data: User = {
					uid: userUid,
					points: totalPoints
				}

				userRef
					.update(data)
					.then(() => {
						this.fss.addLog(`${ref.displayName} has ${data.points} pts`)
					})
					.then(() => {
						this.showSuccess(
							// `User ${ref.displayName} has ${data.points} pts`
							`Points successfully added`
						)
					})
					.catch(err => {
						this.showError(`Ops, it looks like something has gone wrong`, err)
					})
			})
		}
	}

	courseSignup(formData) {
		const courseRef: AngularFirestoreCollection<any> = this.afs.collection(
			`courses`
		)

		const data: Course = {
			title: formData.title,
			points: formData.points,
			url: formData.url,
			location: formData.location,
			date: formData.date,
			campus: formData.campus
		}

		courseRef
			.add(data)
			.then(() => {
				this.showSuccess(`Course ${data.title} added on ${data.date}`)
			})
			.catch(err => {
				this.showError(`Ops, it looks like something has gone wrong`, err)
			})
	}

	deletePoints() {
		const dateToReset = '01 Jan 2019 00:00:00 GMT+1000'
		const dateToResetParsed = Date.parse(dateToReset)
		const myTimeParsed = Date.parse(this.myTime)

		if (myTimeParsed <= dateToResetParsed) {
			this.showWarning(`Please come back after ${dateToReset}`, 'Dismiss')
		} else {
			this.fss.localUsers$.pipe(take(1)).subscribe(users => {
				for (const user of users) {
					// let randomNumber = Math.random() * 1000

					const userRef: AngularFirestoreDocument<any> = this.afs.doc(
						`users/${user.uid}`
					)

					const data: User = {
						// points: Number(randomNumber.toFixed(0))
						points: 0
					}

					userRef
						.update(data)
						.then(() => {
							console.log(`${user.displayName} has ${data.points} pts`)
							return
						})
						.catch(err => {
							this.showError(`Ops, it looks like something has gone wrong`, err)
						})
				}
			})
			this.fss.addLog(
				`All points have been successfully deleted at ${this.myTime}`
			)
			this.showSuccess(`All points have been successfully deleted`)
		}
		this.dialogRef.close()
	}

	// Dialog Box
	openDialog(resetPoints: TemplateRef<any>): void {
		this.dialogRef = this.dialog.open(resetPoints)
	}

	// Alerts
	showSuccess(message, action?: string) {
		this.snackBar.open(message, action, {
			horizontalPosition: 'right',
			verticalPosition: 'top',
			duration: 3000
		})
	}

	showWarning(message, action?: string) {
		this.snackBar.open(`${message}`, action, {
			horizontalPosition: 'right',
			verticalPosition: 'top'
		})
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
