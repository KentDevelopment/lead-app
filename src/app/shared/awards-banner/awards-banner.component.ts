import { Component } from '@angular/core'

@Component({
  selector: 'app-awards-banner',
  templateUrl: './awards-banner.component.html',
  styleUrls: ['./awards-banner.component.scss'],
})
export class AwardsBannerComponent {
  currentDate = Date.now()
  registerDate = new Date().setDate(11)

  ceremonyDate = new Date().setTime(1544981400000)
}
