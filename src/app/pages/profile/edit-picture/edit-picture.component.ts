import { Component } from '@angular/core'
import { ImageCroppedEvent } from 'ngx-image-cropper'

@Component({
  selector: 'app-edit-picture',
  templateUrl: './edit-picture.component.html',
  styleUrls: ['./edit-picture.component.scss']
})
export class EditPictureComponent {
  imageChangedEvent: any
  croppedImage: string

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
}
