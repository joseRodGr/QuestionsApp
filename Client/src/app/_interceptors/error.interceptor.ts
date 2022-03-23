import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastrSvc: ToastrService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if(error){
          switch(error.status){
            case 400:
              this.displayError(error);
              break;

            case 401:
              this.displayError(error);
              break;

            case 404:
              this.displayError(error);
              break;

            case 500:
              const navigationExtras: NavigationExtras = {state: {error: error.error}};
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;

            default:
              this.toastrSvc.error('Something unexpected went wrong');
              break;
          }
        }
        return throwError(error);
      })
    );
  }

  displayError(error: any){
    if(typeof(error.error) === 'object'){
      this.toastrSvc.error(error.error.title);
    }else{
      this.toastrSvc.error(error.error);
    }
  }

}
