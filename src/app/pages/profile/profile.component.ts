import { Component, Input } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { ProgressSpinnerMode } from '@angular/material/progress-spinner'
import { environment } from '../../../environments/environment'
import { User } from '@interfaces/user'
import { AuthService } from '@services/auth.service'
import { Observable, of } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { LeaveIncognitoComponent } from './dialogs/leave-incognito/leave-incognito.component'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @Input() mode: ProgressSpinnerMode = 'indeterminate'

  dialogRef: MatDialogRef<any>
  downloadURL: Observable<string>
  uploadPercent: Observable<number>
  user: User
  userForm: FormGroup
  version: string = environment.version
  croppedImage: string
  imageChangedEvent: any

  constructor(
    public auth: AuthService,
    private dialog: MatDialog,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private storage: AngularFireStorage
  ) {
    this.auth.user$.subscribe((data) => {
      this.user = data
    })

    this.userForm = this.fb.group({
      displayName: [{ value: null, disabled: true }],
      email: [{ value: null, disabled: true }],
    })
  }

  uploadFile(event: { target: { files: any[] } }) {
    let imgCompressed: File

    const inputFile = event.target.files[0]
    const filePath = `users/${this.user.uid}`
    const storageRef = this.storage.ref(filePath)

    if (inputFile) {
      this.uploadPercent = of(0)
    }

    function resizeImage(
      file: File,
      maxWidth: number,
      maxHeight: number
    ): Promise<Blob> {
      return new Promise((resolve, reject) => {
        const image = new Image()
        image.src = URL.createObjectURL(file)
        image.onload = () => {
          const width = image.width
          const height = image.height

          if (width <= maxWidth && height <= maxHeight) {
            resolve(file)
          }

          let newWidth
          let newHeight

          if (width > height) {
            newHeight = height * (maxWidth / width)
            newWidth = maxWidth
          } else {
            newWidth = width * (maxHeight / height)
            newHeight = maxHeight
          }

          const canvas = document.createElement('canvas')
          canvas.width = newWidth
          canvas.height = newHeight

          const context = canvas.getContext('2d')

          context.drawImage(image, 0, 0, newWidth, newHeight)

          canvas.toBlob(resolve, file.type)
        }
        image.onerror = reject
      })
    }

    // document.getElementById('input').addEventListener('change', o => {
    //   if (o.target.files.length > 0) {
    //     resizeImage(o.target.files[0], 200, 200).then(
    //       blob => {
    //         //You can upload the resized image: doUpload(blob)
    //         document.getElementById('img').src = URL.createObjectURL(blob)
    //       },
    //       err => {
    //         console.error('Photo error', err)
    //       }
    //     )
    //   }
    // })

    resizeImage(inputFile, 128, 128).then((imgResized) => {
      imgCompressed = new File([imgResized], this.user.uid)

      const task = this.storage.upload(filePath, imgCompressed)

      this.mode = 'determinate'
      this.uploadPercent = task.percentageChanges()

      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = storageRef.getDownloadURL()
            this.downloadURL.subscribe((ref) => {
              this.update(this.user, ref)
                .finally(() => {
                  setTimeout(() => {
                    this.uploadPercent = of(null)
                  }, 4000)
                })
                .catch((error) => error)
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
      photoURL: downloadURL,
    }

    try {
      return userRef.update(data)
    } catch (error) {
      return error
    }
  }

  openIncognitoDialog(): void {
    this.dialogRef = this.dialog.open(LeaveIncognitoComponent, {
      autoFocus: false,
    })
  }
}
