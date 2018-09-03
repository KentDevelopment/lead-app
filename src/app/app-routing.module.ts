import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LoginComponent } from './login/login.component'
import { LeaderboardComponent } from './leaderboard/leaderboard.component'
import { UserProfileComponent } from './user-profile/user-profile.component'
import { AdminComponent } from './admin/admin.component'

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'login', component: LoginComponent, data: { animation: 'login' } },
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
