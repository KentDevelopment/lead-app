import { LayoutModule } from '@angular/cdk/layout'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { CommonModule, TitleCasePipe } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterModule, Routes } from '@angular/router'
import { BulkComponent } from './bulk/bulk.component'
import { DashboardComponent } from './dashboard.component'
import { LogsComponent } from './logs/logs.component'
import { NavComponent } from './nav/nav.component'
import { PointsComponent } from './points/points.component'

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
        },
      },
      {
        path: 'points',
        component: PointsComponent,
        data: {
          title: 'LEAD Points',
        },
      },
      {
        path: 'bulk',
        component: BulkComponent,
        data: {
          title: 'Bulk editing',
        },
      },
      {
        path: 'logs',
        component: LogsComponent,
        data: {
          title: 'Logs',
        },
      },
    ],
  },
]

@NgModule({
  declarations: [
    BulkComponent,
    DashboardComponent,
    LogsComponent,
    NavComponent,
    PointsComponent,
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
    ScrollingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  providers: [TitleCasePipe, RouterModule],
})
export class DashboardModule {}
