import { Component } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms'
import { MatDialog } from '@angular/material'

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'

import { AuthService } from '@services/auth.service'
import { take } from 'rxjs/operators'

import { Log } from '@interfaces/log'
import { User } from '@interfaces/user'

import { FirestoreService } from '@services/firestore.service'
import { ToastService } from '@services/toast.service'
import { TitleCasePipe } from '@angular/common'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  addPointsForm: FormGroup
  myTime: any = new Date()

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    public toast: ToastService,
    public fss: FirestoreService,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private titlecasePipe: TitleCasePipe
  ) {
    this.addPointsForm = this.fb.group({
      uid: this.fb.array([]),
      points: [Number[''], Validators.required]
    })
  }

  // Add Points to one user onChange - Update the user value at the DB
  update(user: User, newPoints: number) {
    const userDoc: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    )

    const userData$ = userDoc.valueChanges().pipe(take(1))

    userData$.subscribe(userRef => {
      const addedPoints = newPoints - userRef.points
      const points = newPoints

      const newData: User = {
        points
      }

      this.updateData(userDoc, newData)
      this.logData(points, addedPoints, userRef)
    })
  }

  // Push or remove item from the array
  onChange(uid: string, isChecked: boolean) {
    const pointsFormArray = this.addPointsForm.controls.uid as FormArray

    if (isChecked) {
      pointsFormArray.push(new FormControl(uid))
    } else {
      const index = pointsFormArray.controls.findIndex(x => x.value === uid)
      pointsFormArray.removeAt(index)
    }
  }

  // Add Points in Bulk
  addPoints(event) {
    for (const uid of this.addPointsForm.value.uid) {
      const userDoc: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${uid}`
      )

      const userData$ = userDoc.valueChanges().pipe(take(1))

      userData$.subscribe(userRef => {
        const addedPoints = Number(event.points)
        const totalPoints = userRef.points + addedPoints

        const newData: User = {
          uid,
          points: totalPoints
        }

        this.updateData(userDoc, newData)
        this.logData(totalPoints, addedPoints, userRef)
      })
    }
  }

  private async updateData(
    userRef: AngularFirestoreDocument<User>,
    data: User
  ) {
    return userRef.update(data)
  }

  private async logData(points: number, pointsAdded: number, userRef: User) {
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

  checkPlural(pointsAdded: number) {
    return pointsAdded === -1 || pointsAdded === 1 ? '' : 's'
  }
}
