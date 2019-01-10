export interface Log {
  adminName: string
  date: number
  log: string
  pointsAdded: number
  userName: string
}

export interface NewLog {
  date: number
  message: string
  pointsAdded: number
  pointsCurrent: number

  adminId?: string
  userId?: string
}

export interface DashboardLogItem {
  id: number
  date: Date
  userId: string
  userPicture: string
  userName: string
  userEmail: string
  userCampus: string
  pointsAdded: number
  pointsCurrent: number
  message: string
  adminName: string
}

export interface LogText {
  adminName: string
  date: number
  log: string
}
