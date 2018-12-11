import { ScrollingModule } from '@angular/cdk/scrolling'
import { TitleCasePipe } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { AngularFireModule, FirebaseOptionsToken } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'

import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { Environment } from '@environments/environment'

import { LeaderboardComponent } from '@pages/leaderboard/leaderboard.component'
import { LoginComponent } from '@pages/login/login.component'

import { AuthService } from '@services/auth.service'
import { FirestoreService } from '@services/firestore.service'

import { SharedModule } from '@shared/shared.module'

import { Ng2ImgToolsModule } from 'ng2-img-tools'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AboutComponent } from './pages/leaderboard/dialogs/about/about.component'

@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    LoginComponent,
    AboutComponent
  ],
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
    SharedModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AuthService,
    FirestoreService,
    TitleCasePipe,
    { provide: FirebaseOptionsToken, useValue: Environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
