import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AuthService } from './auth.service'

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [AuthService]
})
export class CoreModule {}
