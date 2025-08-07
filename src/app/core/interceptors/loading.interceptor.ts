import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoaderComponent } from '../../loader/loader.component';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
let spinner = inject(NgxSpinnerService);

  if
  ( req.url === 'https://ecommerce.routemisr.com/api/v1/categories' || 
    req.url === 'https://ecommerce.routemisr.com/api/v1/products' || 
    req.url === 'https://ecommerce.routemisr.com/api/v1/cart' )
  {
    spinner.show();
  }




  return next(req).pipe(
    finalize(() => {
      spinner.hide();
    })
  ); 
};
