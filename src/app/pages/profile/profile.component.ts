import { Component, Input } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { ProgressSpinnerMode } from '@angular/material/progress-spinner'
import { Environment } from '@environments/environment'
import { User } from '@interfaces/user'
import { AuthService } from '@services/auth.service'
import { Ng2ImgMaxService } from 'ng2-img-max'
import { Observable, of } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { LeaveIncognitoComponent } from './dialogs/leave-incognito/leave-incognito.component'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input() mode: ProgressSpinnerMode = 'indeterminate'

  dialogRef: MatDialogRef<any>
  downloadURL: Observable<string>
  uploadPercent: Observable<number>
  user: User
  userForm: FormGroup
  version: string = Environment.version
  croppedImage: string
  imageChangedEvent: any

  constructor(
    public auth: AuthService,
    private dialog: MatDialog,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private ng2ImgMaxService: Ng2ImgMaxService,
    private storage: AngularFireStorage
  ) {
    this.auth.user$.subscribe(data => {
      this.user = data
    })

    this.userForm = this.fb.group({
      displayName: [{ value: null, disabled: true }],
      email: [{ value: null, disabled: true }]
    })
  }

  uploadFile(event: { target: { files: any[] } }) {
    let imgCompressed: File

    const file = event.target.files[0]
    const filePath = `users/${this.user.uid}`
    const storageRef = this.storage.ref(filePath)

    if (file) {
      this.uploadPercent = of(0)
    }

    this.ng2ImgMaxService.resize([file], 128, 128).subscribe(imgResized => {
      imgCompressed = new File([imgResized], this.user.uid)

      const task = this.storage.upload(filePath, imgCompressed)

      this.mode = 'determinate'
      this.uploadPercent = task.percentageChanges()

      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = storageRef.getDownloadURL()
            this.downloadURL.subscribe(ref => {
              this.update(this.user, ref)
                .finally(() => {
                  setTimeout(() => {
                    this.uploadPercent = of(null)
                  }, 4000)
                })
                .catch(error => error)
            })
          })
        )
        .subscribe()
    })
  }

  async update(user: User, downloadURL: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    )

    const data: User = {
      photoURL: downloadURL
    }

    try {
      return userRef.update(data)
    } catch (error) {
      return error
    }
  }

  openIncognitoDialog(): void {
    this.dialogRef = this.dialog.open(LeaveIncognitoComponent, {
      autoFocus: false
    })
  }
}
