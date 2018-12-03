import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { AuthService } from '@services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup
  campusForm: FormGroup

  constructor(public auth: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      domain: ['', [Validators.required]]
    })

    this.campusForm = this.fb.group({
      campus: ['', [Validators.required]]
    })
  }

  get domain() {
    return this.loginForm.get('domain')
  }

  get campus() {
    return this.campusForm.get('campus')
  }

  async login(domain: string) {
    try {
      return await this.auth.googleLogin(domain)
    } catch (error) {
      return error
    }
  }

  setCampus(user) {
    return this.auth.updateCampus(user, this.campus.value)
  }
}
