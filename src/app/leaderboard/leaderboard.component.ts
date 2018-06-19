import {Component, OnInit, TemplateRef} from '@angular/core'
import {FormGroup, FormBuilder} from '@angular/forms'

import {AuthService} from './../core/auth.service'
import {FirestoreService} from './../core/firestore.service'

import {BsModalService} from 'ngx-bootstrap/modal'
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service'

@Component({
	selector: 'app-leaderboard',
	templateUrl: './leaderboard.component.html',
	styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
	modalRef: BsModalRef
	userForm: FormGroup

	isActive = 'points'

	users: any
	authUser: any
	oneUser: any
	secrets: any = []

	myDate: Date = new Date()

	constructor(
		public auth: AuthService,
		private fb: FormBuilder,
		public fss: FirestoreService,
		private modalService: BsModalService
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

	openModal(aboutLead: TemplateRef<any>) {
		this.modalRef = this.modalService.show(aboutLead)
	}
}
