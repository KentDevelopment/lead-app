import { LayoutModule } from '@angular/cdk/layout'
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
import {
  MatCardModule,
  MatGridListModule,
  MatMenuModule
} from '@angular/material'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DialogConfirmationComponent } from '@dialogs/dialog-confirmation/dialog-confirmation.component'
import { ResetPointsComponent } from '@dialogs/reset-points/reset-points.component'
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
    AboutComponent,
    ResetPointsComponent,
    DialogConfirmationComponent
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
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    LayoutModule
  ],
  entryComponents: [ResetPointsComponent],
  providers: [
    AuthService,
    FirestoreService,
    TitleCasePipe,
    { provide: FirebaseOptionsToken, useValue: Environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
