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
import { BulkComponent } from './bulk/bulk.component'
import { LogsComponent } from './logs/logs.component'
import { PointsComponent } from './points/points.component'
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material'

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'confirm-points', component: DialogConfirmationComponent }
]

@NgModule({
  declarations: [
    DashboardComponent,
    LogsComponent,
    BulkComponent,
    PointsComponent,
    DialogConfirmationComponent
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
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [TitleCasePipe]
})
export class DashboardModule {}
