import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, retry, tap, throwError } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
// export class TokenInterceptorService {

//   constructor() { }
// }

export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private router: Router,
    private auth: AuthServiceService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthServiceService);
    const authReq = req.clone(
      {
        setHeaders: {
          Authorization: `JWT ${authService.getToken()}`,
          headers: 'Content-Type: application/json', 'Access-Control-Allow-Origin': '*'
        }
      }
    );

    return next.handle(authReq).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else if (error.status == 401) {
          // Invalid Authorization
          this.auth.logout();
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
      }),
      tap((ele:any) => {
        if (ele instanceof HttpResponse) {
          if (ele.body.code == 401 || ele.body.code === 403 || ele.body.code === 405) {
            this.auth.logout();
          } else {
            console.log("valid request");
          }
        }
      }),
    );
    // return next.handle(authReq).catch(err => this.handleError(err));
  }
}
