import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { DashboardComponent } from './dashboard.component'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { ScrollingModule } from '@angular/cdk/scrolling'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'

import { RouterModule, Routes } from '@angular/router'

import { TitleCasePipe } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatInputModule } from '@angular/material'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'

import { BulkComponent } from './bulk/bulk.component'
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component'
import { LogsComponent } from './logs/logs.component'
import { MenuComponent } from './menu/menu.component'
import { PointsComponent } from './points/points.component'
import { ResetPointsComponent } from './reset-points/reset-points.component'

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: MenuComponent },
      { path: 'points', component: PointsComponent },
      { path: 'logs', component: LogsComponent },
      { path: 'bulk', component: BulkComponent }
    ]
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    LogsComponent,
    BulkComponent,
    PointsComponent,
    DialogConfirmationComponent,
    MenuComponent,
    ResetPointsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ScrollingModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [TitleCasePipe, RouterModule],
  bootstrap: [DialogConfirmationComponent, ResetPointsComponent]
})
export class DashboardModule {}
