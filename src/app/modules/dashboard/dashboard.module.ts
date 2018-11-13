import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { DashboardComponent } from './dashboard.component'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { ScrollingModule } from '@angular/cdk/scrolling'
import { MatDialogModule } from '@angular/material/dialog'
import { MatTabsModule } from '@angular/material/tabs'

import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [{ path: '', component: DashboardComponent }]

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ScrollingModule,
    MatTabsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule {}
