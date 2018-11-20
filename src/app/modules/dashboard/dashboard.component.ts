import { Component } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms'
import { MatDialog, MatSnackBar } from '@angular/material'

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'

import { AuthService } from '@services/auth.service'
import { take } from 'rxjs/operators'

import { ILog } from '@core/interfaces/log'
import { IUser } from '@core/interfaces/user'
import { FirestoreService } from '@services/firestore.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  addPointsForm: FormGroup
  dialogRef: any
  myTime: any = new Date()

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public fss: FirestoreService,
    private afs: AngularFirestore,
    private fb: FormBuilder
  ) {
    this.addPointsForm = this.fb.group({
      uid: this.fb.array([]),
      points: [Number[''], Validators.required]
    })
  }

  // Add Points to one user onChange - Update the user value at the DB
  update(user, event) {
    const userDoc: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    )

    const userData = userDoc.valueChanges().pipe(take(1))

    userData.subscribe(userRef => {
      const addedPoints: number =
        Number(event.target.value) - Number(userRef.points)
      const points: number = Number(event.target.value)

      const newData: IUser = {
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
    for (const userUid of this.addPointsForm.value.uid) {
      const userDoc: AngularFirestoreDocument<any> = this.afs.doc(
        `users/${userUid}`
      )

      const userData = userDoc.valueChanges().pipe(take(1))

      userData.subscribe(userRef => {
        const addedPoints: number = Number(event.points)
        const totalPoints: number = Number(userRef.points) + addedPoints

        const newData: IUser = {
          uid: userUid,
          points: totalPoints
        }

        this.updateData(userDoc, newData)
        this.logData(totalPoints, addedPoints, userRef)
      })
    }
  }

  private async updateData(
    userRef: AngularFirestoreDocument<any>,
    data: IUser
  ) {
    return userRef.update(data)
  }

  private async logData(points: number, addedPoints: number, ref: any) {
    return this.auth.user$.subscribe(admin => {
      const dataObj: ILog = {
        log: `${ref.displayName} now has ${points} pts`,
        adminName: admin.displayName,
        pointsAdded: addedPoints,
        userName: ref.displayName,
        date: new Date().getTime()
      }

      this.fss
        .addLog(dataObj)
        .then(() => {
          this.showSuccess(`Points successfully added`)
        })
        .catch(err => {
          this.showError(`Ops, it looks like something has gone wrong`, err)
        })
    })
  }

  // Alerts
  showSuccess(message, action?: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000
    })
  }

  showWarning(message, action?: string) {
    this.snackBar.open(`${message}`, action, {
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  showError(title, message?, action?: string) {
    this.snackBar.open(
      `${title}
       ${message}`,
      action,
      {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 4000
      }
    )
  }
}
