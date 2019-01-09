import { TitleCasePipe } from '@angular/common'
import { Injectable } from '@angular/core'
import { AngularFirestoreDocument } from '@angular/fire/firestore'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { ResetPointsComponent } from '@dialogs/reset-points/reset-points.component'
import { Log } from '@interfaces/log'
import { User } from '@interfaces/user'
import { AuthService } from '@services/auth.service'
import { FirestoreService } from '@services/firestore.service'
import { ToastService } from '@services/toast.service'

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private auth: AuthService,
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
    const displayName = this.titlecasePipe.transform(userRef.displayName)
    return this.auth.user$.subscribe(admin => {
      const dataObj: Log = {
        log: `${displayName} now has ${points} pts`,
        adminName: admin.displayName,
        pointsAdded,
        userName: displayName,
        date: new Date().getTime()
      }

      this.fss
        .addLog(dataObj)
        .then(() => {
          this.toast.showSuccess(
            `You've ${this.logText(pointsAdded, displayName)}`
          )
        })
        .catch(error => {
          this.toast.showError(error)
        })
    })
  }

  async updateData(userRef: AngularFirestoreDocument<User>, data: User) {
    return userRef.update(data)
  }

  checkRoute(item: { route: string }) {
    switch (item.route) {
      case 'dashboard':
      case 'profile': {
        this.router.navigate([`${item.route}`])
        break
      }
      case 'reset': {
        this.openDialog()
        break
      }
      default: {
        this.router.navigate([`/dashboard/${item.route}`])
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
