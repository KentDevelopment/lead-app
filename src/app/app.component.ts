import {
  animate,
  group,
  query,
  style,
  transition,
  trigger
} from '@angular/animations'
import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routerAnimation', [
      // Move Right to Left <-----
      transition('leaderboard => profile, profile => admin, login => signup', [
        style({ height: '!' }),
        query(':enter', style({ transform: 'translateX(100%)' })),
        query(
          ':enter, :leave',
          style({ position: 'absolute', top: 0, left: 0, right: 0 })
        ),
        // animate the leave page away
        group([
          query(':leave', [
            animate(
              '0.3s cubic-bezier(.35,0,.25,1)',
              style({ transform: 'translateX(-100%)' })
            )
          ]),
          // and now reveal the enter
          query(
            ':enter',
            animate(
              '0.3s cubic-bezier(.35,0,.25,1)',
              style({ transform: 'translateX(0)' })
            )
          )
        ])
      ]),

      // Move Left to Right ---->
      transition('profile => leaderboard , admin => *, signup => login', [
        style({ height: '!' }),
        query(':enter', style({ transform: 'translateX(-100%)' })),
        query(
          ':enter, :leave',
          style({ position: 'absolute', top: 0, left: 0, right: 0 })
        ),
        // animate the leave page away
        group([
          query(':leave', [
            animate(
              '0.3s cubic-bezier(.35,0,.25,1)',
              style({ transform: 'translateX(100%)' })
            )
          ]),
          // and now reveal the enter
          query(
            ':enter',
            animate(
              '0.3s cubic-bezier(.35,0,.25,1)',
              style({ transform: 'translateX(0)' })
            )
          )
        ])
      ]),

      // Fades Out Left to Right --->
      transition('login => leaderboard, profile => login', [
        style({ height: '!' }),
        query(
          ':enter',
          style({ opacity: 0, transform: 'translateX(-100%) scale(0)' })
        ),
        query(
          ':enter, :leave',
          style({ position: 'absolute', top: 0, left: 0, right: 0 })
        ),
        // animate the leave page away
        group([
          query(':leave', [
            animate(
              '1s ease-out',
              style({ opacity: 0, transform: 'translateX(100%) scale(0)' })
            )
          ]),
          // and now reveal the enter
          query(
            ':enter',
            animate(
              '1s ease-in',
              style({ opacity: 1, transform: 'translateX(0) scale(1)' })
            )
          )
        ])
      ])
    ])
  ]
})
export class AppComponent {
  // change the animation state
  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation
  }
}
