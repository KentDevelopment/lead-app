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
import {
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material'
import { BulkComponent } from './bulk/bulk.component'
import { DashboardLogsComponent } from './dashboard-logs/dashboard-logs.component'
import { LogsComponent } from './logs/logs.component'
import { PointsComponent } from './points/points.component'

const routes: Routes = [{ path: '', component: DashboardComponent }]

@NgModule({
  declarations: [
    DashboardComponent,
    LogsComponent,
    BulkComponent,
    PointsComponent,
    DashboardLogsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ScrollingModule,
    MatTabsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [TitleCasePipe]
})
export class DashboardModule {}
