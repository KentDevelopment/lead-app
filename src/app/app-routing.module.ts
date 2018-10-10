import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AdminComponent } from './modules/admin/admin.component'
import { LeaderboardComponent } from './modules/leaderboard/leaderboard.component'
import { LoginComponent } from './modules/login/login.component'
import { UserProfileComponent } from './modules/user-profile/user-profile.component'

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'login' }
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent,
    data: { animation: 'leaderboard' }
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    data: { animation: 'profile' }
  },
  {
    path: 'profile/admin',
    component: AdminComponent,
    data: { animation: 'admin' }
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
