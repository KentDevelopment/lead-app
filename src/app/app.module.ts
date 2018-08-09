import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {HttpClientModule} from '@angular/common/http'

import {AppRoutingModule} from './app-routing.module'

import {ServiceWorkerModule} from '@angular/service-worker'
import {AppComponent} from './app.component'

import {AngularFireModule, FirebaseOptionsToken} from 'angularfire2'
import {AngularFirestoreModule} from 'angularfire2/firestore'
import {AngularFireStorageModule} from 'angularfire2/storage'
import {AngularFireAuthModule} from 'angularfire2/auth'

import {environment} from '../environments/environment'

import {CoreModule} from './core/core.module'
import {AuthService} from './core/auth.service'
import {FirestoreService} from './core/firestore.service'

import {LoginComponent} from './login/login.component'
import {LeaderboardComponent} from './leaderboard/leaderboard.component'
import {UserProfileComponent} from './user-profile/user-profile.component'
import {AdminComponent} from './admin/admin.component'

import {Ng2ImgToolsModule} from 'ng2-img-tools'

import {MatDialogModule} from '@angular/material/dialog'
import {MatSnackBarModule} from '@angular/material/snack-bar'

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		LeaderboardComponent,
		UserProfileComponent,
		AdminComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CoreModule,
		AppRoutingModule,
		HttpClientModule,
		AngularFireModule,
		AngularFireAuthModule,
		AngularFireStorageModule,
		ServiceWorkerModule.register('/ngsw-worker.js', {
			enabled: environment.production
		}),
		AngularFirestoreModule.enablePersistence(),
		FormsModule,
		ReactiveFormsModule,
		Ng2ImgToolsModule,
		MatDialogModule,
		MatSnackBarModule
	],
	providers: [
		AuthService,
		FirestoreService,
		{provide: FirebaseOptionsToken, useValue: environment.firebase}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
