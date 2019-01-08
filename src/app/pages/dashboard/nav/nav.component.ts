import { Component } from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { ResetPointsComponent } from '../reset-points/reset-points.component'

export interface DashboardMenuContent {
  icon: string
  title: string
  subTitle: string
  route: string
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches))

  cardsContent: DashboardMenuContent[] = [
    {
      icon: 'arrow_back',
      title: 'Back to the App',
      subTitle: 'Navigate back to the Leaderboard',
      route: '/profile'
    },
    {
      icon: 'home',
      title: 'Dashboard',
      subTitle: 'Dashboard Menu',
      route: '/dashboard'
    },
    {
      icon: 'insert_chart',
      title: 'LEAD Points',
      subTitle: 'Add LEAD points to one user',
      route: 'points'
    },
    {
      icon: 'supervised_user_circle',
      title: 'User Management',
      subTitle: 'A list with details of all users',
      route: 'bulk'
    },
    {
      icon: 'assignment',
      title: 'Logs',
      subTitle: 'Check all the changes that have been made',
      route: 'logs'
    },
    {
      icon: 'delete_forever',
      title: 'Reset All Points',
      subTitle: 'Reset the LEAD Points Leaderboard',
      route: 'resetPoints'
    }
  ]

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private router: Router
  ) {}

  checkOptionSelected(item: { id: number; route: any }) {
    item.id === 3
      ? this.openResetDialog()
      : this.router.navigate([`/dashboard/${item.route}`])
  }

  openResetDialog(): void {
    this.dialog.open(ResetPointsComponent, {
      autoFocus: false
    })
  }
}
