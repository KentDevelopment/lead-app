import { Component } from '@angular/core'
// import { MatDialog } from '@angular/material/dialog'
// import { Router } from '@angular/router'
// import { ResetPointsComponent } from '../reset-points/reset-points.component'

export interface DashboardMenuContent {
  id: number
  icon: string
  title: string
  subTitle: string
  route: string
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  dashboardCardsContent: DashboardMenuContent[] = [
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
      route: ''
    }
  ]

  constructor() // private dialog: MatDialog,
  // private router: Router
  {}

  // checkOptionSelected(item: { id: number; route: any }) {
  //   item.id === 3
  //     ? this.openResetDialog()
  //     : this.router.navigate([`/dashboard/${item.route}`])
  // }
  //
  // openResetDialog(): void {
  //   this.dialog.open(ResetPointsComponent, {
  //     autoFocus: false
  //   })
  // }
}
