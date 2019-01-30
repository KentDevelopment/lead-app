import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { AwardsBannerComponent } from './awards-banner/awards-banner.component'
import { FooterComponent } from './footer/footer.component'

@NgModule({
  declarations: [AwardsBannerComponent, FooterComponent],
  imports: [CommonModule, MatIconModule],
  exports: [AwardsBannerComponent, FooterComponent]
})
export class SharedModule {}
