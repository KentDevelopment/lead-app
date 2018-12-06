import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator, MatSort } from '@angular/material'
import { FirestoreService } from '@services/firestore.service'
import { DashboardLogsDataSource } from './dashboard-logs-datasource'
import { DbService } from '@services/db.service'

@Component({
  selector: 'app-dashboard-logs',
  templateUrl: './dashboard-logs.component.html',
  styleUrls: ['./dashboard-logs.component.scss']
})
export class DashboardLogsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  dataSource: DashboardLogsDataSource

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    // 'id',
    'user-picture',
    'date',
    'user-id',
    'user-name',
    'user-email',
    'user-campus',
    'points-added',
    'points-current',
    'log-message',
    'admin-name'
  ]

  constructor(private fss: FirestoreService) // private db: DbService
  {}

  ngOnInit() {
    this.dataSource = new DashboardLogsDataSource(
      this.paginator,
      this.sort,
      this.fss
      // this.db
    )
  }
}
