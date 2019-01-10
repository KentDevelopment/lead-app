import { DataSource } from '@angular/cdk/collections'
import { MatPaginator, MatSort } from '@angular/material'
import { User } from '@interfaces/user'
import { UserData } from '@interfaces/user-data'
import { FirestoreService } from '@services/firestore.service'
import { merge, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
// import { Chance } from 'chance'
// import { AngularFirestore } from '@angular/fire/firestore'

export class UserManagementDataSource extends DataSource<User> {
  data: UserData[] = []

  constructor(
    private paginator: MatPaginator,
    public sort: MatSort,
    private fss: FirestoreService
  ) {
    super()
  }
  //
  // addUser() {
  //   const chance = new Chance()
  //   const user = {
  //     uid: chance.string({
  //       length: 28,
  //       pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  //     }),
  //     photoUrl: chance.avatar({ protocol: 'https' }),
  //     displayName: chance.first(),
  //     email: `${chance.last()}@gmail.com`,
  //     campus: chance.company(),
  //     incognitoMode: chance.bool(),
  //     role: 'user',
  //     points: chance.integer({ min: 0, max: 2000 })
  //   }
  //
  //   this.afs
  //     .collection('userTest')
  //     .doc(user.uid)
  //     .set(user)
  // }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<User[]> {
    // setInterval(() => {
    //   this.addUser()
    // }, 200)

    // this.addUser()

    // this.fss
    //   .localUsers$
    //   .pipe(
    //     map(ref => {
    //       return ref.map((user: User) => {
    //         const newUserObj: UserTable = {
    //           // position: 1,
    //           id: user.uid,
    //           picture: user.photoURL || 'assets/placeholders/placeholder-user.svg',
    //           name: user.displayName,
    //           email: user.email,
    //           campus: user.campus,
    //           incognito: user.incognitoMode,
    //           role: user.role,
    //           points: user.points
    //         }
    //         return newUserObj
    //       })
    //     })
    //   )
    //   .subscribe(res => {
    //     this.data = res
    //   })
    this.fss.mockUser$
      .pipe(
        map(ref => {
          return ref.map((user: User) => {
            const newUserObj: UserData = {
              // position: 1,
              id: user.uid,
              picture:
                user.photoURL || 'assets/placeholders/placeholder-user.svg',
              name: user.displayName,
              email: user.email,
              campus: user.campus,
              incognito: user.incognitoMode,
              role: user.role,
              points: user.points
            }
            return newUserObj
          })
        })
      )
      .subscribe(res => {
        this.data = res
        console.log('THIS.DATA', this.data)
      })

    const dataMutations = [
      this.fss.mockUser$,
      this.paginator.page,
      this.sort.sortChange
    ]

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
  private getPagedData(data: UserData[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize
    return data.splice(startIndex, this.paginator.pageSize)
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: UserData[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc'
      switch (this.sort.active) {
        // case 'position':
        //   return compare(+a.position, +b.position, isAsc)
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
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
}
