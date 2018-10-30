import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material'

import { AuthService } from '@core/authentication/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  campusForm: FormGroup
  snackBarOptions: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top',
    duration: 4000
  }

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    public snackBar: MatSnackBar
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

  ngOnInit() {}

  get domain() {
    return this.loginForm.get('domain')
  }

  get campus() {
    return this.campusForm.get('campus')
  }

  // Login Function
  login(domain) {
    return this.auth.googleLogin(domain).catch(error => error)
  }

  // Campus Function
  setCampus(user) {
    // const userPreferences = Object.assign(
    //   { campus: this.campus.value },
    //   user
    // )
    return this.auth.updateCampus(user, this.campus.value)
  }

  // Alerts
  showInfo(message, action?: string) {
    this.snackBar.open(`${message}`, action, this.snackBarOptions)
  }
}
