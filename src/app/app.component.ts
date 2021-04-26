import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations'
import { Component } from '@angular/core'
import { Environment } from '@environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('routerAnimation', [
      // Move Right to Left <-----
      transition('leaderboard => profile, login => signup', [
        style({ height: '!' }),
        query(':enter', style({ transform: 'translateX(100%)' })),
        query(
          ':enter, :leave',
          style({ position: 'absolute', top: 0, left: 0, right: 0 })
        ),
        group([
          query(':leave', [
            animate(
              '0.3s cubic-bezier(.35,0,.25,1)',
              style({ transform: 'translateX(-100%)' })
            ),
          ]),
          query(
            ':enter',
            animate(
              '0.3s cubic-bezier(.35,0,.25,1)',
              style({ transform: 'translateX(0)' })
            )
          ),
        ]),
      ]),

      // Move Left to Right ---->
      transition('profile => leaderboard, signup => login', [
        style({ height: '!' }),
        query(':enter', style({ transform: 'translateX(-100%)' })),
        query(
          ':enter, :leave',
          style({ position: 'absolute', top: 0, left: 0, right: 0 })
        ),
        group([
          query(':leave', [
            animate(
              '0.3s cubic-bezier(.35,0,.25,1)',
              style({ transform: 'translateX(100%)' })
            ),
          ]),
          query(
            ':enter',
            animate(
              '0.3s cubic-bezier(.35,0,.25,1)',
              style({ transform: 'translateX(0)' })
            )
          ),
        ]),
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
        group([
          query(':leave', [
            animate(
              '1s ease-out',
              style({ opacity: 0, transform: 'translateX(100%) scale(0)' })
            ),
          ]),
          query(
            ':enter',
            animate(
              '1s ease-in',
              style({ opacity: 1, transform: 'translateX(0) scale(1)' })
            )
          ),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent {
  isDev = !Environment.production
  version: string = Environment.version

  getRouteAnimation(outlet: { activatedRouteData: { animation: any } }) {
    return outlet.activatedRouteData.animation
  }
}
