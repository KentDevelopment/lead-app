import { Component } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms'
import { User } from '@interfaces/user'
import { FirestoreService } from '@services/firestore.service'
import { take } from 'rxjs/operators'
import { DashboardService } from '../dashboard.service'

@Component({
  selector: 'app-bulk',
  templateUrl: './bulk.component.html',
  styleUrls: ['./bulk.component.scss']
})
export class BulkComponent {
  addPointsForm: FormGroup

  constructor(
    public fss: FirestoreService,
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private afs: AngularFirestore
  ) {
    this.addPointsForm = this.fb.group({
      uid: this.fb.array([]),
      points: [Number[''], Validators.required]
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
  addPoints() {
    console.log('TEST', this.addPointsForm.value.uid)
    for (const uid of this.addPointsForm.value.uid) {
      const userDoc: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${uid}`
      )

      const userData$ = userDoc.valueChanges().pipe(take(1))

      userData$.subscribe(userRef => {
        const addedPoints = this.addPointsForm.value.points
        const totalPoints = userRef.points + addedPoints

        const newData: User = {
          uid,
          points: Number(totalPoints)
        }

        userDoc.update(newData)
        this.dashboardService
          .logData(totalPoints, addedPoints, userRef)
          .finally(() => this.addPointsForm.reset())
      })
    }
  }
}
