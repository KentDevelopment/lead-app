import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { DashboardComponent } from './dashboard.component'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { ScrollingModule } from '@angular/cdk/scrolling'
import { MatDialogModule } from '@angular/material/dialog'
import { MatTabsModule } from '@angular/material/tabs'

import { RouterModule, Routes } from '@angular/router'

import { TitleCasePipe } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'

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
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [TitleCasePipe]
})
export class DashboardModule {}
