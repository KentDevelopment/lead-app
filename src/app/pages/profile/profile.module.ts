import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '@shared/shared.module'
import { LeaveIncognitoComponent } from './dialogs/leave-incognito/leave-incognito.component'
import { ProfileComponent } from './profile.component'

const routes: Routes = [{ path: '', component: ProfileComponent }]

@NgModule({
  declarations: [ProfileComponent, LeaveIncognitoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    MatDividerModule,
    MatProgressBarModule,
    MatIconModule,
    FlexLayoutModule
  ],
  bootstrap: [LeaveIncognitoComponent]
})
export class ProfileModule {}
