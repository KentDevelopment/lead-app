import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-awards-banner',
  templateUrl: './awards-banner.component.html',
  styleUrls: ['./awards-banner.component.scss']
})
export class AwardsBannerComponent implements OnInit {
  currentDate = Date.now()
  registerDate = new Date().setDate(11)

  ceremonyDate = new Date().setTime(1544981400000)

  constructor() {}

  ngOnInit() {}
}
