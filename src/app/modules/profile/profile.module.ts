import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ProfileComponent } from './profile.component'

import { RouterModule, Routes } from '@angular/router'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { ResetPointsComponent } from './dialogs/reset-points/reset-points.component'
import { LeaveIncognitoComponent } from './dialogs/leave-incognito/leave-incognito.component'

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'reset-points', component: ResetPointsComponent },
  { path: 'leave-incognito', component: LeaveIncognitoComponent }
]

@NgModule({
  declarations: [
    ProfileComponent,
    ResetPointsComponent,
    LeaveIncognitoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class ProfileModule {}
