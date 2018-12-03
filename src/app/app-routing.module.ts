import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AdminGuard } from '@guards/admin.guard'
import { AuthGuard } from '@guards/auth.guard'

import { LeaderboardComponent } from '@modules/leaderboard/leaderboard.component'
import { LoginComponent } from '@modules/login/login.component'

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
    canActivate: [AuthGuard],
    data: { animation: 'leaderboard' }
  },
  {
    path: 'profile',
    loadChildren: '@modules/profile/profile.module#ProfileModule',
    canActivate: [AuthGuard],
    data: { animation: 'profile' }
  },
  {
    path: 'dashboard',
    loadChildren: '@modules/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard, AdminGuard],
    data: { animation: 'admin' }
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
