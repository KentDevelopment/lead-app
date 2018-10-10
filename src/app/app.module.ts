import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'

import { AngularFireModule, FirebaseOptionsToken } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { AuthService } from './core/authentication/auth.service'
import { CoreModule } from './core/core.module'
import { FirestoreService } from './core/firestore.service'
import { FooterComponent } from './core/footer/footer.component'

import { AdminComponent } from './modules/admin/admin.component'
import { LeaderboardComponent } from './modules/leaderboard/leaderboard.component'
import { LoginComponent } from './modules/login/login.component'
import { UserProfileComponent } from './modules/user-profile/user-profile.component'

import { environment } from '../environments/environment'
import { Ng2ImgToolsModule } from 'ng2-img-tools'

@NgModule({
  declarations: [
    AdminComponent,
    AppComponent,
    LeaderboardComponent,
    LoginComponent,
    UserProfileComponent,
    FooterComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule,
    AngularFireStorageModule,
    AngularFirestoreModule.enablePersistence(),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    Ng2ImgToolsModule,
    ReactiveFormsModule
    // ServiceWorkerModule.register('/ngsw-worker.js', {
    // 	enabled: environment.production
    // })
  ],
  providers: [
    AuthService,
    FirestoreService,
    { provide: FirebaseOptionsToken, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
