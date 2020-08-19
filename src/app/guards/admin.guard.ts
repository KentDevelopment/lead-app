import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router'
import { AuthService } from '@services/auth.service'
import { Observable } from 'rxjs'
import { map, take, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user$.pipe(
      take(1),
      map((user) => {
        return user.role === 'admin' ? true : false
      }),
      tap((isAdmin) => {
        if (!isAdmin) {
          throw new Error('Only admin can access this page')
        }
      })
    )
  }
}
