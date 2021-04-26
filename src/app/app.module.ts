import { LayoutModule } from '@angular/cdk/layout'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { DatePipe, TitleCasePipe } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ResetPointsComponent } from '@dialogs/reset-points/reset-points.component'
import { Environment } from '@environments/environment'
import { LeaderboardComponent } from '@pages/leaderboard/leaderboard.component'
import { LoginComponent } from '@pages/login/login.component'
import { AuthService } from '@services/auth.service'
import { FirestoreService } from '@services/firestore.service'
import { SharedModule } from '@shared/shared.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ConfirmPointsComponent } from './dialogs/confirm-points/confirm-points.component'
import { AboutComponent } from './pages/leaderboard/dialogs/about/about.component'

@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    LoginComponent,
    AboutComponent,
    ResetPointsComponent,
    ConfirmPointsComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(Environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule.enablePersistence(),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatButtonModule,
    ScrollingModule,
    FlexLayoutModule,
    SharedModule,
    MatChipsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    LayoutModule,
  ],
  entryComponents: [ResetPointsComponent, ConfirmPointsComponent],
  providers: [AuthService, FirestoreService, TitleCasePipe, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
