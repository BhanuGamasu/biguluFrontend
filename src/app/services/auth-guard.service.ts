import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(private _router: Router, private _authService: AuthServiceService) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._authService.checkToken()) {
      if (!localStorage.getItem('previousPath')) {
        localStorage.setItem('previousPath', location.pathname)
      }
    }
    if (this._authService.checkToken()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
    // navigate to login page
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
