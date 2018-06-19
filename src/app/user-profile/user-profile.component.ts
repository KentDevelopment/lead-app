import {Component, OnInit, TemplateRef} from '@angular/core'
import {FormGroup, FormBuilder} from '@angular/forms'
import {finalize} from 'rxjs/operators'

import {
	AngularFirestore,
	AngularFirestoreDocument
} from 'angularfire2/firestore'

import {AngularFireStorage} from 'angularfire2/storage'
import {Observable} from 'rxjs'

import {AuthService} from './../core/auth.service'

import {BsModalService} from 'ngx-bootstrap/modal'
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service'

import {Ng2ImgToolsService} from 'ng2-img-tools'

import {User} from '../core/interfaces/user'

import {environment} from '../../environments/environment'

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
	item: Observable<User>
	modalRef: BsModalRef
	version: string = environment.version

	uploadPercent: Observable<number>
	downloadURL: Observable<string>

	userForm: FormGroup
	user: any

	constructor(
		public auth: AuthService,
		private fb: FormBuilder,
		private storage: AngularFireStorage,
		private afs: AngularFirestore,
		private ng2ImgToolsService: Ng2ImgToolsService,
		private modalService: BsModalService
	) {
		this.auth.user$.subscribe(data => {
			this.user = data
		})

		this.userForm = this.fb.group({
			displayName: [{value: '', disabled: true}],
			email: [{value: '', disabled: true}],
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
								this.update(this.user, ref)
							})
						})
					)
					.subscribe()
			},
			error => {
				console.log('ERROR', error)
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

		return userRef.set(data, {merge: true})
	}

	openModal(templateRef: TemplateRef<any>) {
		this.modalRef = this.modalService.show(templateRef)
	}

	confirmIncognito() {
		this.auth.leaveIncognito(this.user)
		this.modalRef.hide()
	}
}
