import {Component, OnInit, TemplateRef} from '@angular/core'
import {
	FormControl,
	FormGroup,
	FormArray,
	FormBuilder,
	Validators
} from '@angular/forms'

import {FirestoreService} from './../core/firestore.service'
import {
	AngularFirestore,
	AngularFirestoreCollection,
	AngularFirestoreDocument
} from 'angularfire2/firestore'

import {ToastrService} from 'ngx-toastr'

import {User} from '../core/interfaces/user'
import {Course} from '../core/interfaces/course'
import {take} from 'rxjs/operators'

import {BsModalService} from 'ngx-bootstrap/modal'
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service'

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
	isActive = 'points'
	addPointsForm: FormGroup
	coursesForm: FormGroup
	modalRef: BsModalRef

	myTime: any = new Date()

	constructor(
		private fss: FirestoreService,
		private fb: FormBuilder,
		private afs: AngularFirestore,
		private toastr: ToastrService,
		private modalService: BsModalService
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
				this.showSuccess(
					`User updated successfully`,
					`${user.displayName} has ${data.points} pts`
				)
				this.fss.addLog(`${user.displayName} has ${data.points} pts`)
			})
			.catch(err => {
				this.showSuccess(`Ops, it looks like something has gone wrong`, err)
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
				const totalPoints: Number = Number(ref.points) + Number(user.points)

				const data: User = {
					uid: userUid,
					points: totalPoints
				}

				userRef
					.update(data)
					.then(() => {
						this.showSuccess(
							`User updated successfully`,
							`${ref.displayName} has ${data.points} pts`
						)
						this.fss.addLog(`${ref.displayName} has ${data.points} pts`)
						return
					})
					.catch(err => {
						this.showSuccess(`Ops, it looks like something has gone wrong`, err)
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
				this.showSuccess(
					`Course added successfully`,
					`${data.title} on ${data.date}`
				)
			})
			.catch(err => {
				this.showSuccess(`Ops, it looks like something has gone wrong`, err)
			})
	}

	deletePoints() {
		const dateToReset = '30 Dec 2018 00:00:00 GMT+1000'
		const dateToResetParsed = Date.parse(dateToReset)
		const myTimeParsed = Date.parse(this.myTime)

		if (myTimeParsed <= dateToResetParsed) {
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
							this.showSuccess(
								`Ops, it looks like something has gone wrong`,
								err
							)
						})
				}
			})

			this.modalRef.hide()
			this.fss.addLog(
				`All points have been successfully deleted at ${this.myTime}`
			)
			this.showSuccess(`All points have been successfully deleted`)
		} else {
			this.showWarning(
				`Ops, it looks like that's not the time yet`,
				`Please come back after ${dateToReset}`
			)
		}
	}

	openModal(templateRef: TemplateRef<any>) {
		this.modalRef = this.modalService.show(templateRef)
	}

	// Alerts
	showSuccess(title, message?) {
		this.toastr.success(message, title)
	}
	showWarning(title, message?) {
		this.toastr.warning(message, title)
	}
}
