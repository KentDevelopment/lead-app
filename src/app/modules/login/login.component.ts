import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material'

import { AuthService } from '@core/authentication/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup
  campusForm: FormGroup
  snackBarOptions: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top',
    duration: 4000
  }

  constructor(
    public auth: AuthService,
    public snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
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

  // Alerts
  showInfo(message, action?: string) {
    this.snackBar.open(`${message}`, action, this.snackBarOptions)
  }
}
