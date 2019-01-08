import { LayoutModule } from '@angular/cdk/layout'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { CommonModule, TitleCasePipe } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule
} from '@angular/material'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterModule, Routes } from '@angular/router'
import { BulkComponent } from './bulk/bulk.component'
import { DashboardComponent } from './dashboard.component'
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component'
import { LogsComponent } from './logs/logs.component'
import { MenuComponent } from './menu/menu.component'
import { NavComponent } from './nav/nav.component'
import { PointsComponent } from './points/points.component'
import { ResetPointsComponent } from './reset-points/reset-points.component'

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'points',
        component: PointsComponent,
        data: {
          title: 'LEAD Points'
        }
      },
      { path: 'logs', component: LogsComponent },
      { path: 'bulk', component: BulkComponent },
      { path: 'resetPoints', component: ResetPointsComponent }
    ]
  }
]

@NgModule({
  declarations: [
    BulkComponent,
    DashboardComponent,
    DialogConfirmationComponent,
    LogsComponent,
    MenuComponent,
    NavComponent,
    PointsComponent,
    ResetPointsComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ScrollingModule
  ],
  providers: [TitleCasePipe, RouterModule],
  bootstrap: [DialogConfirmationComponent, ResetPointsComponent]
})
export class DashboardModule {}
