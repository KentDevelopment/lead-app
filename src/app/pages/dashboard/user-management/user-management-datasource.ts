import { DataSource } from '@angular/cdk/collections'
import { MatPaginator, MatSort } from '@angular/material'
import { map } from 'rxjs/operators'
import { Observable, of as observableOf, merge } from 'rxjs'

// TODO: Replace this with your own data model type
export interface UserManagementItem {
  position: number
  id: number
  picture: string
  name: string
  email: string
  campus: string
  incognito: boolean
  role: string
  points: number
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: UserManagementItem[] = [
  {
    position: 1,
    id: 1,
    picture: '/',
    name: 'Hydrogen',
    email: '170535@kent.edu.com.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 2,
    id: 2,
    picture: '/',
    name: 'Helium',
    email: '170535@kent.edu.com.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 3,
    id: 3,
    picture: '/',
    name: 'Lithium',
    email: '170535@kent.edu.com.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 4,
    id: 4,
    picture: '/',
    name: 'Beryllium',
    email: '170535@kent.edu.com.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 5,
    id: 5,
    picture: '/',
    name: 'Boron',
    email: '170535@kent.edu.com.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 6,
    id: 6,
    picture: '/',
    name: 'Carbon',
    email: '170535@kent.edu.com.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 7,
    id: 7,
    picture: '/',
    name: 'Nitrogen',
    email: '170535@kent.edu.com.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 8,
    id: 8,
    picture: '/',
    name: 'Oxygen',
    email: '170535@kent.edu.com.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 9,
    id: 9,
    picture: '/',
    name: 'Fluorine',
    email: '170535@kent.edu.com.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 10,
    id: 10,
    picture: '/',
    name: 'Neon',
    email: '170535@kent.edu.com.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 11,
    id: 11,
    picture: '/',
    name: 'Sodium',
    email: '170535@kent.edu.com.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 12,
    id: 12,
    picture: '/',
    name: 'Magnesium',
    email: '170535@kent.edu.com.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 13,
    id: 13,
    picture: '/',
    name: 'Aluminum',
    email: '170535@kent.edu.com.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 14,
    id: 14,
    picture: '/',
    name: 'Silicon',
    email: '170535@kent.edu.com.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 15,
    id: 15,
    picture: '/',
    name: 'Phosphorus',
    email: '170535@kent.edu.com.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 16,
    id: 16,
    picture: '/',
    name: 'Sulfur',
    email: '170535@kent.edu.com.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 17,
    id: 17,
    picture: '/',
    name: 'Chlorine',
    email: '170535@kent.edu.com.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 18,
    id: 18,
    picture: '/',
    name: 'Argon',
    email: '170535@kent.edu.com.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 19,
    id: 19,
    picture: '/',
    name: 'Potassium',
    email: '170535@kent.edu.com.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 20,
    id: 20,
    picture: '/',
    name: 'Calcium',
    email: '170535@kent.edu.com.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  }
]

/**
 * Data source for the UserManagement view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UserManagementDataSource extends DataSource<UserManagementItem> {
  data: UserManagementItem[] = EXAMPLE_DATA

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super()
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<UserManagementItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ]

    // Set the paginator's length
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
  private getPagedData(data: UserManagementItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize
    return data.splice(startIndex, this.paginator.pageSize)
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: UserManagementItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc'
      switch (this.sort.active) {
        case 'position':
          return compare(+a.position, +b.position, isAsc)
        case 'id':
          return compare(+a.id, +b.id, isAsc)
        case 'picture':
          return compare(+a.picture, +b.picture, isAsc)
        case 'name':
          return compare(a.name, b.name, isAsc)
        case 'email':
          return compare(+a.email, +b.email, isAsc)
        case 'role':
          return compare(+a.role, +b.role, isAsc)
        case 'campus':
          return compare(+a.campus, +b.campus, isAsc)
        case 'incognito':
          return compare(+a.incognito, +b.incognito, isAsc)
        case 'points':
          return compare(+a.points, +b.points, isAsc)
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
