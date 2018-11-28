import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AwardsBannerComponent } from './awards-banner/awards-banner.component'
import { FooterComponent } from './footer/footer.component'

@NgModule({
  declarations: [AwardsBannerComponent, FooterComponent],
  imports: [CommonModule],
  exports: [AwardsBannerComponent, FooterComponent]
})
export class SharedModule {}
