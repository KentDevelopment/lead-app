import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
// import { FirestoreService } from '@services/firestore.service';
// import { UserManagementDataSource } from './user-management-datasource'

export interface UserManagementItem {
  position: number
  id: string
  picture: string
  name: string
  email: string
  campus: string
  incognito: boolean
  role: string
  points: number
}

const EXAMPLE_DATA: UserManagementItem[] = [
  {
    position: 1,
    id: '1',
    picture: 'assets/placeholders/placeholder-user.svg',
    name: 'Hydrogen',
    email: 'k170535@student.kent.edu.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 2,
    id: '2',
    picture: 'assets/placeholders/placeholder-user.svg',
    name: 'Helium',
    email: 'k170535@student.kent.edu.au',
    campus: 'Sydney',
    incognito: false,
    role: 'user',
    points: 1234
  },
  {
    position: 3,
    id: '3',
    picture: 'assets/placeholders/placeholder-user.svg',
    name: 'Lithium',
    email: 'k170535@student.kent.edu.au',
    campus: 'Sydney',
    incognito: true,
    role: 'admin',
    points: 1234
  },
  {
    position: 4,
    id: '4',
    picture: 'assets/placeholders/placeholder-user.svg',
    name: 'Beryllium',
    email: 'k170535@student.kent.edu.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 5,
    id: '5',
    picture: 'assets/placeholders/placeholder-user.svg',
    name: 'Boron',
    email: 'k170535@student.kent.edu.au',
    campus: 'Sydney',
    incognito: true,
    role: 'admin',
    points: 1234
  },
  {
    position: 6,
    id: '6',
    picture: 'assets/placeholders/placeholder-user.svg',
    name: 'Carbon',
    email: 'k170535@student.kent.edu.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 7,
    id: '7',
    picture: 'assets/placeholders/placeholder-user.svg',
    name: 'Nitrogen',
    email: 'k170535@student.kent.edu.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 8,
    id: '8',
    picture: 'assets/placeholders/placeholder-user.svg',
    name: 'Oxygen',
    email: 'k170535@student.kent.edu.au',
    campus: 'Sydney',
    incognito: false,
    role: 'user',
    points: 1234
  },
  {
    position: 9,
    id: '9',
    picture: 'assets/placeholders/placeholder-user.svg',
    name: 'Fluorine',
    email: 'k170535@student.kent.edu.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 10,
    id: '10',
    picture: 'assets/placeholders/placeholder-user.svg',
    name: 'Neon',
    email: 'k170535@student.kent.edu.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 11,
    id: '11',
    picture: 'assets/placeholders/placeholder-user.svg',
    name: 'Sodium',
    email: 'k170535@student.kent.edu.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 12,
    id: '12',
    picture: 'assets/placeholders/placeholder-user.svg',
    name: 'Magnesium',
    email: 'k170535@student.kent.edu.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 13,
    id: '13',
    picture: 'assets/placeholders/placeholder-user.svg',
    name: 'Aluminum',
    email: 'k170535@student.kent.edu.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 14,
    id: '14',
    picture: 'assets/placeholders/placeholder-user.svg',
    name: 'Silicon',
    email: 'k170535@student.kent.edu.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 15,
    id: '15',
    picture: 'assets/placeholders/placeholder-user.svg',
    name: 'Phosphorus',
    email: 'k170535@student.kent.edu.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 16,
    id: '16',
    picture: 'assets/placeholders/placeholder-user.svg',
    name: 'Sulfur',
    email: 'k170535@student.kent.edu.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 17,
    id: '17',
    picture: 'assets/placeholders/placeholder-user.svg',
    name: 'Chlorine',
    email: 'k170535@student.kent.edu.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 18,
    id: '18',
    picture: 'assets/placeholders/placeholder-user.svg',
    name: 'Argon',
    email: 'k170535@student.kent.edu.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 19,
    id: '19',
    picture: 'assets/placeholders/placeholder-user.svg',
    name: 'Potassium',
    email: 'k170535@student.kent.edu.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  },
  {
    position: 20,
    id: '20',
    picture: 'assets/placeholders/placeholder-user.svg',
    name: 'Calcium',
    email: 'k170535@student.kent.edu.au',
    campus: 'Sydney',
    incognito: true,
    role: 'user',
    points: 1234
  }
]

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  // dataSource: UserManagementDataSource
  data: UserManagementItem[] = []
  dataSource = new MatTableDataSource<UserManagementItem>(EXAMPLE_DATA)

  displayedColumns = [
    'position',
    'id',
    'picture',
    'name',
    'email',
    'campus',
    'incognito',
    'role',
    'points'
  ]

  constructor() // private fss: FirestoreService
  {
    // this.fss.localUsers$.subscribe(users => {
    //   console.log('USERS', users)
    //   for (let user of users) {
    //     const myData = {
    //       position:1,
    //       id: user.uid,
    //       picture: 'assets/placeholders/placeholder-user.svg',
    //       name: user.displayName,
    //       email: user.email,
    //       campus: user.campus,
    //       incognito: user.incognitoMode,
    //       role: user.role,
    //       points: user.points
    //     }
    //
    //     this.data.push(myData)
    //   }
    // })
  }

  ngOnInit() {
    // this.dataSource = new UserManagementDataSource(this.paginator, this.sort)
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}
