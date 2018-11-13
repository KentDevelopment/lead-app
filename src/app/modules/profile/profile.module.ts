import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ProfileComponent } from './profile.component'

import { RouterModule, Routes } from '@angular/router'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'

const routes: Routes = [{ path: '', component: ProfileComponent }]

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class ProfileModule {}
