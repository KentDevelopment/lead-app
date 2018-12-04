import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AngularFireModule, FirebaseOptionsToken } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { AuthService } from '@services/auth.service'
import { FirestoreService } from '@services/firestore.service'

import { LeaderboardComponent } from '@pages/leaderboard/leaderboard.component'
import { LoginComponent } from '@pages/login/login.component'

import { Environment } from '@environments/environment'
import { Ng2ImgToolsModule } from 'ng2-img-tools'

import { ScrollingModule } from '@angular/cdk/scrolling'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'

import { FlexLayoutModule } from '@angular/flex-layout'
import { SharedModule } from '@shared/shared.module'

@NgModule({
  declarations: [AppComponent, LeaderboardComponent, LoginComponent],
  imports: [
    AngularFireAuthModule,
    AngularFireModule,
    AngularFireStorageModule,
    AngularFirestoreModule.enablePersistence(),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    Ng2ImgToolsModule,
    ReactiveFormsModule,
    MatButtonModule,
    ScrollingModule,
    FlexLayoutModule,
    SharedModule
  ],
  providers: [
    AuthService,
    FirestoreService,
    { provide: FirebaseOptionsToken, useValue: Environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
