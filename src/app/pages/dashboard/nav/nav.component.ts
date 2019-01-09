import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { DashboardService } from '../dashboard.service'

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
  routeTitle: string

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches))

  cardsContent: DashboardMenuContent[] = [
    {
      icon: 'home',
      title: 'Dashboard',
      subTitle: 'Dashboard',
      route: 'dashboard'
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
      route: 'reset'
    }
  ]

  constructor(
    public dashboardService: DashboardService,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {
    this.route.data.subscribe(data => {
      this.routeTitle = data.title
    })
  }
}
