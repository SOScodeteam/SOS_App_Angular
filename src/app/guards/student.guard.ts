import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {

  constructor(private auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  {

      return this.auth.user$.pipe(
        take(1),
        map(user => user && user.roles.student ? true : false),
        tap(isStudent => {
          if (!isStudent) {
            console.error('Access denied - Students only')
          }
        })
      );

  }

}
