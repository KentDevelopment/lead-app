import { Component, Input } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog, MatDialogRef, ProgressSpinnerMode } from '@angular/material'

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { Ng2ImgToolsService } from 'ng2-img-tools'

import { Observable, of } from 'rxjs'
import { finalize } from 'rxjs/operators'

import { Environment } from '@environments/environment'

import { User } from '@interfaces/user'
import { AuthService } from '@services/auth.service'
import { LeaveIncognitoComponent } from './dialogs/leave-incognito/leave-incognito.component'
import { EditPictureComponent } from './edit-picture/edit-picture.component'

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
    public dialog: MatDialog,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private ng2ImgToolsService: Ng2ImgToolsService,
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

  uploadFile(event) {
    // TODO: if image < 120x120 prompt an error: image it's too small
    let imgCompressed

    const file = event.target.files[0]
    const filePath = `users/${this.user.uid}`
    const storageRef = this.storage.ref(filePath)

    if (file) {
      this.uploadPercent = of(0)
    }

    this.ng2ImgToolsService
      .resizeExactCrop([file], 128, 128)
      .subscribe(imgResized => {
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

  async update(user: User, downloadURL) {
    // Sets user data to firestore on login
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

  // Dialog Box
  openIncognitoDialog(): void {
    this.dialogRef = this.dialog.open(LeaveIncognitoComponent, {
      autoFocus: false
    })
  }

  openPictureDialog(): void {
    this.dialogRef = this.dialog.open(EditPictureComponent, {
      autoFocus: false
    })
  }
}
