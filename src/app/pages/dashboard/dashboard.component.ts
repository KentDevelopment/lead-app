import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { Chance } from 'chance'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { DashboardService } from './dashboard.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches))

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(() => {
      return [...this.dashboardService.navItems]
    })
  )

  constructor(
    public dashboardService: DashboardService,
    private breakpointObserver: BreakpointObserver,
    private afs: AngularFirestore
  ) {
    // this.generateUsers()
  }

  generateUsers() {
    const campus = ['Sydney', 'Melbourne']

    setInterval(() => {
      const chance = new Chance()
      const user = {
        uid: chance.string({
          length: 28,
          pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        }),
        photoURL: chance.avatar({ protocol: 'https' }),
        displayName: chance.name({ middle: true }),
        email: `k123456@student.kent.edu.au`,
        campus: campus[chance.integer({ min: 0, max: 1 })],
        incognitoMode: chance.bool(),
        role: 'user',
        points: chance.integer({ min: 0, max: 1000 })
      }

      this.afs
        .collection('users')
        .doc(user.uid)
        .set(user)
    }, 200)
  }
}
