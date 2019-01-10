import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { User } from '@interfaces/user'
import { UserData } from '@interfaces/user-data'
import { FirestoreService } from '@services/firestore.service'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  dataSource = new MatTableDataSource([{}])

  displayedColumns: string[] = [
    // 'position',
    // 'incognito',
    'picture',
    'id',
    'name',
    'email',
    'campus',
    'role',
    'points',
    'actions'
  ]

  // dataSource: MatTableDataSource<UserData>;

  constructor(private fss: FirestoreService) {
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
      .subscribe(users => {
        this.dataSource = new MatTableDataSource(users)
        console.log('THIS.DATASOURCE', this.dataSource)
      })
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
}
