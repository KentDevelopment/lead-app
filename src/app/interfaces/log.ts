export interface Log {
  date: number
  message: string
  pointsAdded: number
  pointsCurrent: number
  userId: string
  userName?: string
  adminId?: string
  adminName?: string
}

export interface LogReset {
  date: number
  adminName: string | undefined
  message: string
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
