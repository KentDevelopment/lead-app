import { DataSource } from '@angular/cdk/collections'
import { MatPaginator, MatSort } from '@angular/material'
import { DashboardLogItem, NewLog } from '@interfaces/log'
import { FirestoreService } from '@services/firestore.service'
import { merge, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

/**
 * Data source for the DashboardLogs view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DashboardLogsDataSource extends DataSource<DashboardLogItem> {
  data: DashboardLogItem[] = []
  date = new Date()

  constructor(
    private paginator: MatPaginator,
    private sort: MatSort,
    private fss: FirestoreService
  ) // private db: DbService
  {
    super()
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DashboardLogItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.

    // this.fss.getLogsValue().subscribe(ref =>{
    //   console.log('REF', ref)
    // })

    this.fss
      .getLogs()
      // .pipe(
      //   map(res => {
      //     return res.map((logItem: any) => {
      //       console.log('LOGITEM', logItem)
      //
      //       const newData: any = {
      //         ...logItem
      //       }
      //       return newData
      //     })
      //   })
      // )
      .subscribe(res => {
        this.data = res
      })

    const dataMutations = [
      this.fss.logs$,
      this.paginator.page,
      this.sort.sortChange
    ]

    // // Set the paginator's length
    this.paginator.length = this.data.length

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]))
      })
    )
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DashboardLogItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize
    return data.splice(startIndex, this.paginator.pageSize)
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DashboardLogItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc'
      switch (this.sort.active) {
        case 'id':
          return compare(+a.id, +b.id, isAsc)
        case 'date':
          return compare(+a.date, +b.date, isAsc)
        case 'user-id':
          return compare(a.userId, b.userId, isAsc)
        case 'user-name':
          return compare(a.userName, b.userName, isAsc)
        case 'user-email':
          return compare(a.userEmail, b.userEmail, isAsc)
        case 'user-campus':
          return compare(a.userCampus, b.userCampus, isAsc)
        case 'points-added':
          return compare(a.pointsAdded, b.pointsAdded, isAsc)
        case 'points-current':
          return compare(a.pointsCurrent, b.pointsCurrent, isAsc)
        case 'log-message':
          return compare(a.message, b.message, isAsc)
        case 'admin-name':
          return compare(a.adminName, b.adminName, isAsc)
        default:
          return 0
      }
    })
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
}
