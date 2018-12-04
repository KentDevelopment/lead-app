import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor() {}

  checkPlural(pointsAdded: number) {
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
}
