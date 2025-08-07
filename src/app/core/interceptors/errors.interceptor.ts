import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

let  _ToastrService=inject(ToastrService);

  return next(req).pipe(catchError( (err) => {
    if(err.message === ''){
      _ToastrService.error(err.message);
    }
   
    return throwError (() => {
      return err;
    })
  }));
};
