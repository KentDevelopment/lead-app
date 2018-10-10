import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isShowingCredits = false

  constructor() {}

  ngOnInit() {}

  showCredits() {
    this.isShowingCredits = !this.isShowingCredits ? true : false
  }
}
