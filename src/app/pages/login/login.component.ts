import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { User } from '@interfaces/user'
import { AuthService } from '@services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormControl('', Validators.required)
  domains = ['student.kent.edu.au', 'kent.edu.au']

  campusForm = new FormControl('', Validators.required)
  campuses = ['Sydney', 'Melbourne']

  constructor(public auth: AuthService) {}

  async login() {
    const domain: string = this.loginForm.value

    try {
      return await this.auth.googleSignin(domain)
    } catch (error) {
      return error
    }
  }

  setCampus(user: User) {
    const campus: string = this.campusForm.value

    return this.auth.updateCampus(user, campus)
  }
}
