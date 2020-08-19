import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdminGuard } from '@guards/admin.guard'
import { AuthGuard } from '@guards/auth.guard'
import { AboutComponent } from '@pages/leaderboard/dialogs/about/about.component'
import { LeaderboardComponent } from '@pages/leaderboard/leaderboard.component'
import { LoginComponent } from '@pages/login/login.component'

const routes: Routes = [
  // { path: '', component: LoginComponent },
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'login' },
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent,
    canActivate: [AuthGuard],
    data: { animation: 'leaderboard' },
  },
  {
    path: 'profile',
    loadChildren: '@pages/profile/profile.module#ProfileModule',
    canActivate: [AuthGuard],
    data: { animation: 'profile' },
  },
  {
    path: 'dashboard',
    loadChildren: '@pages/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AboutComponent, LeaderboardComponent],
})
export class AppRoutingModule {}
