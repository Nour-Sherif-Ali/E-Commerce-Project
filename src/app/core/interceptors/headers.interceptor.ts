import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {

  if(typeof localStorage !== 'undefined'){

    if(localStorage.getItem('token') !== null){
      let myToken : any = localStorage.getItem('token');
      let updatedReq = req.clone({
        setHeaders:{
          token:myToken,
        },
      });
      return next(updatedReq);
      } else{
        return next(req);
      }
      }
      return next(req);  
};
