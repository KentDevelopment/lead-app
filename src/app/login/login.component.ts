import {Component, OnInit} from '@angular/core'
import {FormGroup, FormBuilder, Validators} from '@angular/forms'

import {AuthService} from '../core/auth.service'

import {ToastrService} from 'ngx-toastr'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup
	campusForm: FormGroup

	constructor(
		private fb: FormBuilder,
		public auth: AuthService,
		private toastr: ToastrService
	) {
		this.loginForm = this.fb.group({
			// username: ['', [Validators.required]],
			domain: ['', [Validators.required]]
		})

		// Campus Form
		this.campusForm = this.fb.group({
			campus: ['', [Validators.required]]
		})
	}

	ngOnInit() {}

	get username() {
		return this.loginForm.get('username')
	}

	get domain() {
		return this.loginForm.get('domain')
	}

	get campus() {
		return this.campusForm.get('campus')
	}

	// Login Function
	login(domain) {
		return this.auth.googleLogin(domain).then(() => {
			this.toastr.info(
				'It may take up to 3 business days for your points to be applied'
			)
		})
	}

	// Campus Function
	setCampus(user) {
		return this.auth.updateUser(user, {campus: this.campus.value})
	}
}
