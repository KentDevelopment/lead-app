import { animate, state, style, transition, trigger } from '@angular/animations'
import { Component } from '@angular/core'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1
        })
      ),
      state(
        'closed',
        style({
          height: '7.1vh',
          opacity: 0.6
        })
      ),
      transition('open => closed', [animate('0.3s')]),
      transition('closed => open', [animate('0.7s')])
    ])
  ]
})
export class FooterComponent {
  isOpen = false

  toogleCredits() {
    this.isOpen = !this.isOpen
  }
}
