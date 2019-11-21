import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component, ViewChild } from '@angular/core'
import { MatSidenav } from '@angular/material/sidenav'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { NavItem } from '@interfaces/nav-item'
import { Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { DashboardService } from '../dashboard.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav

  routeTitle: string
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches))

  navItems: NavItem[]

  constructor(
    public dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.navItems = this.dashboardService.navItems

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.route.children[0].data.subscribe(data => {
          this.routeTitle = data.title
        })
      })
  }

  redirectTo(routeParam: string) {
    this.dashboardService.checkRoute({ routePath: routeParam })

    this.isHandset$.subscribe(isMobile => {
      if (isMobile) {
        this.sidenav.close()
      }
    })
  }
}
