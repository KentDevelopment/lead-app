import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { DashboardService } from './dashboard.service'

export interface DashboardMenuContent {
  id: number
  icon: string
  title: string
  subTitle: string
  route: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  cardsContent: DashboardMenuContent[] = [
    {
      id: 0,
      icon: 'insert_chart',
      title: 'LEAD Points',
      subTitle: 'Add LEAD points to one user',
      route: 'points'
    },
    {
      id: 1,
      icon: 'supervised_user_circle',
      title: 'User Management',
      subTitle: 'A list with details of all users',
      route: 'bulk'
    },
    {
      id: 2,
      icon: 'assignment',
      title: 'Logs',
      subTitle: 'Check all the changes that have been made',
      route: 'logs'
    },
    {
      id: 3,
      icon: 'delete_forever',
      title: 'Reset All Points',
      subTitle: 'Reset the LEAD Points Leaderboard',
      route: 'reset'
    }
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches))

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(() => {
      return [...this.cardsContent]
    })
  )

  constructor(
    public dashboardService: DashboardService,
    private breakpointObserver: BreakpointObserver
  ) {}
}
