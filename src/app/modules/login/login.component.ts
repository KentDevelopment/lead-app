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
    // Login Form
    this.loginForm = this.fb.group({
      domain: ['', [Validators.required]]
    })

    // Campus Form
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

  // Login Function
  async login(domain) {
    try {
      return await this.auth.googleLogin(domain)
    } catch (error) {
      return error
    }
  }

  // Campus Function
  setCampus(user) {
    return this.auth.updateCampus(user, this.campus.value)
  }
}
