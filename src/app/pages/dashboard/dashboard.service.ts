import { TitleCasePipe } from '@angular/common'
import { Injectable, ViewChild, Directive } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSidenav } from '@angular/material/sidenav'
import { Router } from '@angular/router'
import { ResetPointsComponent } from '@dialogs/reset-points/reset-points.component'
import { Log } from '@interfaces/log'
import { NavItem } from '@interfaces/nav-item'
import { User } from '@interfaces/user'
import { FirestoreService } from '@services/firestore.service'
import { ToastService } from '@services/toast.service'

@Directive()
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav

  navItems: NavItem[] = [
    {
      icon: 'home',
      title: 'Dashboard',
      subTitle: 'Dashboard',
      routePath: 'dashboard'
    },
    {
      icon: 'insert_chart',
      title: 'Add Points',
      subTitle: 'Add LEAD points to one user',
      routePath: 'points'
    },
    {
      icon: 'assignment',
      title: 'Logs',
      subTitle: 'Check all the changes that have been made',
      routePath: 'logs'
    },
    {
      icon: 'delete_forever',
      title: 'Reset Points',
      subTitle: 'Reset the LEAD Points Leaderboard',
      routePath: 'reset'
    }
  ]

  constructor(
    private toast: ToastService,
    private fss: FirestoreService,
    private titlecasePipe: TitleCasePipe,
    private dialog: MatDialog,
    private router: Router
  ) {}

  private checkPlural(pointsAdded: number) {
    return pointsAdded === -1 || pointsAdded === 1 ? '' : 's'
  }

  logText(pointsAdded: number, displayName: string) {
    const isPositive = pointsAdded > 0 ? true : false
    return isPositive
      ? `added ${pointsAdded} point${this.checkPlural(
          pointsAdded
        )} to ${displayName}`
      : `removed ${pointsAdded} point${this.checkPlural(
          pointsAdded
        )} from ${displayName}`
  }

  async logData(points: number, pointsAdded: number, userRef: User) {
    const userName = this.titlecasePipe.transform(userRef.displayName)

    const dataObj: Log = {
      date: Date.now(),
      message: `${userName} now has ${points} pts`,
      pointsAdded,
      pointsCurrent: points,
      userId: userRef.uid,
      userName
    }

    this.fss
      .addLog(dataObj)
      .then(() => {
        this.toast.showSuccess(`You've ${this.logText(pointsAdded, userName)}`)
      })
      .catch(error => {
        this.toast.showError(error)
      })
  }

  //   async logData(points: number, pointsAdded: number, userRef: User) {
  //   const displayName = this.titlecasePipe.transform(userRef.displayName)
  //   return this.auth.user$.subscribe(admin => {
  //     const dataObj: Log = {
  //       log: `${displayName} now has ${points} pts`,
  //       adminName: admin.displayName,
  //       pointsAdded,
  //       userName: displayName,
  //       date: new Date().getTime()
  //     }
  //
  //     this.fss
  //       .addLog(dataObj)
  //       .then(() => {
  //         this.toast.showSuccess(
  //           `You've ${this.logText(pointsAdded, displayName)}`
  //         )
  //       })
  //       .catch(error => {
  //         this.toast.showError(error)
  //       })
  //   })
  // }

  checkRoute(item: { routePath: string }) {
    switch (item.routePath) {
      case 'dashboard':
      case 'profile': {
        this.router.navigate([`${item.routePath}`])
        break
      }
      case 'reset': {
        this.openDialog()
        break
      }
      default: {
        this.router.navigate([`/dashboard/${item.routePath}`])
        break
      }
    }
  }

  openDialog(): void {
    this.dialog.open(ResetPointsComponent, {
      autoFocus: false
    })
  }
}
